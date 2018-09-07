const getStudentById = require('../student/student.controller').getStudentById;
var apply = require('../bot/conversation').applyFlag;

const {
  sendTextMessage
} = require('../bot/messanger');

const login = async (req, res) => {
  const {
    email,
    password
  } = req.body;

  console.log(`Email: ${email} password: ${password}`);

  console.log(process.env.AUTH_EMAIL);
  console.log(process.env.PASSWORD);
  if (email === process.env.AUTH_EMAIL) {
    if (password === process.env.PASSWORD) {
      console.log('Render index');
      // TODO why this doesn't work
      res.render('index', {
        apply,
        title: 'Home'
      });
    } else {
      console.error('Password is not valid');
      res.sendStatus(307);
    }
  } else {
    console.error('Username is not valid');
    res.sendStatus(307);
  }
};

const verify = async (req, res) => {
  // 1. Get tocken from url
  const {
    id,
    token,
    email
  } = req.query;
  console.log('Token', token);
  console.log('Id', id);



  // 2. Get user by id
  const student = await getStudentById(id);

  if (!student) {
    console.error('Student not found');
    return res.send('Greska ! Kontaktirajte lazav94@gmail.com');
  } else {
    if (student.verified) {
      return res.send('Vec ste vefifikovali svoju email adresu');
    } else {
      // 3. Compare token from URL with users token that we created before
      if (token === student.token) {
        console.log('Uspesna verifikacija');
        // 3.1 if it is continue with the flow
        student.verified = true;
        student.token = undefined;
        student.email = email;
        await student.save();
        await sendTextMessage(student.id, 'Usepseno ste vefirifikovali svoju adresu, dobicete poruku na Vasem FB');

        require('../bot/conversation').colectingStudentDate(student.id);

        return res.send('Uspesna verifikacija');
      } else {
        // 3.2. suggest to user to resend the email with new token
        console.log('Pogresan token');
        await sendTextMessage(student.id, 'Greska pri verifikaciji! Pogresan token. Kontaktirajte lazav94@gmail.com');
        return res.send('Greska pri verifikaciji! Pogresan token. Kontaktirajte lazav94@gmail.com');
      }
    }
  }
};

const verifyStudent = async sender => {
  const student = await getStudentById(sender);
  if (student) {
    return student.verified;
  } else {
    console.error('Fatal error, check verifyStudent function');
  }
};


module.exports = {
  login,
  verify,
  verifyStudent
};