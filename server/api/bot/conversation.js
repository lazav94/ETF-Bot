var validator = require('validator');

const {
    sendTextMessage,
    sendImage
} = require('./messanger');

const getStudentById = require('../student/student.controller').getStudentById;

const {
    verifyStudent
} = require('../auth/auth.controller');

module.exports = async (event) => {
    console.log('Conversation');
    const sender = event.sender.id;
    console.log('Sender', sender);

    if (event.message) {
        const { text } = event.message;
        const student = await getStudentById(sender);
        console.log('Text', text);

        // If student isn't verified we are waiting for an email
        if(!student.verified && student.email === ''){
            console.log('Checking email...');
            if(validator.isEmail(text)){
                await sendTextMessage(sender, 'Hvala vam, na Vasoj email adresi stici ce link za validaciju');
                // TODO send link
                student.email = text;
                await student.save();
            } else {
                await sendTextMessage(sender, 'Ovo ne izgleda kao Email, molimo Vas proverite format');
            }
            return;
        }

        if (event.message.attachments) {
            console.log(`Sender ${sender} send a file`);
            return;
        }

        // TODO handle api ai


    } else if(event.postback) {
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


// Payload haneler
const payloadHandler = async (sender, payload) => {
    console.log('Payload Handler' , payload);
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
    if(verified){
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