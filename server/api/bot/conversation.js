const validator = require('validator');
const uuidv4 = require('uuid/v4');

const {
  sendTextMessage,
  sendQuickReply,
  sendImage,
  sendGenericTemplate,
  sendCourseGenericTemplate,
  sendProffesorGenericTemplate
} = require('./messanger');

const {
  getStudentById,
  getApplyExam,
  applyExam,
  getAllAppliedCourses
} = require('../student/student.controller');
const getCourseById = require('../course/course.controller').getCourseByID;

const sendMail = require('../_lib/mailer.js');
const createEmailHTML = require('../_lib/email.js').createEmailHTML;
const apiaiHandler = require('../_lib/apiaiHandler.js');

const courseController = require('../course/course.controller');
const professorController = require('../professor/professor.controller');
const {
  verifyStudent
} = require('../auth/auth.controller');
// sendMail('lazav94@gmail.com', 'Verification Email ⚡ | ETF Bot 🤖', createEmailHTML('123'));


var applyFlag = true;
const conversation = async (event) => {
  try {


    console.log('Conversation');
    const sender = event.sender.id;
    console.log('Sender', sender);

    // console.log('=============================')
    // console.log('EVENT', event);
    // console.log('=============================')


    if (event.message) {
      if (event.message.attachments) {
        console.log(`Sender ${sender} send a file`);
        console.log('Attachment', event.message.attachments);
        if (event.message.attachments[0].type === 'image') {
          const student = await getStudentById(sender);
          student.image = event.message.attachments[0].payload.url;
          await student.save();
        } else {
          console.log('Attachemnt must be image');
          sendTextMessage(sender, 'Prilog mora biti slika');
        }
        return;
      }

      const {
        text
      } = event.message;
      const student = await getStudentById(sender);
      console.log('Text', text);

      // If student isn't verified we are waiting for an email
      if (!student.verified && student.email === '') {
        console.log('Checking email...');
        if (validator.isEmail(text)) {
          await sendTextMessage(sender, 'Hvala, na Vasoj email adresi stici ce link za validaciju 📬');
          student.token = uuidv4();
          sendMail(text, 'Verification Email ⚡ | ETF Bot 🤖', createEmailHTML(sender, student.token, text));
          await student.save();
        } else {
          await sendTextMessage(sender, 'Nešto nije u redu sa email adrsom koju ste poslali ❎. Molimo Vas proverite format 📫');
        }
        return;
      } else {
        if (needToCollectInfomation(student)) {
          await colectingStudentDate(sender, text);
        } else {

          if (text === 'info') {
            await sendGenericTemplate(sender, 'STUDENT_INFO');
            return;
          } else if (text === 'cc') {
            await courses(sender);
            return;
          } else if (text === 'pp') {
            await professors(sender);
            return;
          } else {
            console.log('APIAI input:', text);
            const response = await apiaiHandler(sender, text);
            console.log('Api ai response', response);
            if (response && response !== '') {
              if (response !== 'done') {
                await sendTextMessage(sender, response);
              }
            } else {
              await sendTextMessage(sender, 'NLP nije prepoznao pitanja!');
            }
          }



        }
      }
    } else if (event.postback) {
      const {
        postback
      } = event;
      const {
        payload
      } = postback;
      await payloadHandler(sender, payload);
    } else {
      console.error('Check what student send you');
    }
  } catch (error) {
    console.log('Conversation error', error);
  }
};

const needToCollectInfomation = student => (
  student.parentName === '' ||
  student.index === '' ||
  !['muski', 'zenski', '-'].includes(student.gender) ||
  student.dateOfBirth === '' ||
  student.addressOfBirth === '' ||
  student.jmbg === '' ||
  student.phone === '' ||
  student.field === ''
);

