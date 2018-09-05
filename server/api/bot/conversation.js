var validator = require('validator');
const uuidv4 = require('uuid/v4');

const {
    getUserInfo,
    sendTextMessage,
    sendImage
} = require('./messanger');

const getStudentById = require('../student/student.controller').getStudentById;
const sendMail = require('../_lib/mailer.js');
const createEmailHTML = require('../_lib/email.js').createEmailHTML;

const {
    verifyStudent
} = require('../auth/auth.controller');
// sendMail('lazav94@gmail.com', 'Verification Email ⚡ | ETF Bot 🤖', createEmailHTML('123'));

module.exports = async (event) => {
    console.log('Conversation');
    const sender = event.sender.id;
    console.log('Sender', sender);

    if (event.message) {
        const {
            text
        } = event.message;
        const student = await getStudentById(sender);
        console.log('Text', text);

        // If student isn't verified we are waiting for an email
        if (!student.verified && student.email === '') {
            console.log('Checking email...');
            if (validator.isEmail(text)) {
                await sendTextMessage(sender, 'Hvala, na Vasoj email adresi stici ce link za validaciju ✓');
                // TODO send link
                student.token = uuidv4();
                // student.email = text;
                sendMail(text, 'Verification Email ⚡ | ETF Bot 🤖', createEmailHTML(sender, student.token, text));

                await student.save();
            } else {
                await sendTextMessage(sender, 'Ovo ne izgleda kao Email ⦸📧, molimo Vas proverite format i posaljite ponovo, hvala');
            }
            return;
        } else {
            console.log("Da li ovde treba da udje");
            // colectingStudentDate(sender, text);
        }

        if (event.message.attachments) {
            console.log(`Sender ${sender} send a file`);
            return;
        }

        // TODO handle api ai


    } else if (event.postback) {
        const {
            postback
        } = event;
        const {
            payload,
            referral
        } = postback;
        await payloadHandler(sender, payload);
    } else {
        console.error('Check what student send you');
    }
};

exports =  colectingStudentDate = async (sender, text) => {
    console.log('Collceting data text:', text);
    const student = await getStudentById(sender);

    if (student.parentName === '') {
        console.log('Parrent name');
        if(text && text !== '') {
            student.parentName = text;
            await student.save();
            colectingStudentDate(sender);
        } else {
            await sendQuickReply(sender, 'Molimo vas posaljite nam Vase srednje ime (ime roditalja)?👪', ['-']);
        }
    } else if (student.gender) {
        console.log('Parrent gender');

        if(text && text !== '') {
            if(['muski', 'zenski', '-'].includes(text)){
                student.gender = text;
                await student.save();
                colectingStudentDate(sender);
            } else {
                await sendQuickReply(sender, 'Molimo Vas izaberite jednuo od navedenih opcija', ['muski', 'zenski', '-']);
            }

        } else {

            await sendQuickReply(sender, 'Pol 👪', ['muski', 'zenski', '-']);
            colectingStudentDate(sender);
        }
    } else {
        console.log("KRAJ");
        await sendTextMessage(sender, 'KRAJ!!! Bot je inicijalizovan.!!🙋');
        return;
    }
    /*else if (student.dateOfBirth) {

    } else if (student.addressOfBirth) {

    } else if (student.jmbg) {

    } else if (student.phone) {

    } else if (student.year) {
        // quic replise
        // 0 1 2 3 4 5 6
    } else if (student.) {

    } else if (student.field) {
        // RTI ....
    } */

}

// Payload haneler
const payloadHandler = async (sender, payload) => {
    console.log('Payload Handler', payload);
    switch (payload) {
        case 'GET_STARTED':
            getStarted(sender);
            break;
        default:
            console.error("Didnt recognize this payload:", payload);
            break;
    }
}

const getStarted = async sender => {
    console.log('Get started');
    await sendTextMessage(sender, 'Dobrodosli na ETF Bot! 🤖');
    await sendImage(sender, 'https://ocdn.eu/pulscms-transforms/1/tpPk9lMaHR0cDovL29jZG4uZXUvaW1hZ2VzL3B1bHNjbXMvWmpVN01EQV8vNGJlNDNhMTc5ZTFhYjk1YTJiNDlmNjlkZDlhYTBlYzguanBlZ5GTAs0C5ACBoTAB');

    const verified = await verifyStudent(sender);
    console.log('Studen verification ', verified);
    if (verified) {
        await sendTextMessage(sender, 'Nastavi!');
    } else {
        await sendTextMessage(sender, 'Kako bi nastavili sa radom ostavite nam Vasu email adresu');
    }
}

exports = sendVerificationEmail = (sender, email) => {
    // 1. Get email
    // 2. Generate UUID
    // 3. Get sender id and user
    // 4. save token to the user
};