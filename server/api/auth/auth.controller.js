const getStudentById = require('../student/student.controller').getStudentById;
const {
    sendTextMessage
} = require('../bot/messanger');
const logger = require('winston');

const login = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    console.log(`Email: ${email} password: ${password}`);

    console.log(process.env.EMAIL);
    console.log(process.env.PASSWORD);
    if (email === process.env.EMAIL) {
        if (password === process.env.PASSWORD) {
            console.log('Render index');
            // TODO why this doesn't work
            res.render('index.pug', {
                title: 'Home'
            });
        } else {
            console.error('Password is not valid');
            res.sendStatus(307)
        }
    } else {
        console.error('Username is not valid');
        res.sendStatus(307)
    }
};

const verify = async (req, res) => {
    // 1. Get tocken from url
    const {
        id,
        token
    } = req.query;
    console.log('Token', token);
    console.log('Id', id);



    // 2. Get user by id
    const student = await getStudentById(id);

    if (!student) {
        console.error('Student not found');
        return res.send('Greska ! Kontaktirajte lazav94@gmail.com');
    } else {
        // 3. Compare token from URL with users token that we created before
        if (token === student.token) {
            console.log('Uspesna verifikacija');
            // 3.1 if it is continue with the flow
            student.verified = true;
            student.token = undefined;
            await student.save();
            await sendTextMessage(sender, 'Usepseno ste vefirifikovali svoju adresu, dobicete poruku na Vasem FB');
            res.send('Usepseno ste vefirifikovali svoju adresu, dobicete poruku na Vasem FB');
        } else {
            // 3.2. suggest to user to resend the email with new token
            console.log('Pogresan token');
            return res.send('Greska pri verifikaciji! Pogresan token. Kontaktirajte lazav94@gmail.com');
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
}