const colectingStudentDate = async (sender, text) => {
  console.log('Collceting data text:', text);
  const student = await getStudentById(sender);

  if (student.parentName === '') {
    console.log('Parrent name');
    if (text && text !== '') {
      student.parentName = text;
      await student.save();
      await colectingStudentDate(sender);
    } else {
      await sendQuickReply(sender, 'Molimo vas posaljite nam Vase srednje ime ? 👪', ['-']);
    }
  } else if (student.index === '') {
    console.log('Index');
    if (text && text !== '') {
      // TODO ako imamo validaciju sa studenskog emaila iz njega mozemo izvuci broj indexa
      if (text.length === 9 && text.indexOf('/') !== -1) {
        student.index = text;
        await student.save();
        await colectingStudentDate(sender);
      } else {
        await sendTextMessage(sender, 'Nepravilan format indexa ⛔.\nUnesite broj indexa u formatu GGGG/BBBB ');
      }
    } else {
      await sendTextMessage(sender, 'Vaš broj index? (GGGG/BBBB)');
    }
  } else if (!['muski', 'zenski', '-'].includes(student.gender)) {
    console.log('gender');

    if (text && text !== '') {
      if (['muski', 'zenski', '-'].includes(text)) {
        student.gender = text;
        await student.save();
        await colectingStudentDate(sender);
      } else {
        await sendQuickReply(sender, 'Molimo Vas, izaberite jednu od ponuđenih opicija ⚥...', ['muski', 'zenski', '-']);
      }
    } else {
      await sendQuickReply(sender, 'Pol ⚥ ?', ['muski', 'zenski', '-']);
    }
  } else if (student.dateOfBirth === '') {
    console.log('Date of birth');
    if (text && text !== '') {
      if (validator.toDate(text)) {
        student.dateOfBirth = text;
        await student.save();
        await colectingStudentDate(sender);
      } else {
        await sendTextMessage(sender, 'Unesite pravilan datum rođenja? 📆');
      }
    } else {
      await sendTextMessage(sender, 'Datum rodjenja? 📅');
    }
  } else if (student.addressOfBirth === '') {
    console.log('Address of birth');
    if (text && text !== '') {
      student.addressOfBirth = text;
      await student.save();
      await colectingStudentDate(sender);
    } else {
      await sendTextMessage(sender, 'Vaša adresa prebivališta ? 🏠');
    }
  } else if (student.jmbg === '') {
    console.log('JMBG');
    if (text && text !== '') {
      if (text.length === 13) {
        student.jmbg = text;
        await student.save();
        await colectingStudentDate(sender);
      } else {
        await sendTextMessage(sender, 'JMBG mora sadržati 13 ⏹ Molimo Vas da unesete tačan JMBG');
      }
    } else {
      await sendTextMessage(sender, 'JMBG ? 🔢');
    }
  } else if (student.phone === '') {
    console.log('PHONE');
    if (text && text !== '') {
      if (validator.isMobilePhone(text)) {
        student.phone = text;
        await student.save();
        await colectingStudentDate(sender);
      } else {
        await sendTextMessage(sender, 'Niste uneli validan telefon 📱 ? Unesite ponovo');
      }
    } else {
      await sendTextMessage(sender, 'Telefon ? ☎');
    }
  } else if (student.year === -1) {
    console.log('year');
    if (text && text !== '') {
      if (['1', '2', '3', '4', '5', '6'].includes(text)) {
        student.year = parseInt(text);
        await student.save();
        await colectingStudentDate(sender);
      } else {
        await sendQuickReply(sender, 'Molimo izaberite broj od 1 do 6', ['1', '2', '3', '4', '5', '6']);
      }
    } else {
      await sendQuickReply(sender, 'Trenutna godina studija  ⃣:\nmaster - 5\ndoktorske - 6) ', ['1', '2', '3', '4', '5', '6']);
    }
  } else if (student.field === '') {
    console.log('Field');
    if (text && text !== '') {
      if (['RTI', 'SI', 'OE', 'EG', 'SS', 'TE', 'FE', 'Osnovne'].includes(text)) {
        student.field = text;
        await student.save();
        await colectingStudentDate(sender);
      } else {
        await sendQuickReply(sender, 'Modul na kojem ste? 📚', ['RTI', 'SI', 'OE', 'EG', 'SS', 'TE', 'FE', 'Osnovne']);
      }
    } else {
      await sendQuickReply(sender, 'Odsek 👪', ['RTI', 'SI', 'OE', 'EG', 'SS', 'TE', 'FE', 'Osnovne']);
    }
  } else {
    console.log('KRAJ');
    await sendTextMessage(sender, 'Hvala Vam na saradnji 😄.\n Bot 🤖 je inicijalizovan\nSada mozete postavljati pitanja ❓');
    return;
  }

};

