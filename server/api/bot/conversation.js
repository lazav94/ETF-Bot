const {
    sendTextMessage,
    sendImage
} = require('./messanger');

const {
    verifyStudent
} = require('../auth/auth.controller');

module.exports = async (event) => {
    console.log('Conversation');
    const sender = event.sender.id;
    console.log('Sender', sender);

    if (event.message) {
        const { text } = event.message;
        console.log('Text', text);
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
        sendTextMessage(sender, 'Nastavi!');
    } else {
        sendTextMessage(sender, 'You need to verifie');
    }
}

exports = sendVerificationEmail = (sender, email) => {
    // 1. Get email
    // 2. Generate UUID
    // 3. Get sender id and user
    // 4. save token to the user
};