// Payload haneler
const payloadHandler = async (sender, payload) => {
  console.log('Payload Handler', payload);
  const student = await getStudentById(sender);

  switch (payload) {
  case 'GET_STARTED':
    await getStarted(student);
    break;
  case 'HELP':
    await help(sender);
    break;
  case 'INFO':
    await sendGenericTemplate(sender, 'STUDENT_INFO');
    break;
  case 'COURSES':
    await courses(sender);
    break;
  case 'PROFESSORS':
    await professors(sender);
    break;
  default:
    if (payload.includes('COURSE/')) {
      const action = payload.slice(payload.indexOf('/') + 1, payload.lastIndexOf('/'));
      const courseId = payload.slice(payload.lastIndexOf('/') + 1);
      console.log('ACTION', action);
      console.log('courseId', courseId);

      console.log(courseId);
      if (action === 'GOALS') {
        console.log('GOALS');
        await goals(sender, courseId);
      } else if (action === 'CONTENT') {
        console.log('CONTENT');
        await content(sender, courseId);
      } else if (action === 'APPLY') {
        await apply(sender, courseId);
      }
    } else if (payload.includes('PROFESSOR/')) {
      const action = payload.slice(payload.indexOf('/') + 1, payload.lastIndexOf('/'));
      const professorId = payload.slice(payload.lastIndexOf('/') + 1);
      if (action === 'CONTACT') {
        await contact(sender, professorId);
      } else if (action === 'CONSULTATION') {
        await consultation(sender, professorId);
      }
    } else {
      console.error('Didnt recognize this payload:', payload);
    }
    break;
  }
};


const getStarted = async student => {
  console.log('Get started');
  const sender = student.id;
  const teslaPictureUrl = 'https://ocdn.eu/pulscms-transforms/1/tpPk9lMaHR0cDovL29jZG4uZXUvaW1hZ2VzL3B1bHNjbXMvWmpVN01EQV8vNGJlNDNhMTc5ZTFhYjk1YTJiNDlmNjlkZDlhYTBlYzguanBlZ5GTAs0C5ACBoTAB';

  if(student.verified && !needToCollectInfomation(student)){
    await sendTextMessage(sender, 'Dobrodošli nazad 🔙\nDrago nam je da Vas vidimo ponovo 👋\nDa li mogu da pomognem ⁉');
  } else {
    await sendTextMessage(sender, `👋 Zdravo ${student.firstName}❗ \nDobrodošli 👐\nJa samvo je ETF Bot! 🤖`);
    await sendImage(sender, teslaPictureUrl);
    await sendTextMessage(sender, 'Kako bi koristili bota prvo morate izvršiti inicijalizaciju, postavićemo Vam par pitanja o Vama');
    await sendTextMessage(sender, 'U bilo kom trenutku možete da pošaljete Vašu sliku 🖼, samo poslednja slika bice sačuvana');
    await sendTextMessage(sender, 'Za početak, kako bi Vas verifikovali pošaljite nam Vašu email adresu 📧');
  }

};

const testGetStarted = async () => {
  //2244552305573217 rti
  //1898032266921906 lazar
  const student = await getStudentById('2244552305573217');
  getStarted(student);
};
testGetStarted();

const help = async sender => {
  try {
    await sendTextMessage(sender, 'Neko ce Vam se uskoro javiti. Molimo sacekajte ⏲');
    sendMail(process.env.EMAIL, 'Zahtev za pomoc | ETF BOT', `<b>Student sa facebook id ${sender} je potrebna pomoc
		<a href='https://reports.dashbot.io/live/session/15834/${sender}'>GO TO DASHBOT</a></b>`);

  } catch (error) {
    console.error('Help error:', error);
  }
};

const courses = async sender => {
  try {
    const courses = await courseController.getAllCourses();
    await sendCourseGenericTemplate(sender, courses);
  } catch (error) {
    console.error('Courses error:', error);
  }
};

const goals = async (sender, courseId) => {
  const course = await getCourseById(courseId);
  await sendTextMessage(sender, course.goals);
};

const content = async (sender, courseId) => {
  const course = await getCourseById(courseId);
  await sendTextMessage(sender, course.content);
};

const apply = async (sender, courseId) => {
  await applyExam(sender, courseId);
  // Prikazi sve prijavljene ispite
  const courses = await getAllAppliedCourses();
  await sendCourseGenericTemplate(sender, courses);
};


const professors = async sender => {
  try {
    const professors = await professorController.getAllProfessors();
    await sendProffesorGenericTemplate(sender, professors);
  } catch (error) {
    console.error('Professors error:', error);
  }
};

const contact = async (sender, professorId) => {
  const professor = await professorController.getProfessorByID(professorId);
  await sendTextMessage(sender, `Email: ${professor.email}\nPhone: ${professor.phone}\nOffice: ${professor.office}`);
};
const consultation = async (sender, professorId) => {
  const professor = await professorController.getProfessorByID(professorId);
  await sendTextMessage(sender, 'TODO');
};

const applyRoute = async (req, res) => {
  applyFlag = req.body.apply === 'true';
  console.log('Apply flag:', applyFlag);
  res.sendStatus(200);
};

module.exports = {
  conversation,
  colectingStudentDate,
  applyRoute,
  applyFlag
};