var validator = require('validator');
const uuidv4 = require('uuid/v4');

const {
    getUserInfo,
    sendTextMessage,
    sendQuickReply,
    sendImage
} = require('./messanger');

const getStudentById = require('../student/student.controller').getStudentById;
const sendMail = require('../_lib/mailer.js');
const createEmailHTML = require('../_lib/email.js').createEmailHTML;

const {
    verifyStudent
} = require('../auth/auth.controller');
// sendMail('lazav94@gmail.com', 'Verification Email ⚡ | ETF Bot 🤖', createEmailHTML('123'));

const conversation = async (event) => {
    console.log('Conversation');
    const sender = event.sender.id;
    console.log('Sender', sender);

    if (event.message.attachments) {
        console.log(`Sender ${sender} send a file`);
        console.log('Attachment', event.message.attachments);
        if(event.message.attachments[0].type === 'image'){
            const student = await getStudentById(sender);
            student.image =  event.message.attachments[0].payload.url;
            await student.save();
        } else {
            console.log('Attachemnt must be image');
            sendTextMessage(sender, 'Prilog mora biti slika');
        }
        return;
    }

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
            if(needToCollectInfomation(student)){
                await colectingStudentDate(sender, text);
            } else {
                console.log('Something else');
                await sendTextMessage(sender, 'Something!');
            }
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

const needToCollectInfomation = student => (
    student.parentName === ''  ||
    student.index === ''  ||
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
            await sendQuickReply(sender, 'Molimo vas posaljite nam Vase srednje ime (ime roditalja)?👪', ['-']);
        }
    } else if (student.index === '') {
        console.log('Index');
        if (text && text !== '') {
            if(text.length === 9 && text.indexOf('/') !== -1){
                student.index = text;
                await student.save();
                await colectingStudentDate(sender);
            } else {
                await sendTextMessage(sender, 'Nepravilan format indexa GGGG/BBBB');
            }
        } else {
            await sendTextMessage(sender, 'Index? GGGG/BBBB');
        }
    } else if (!['muski', 'zenski', '-'].includes(student.gender)) {
        console.log('gender');

        if (text && text !== '') {
            if (['muski', 'zenski', '-'].includes(text)) {
                student.gender = text;
                await student.save();
                await colectingStudentDate(sender);
            } else {
                await sendQuickReply(sender, 'Molimo Vas izaberite jednuo od navedenih opcija', ['muski', 'zenski', '-']);
            }
        } else {
            await sendQuickReply(sender, 'Pol 👪', ['muski', 'zenski', '-']);
        }
    } else if (student.dateOfBirth === '') {
        console.log('Date of birth');
        if (text && text !== '') {
            if (validator.toDate(text)) {
                student.dateOfBirth = text;
                await student.save();
                await colectingStudentDate(sender);
            } else {
                await sendTextMessage(sender, 'Molimo Vas da unesete validan datum');
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
            await sendTextMessage(sender, 'Adresa ? 🔢');
        }
    } else if (student.jmbg === '') {
        console.log('JMBG');
        if (text && text !== '') {
            if (text.length === 13) {
                student.jmbg = text;
                await student.save();
                await colectingStudentDate(sender);
            } else {
                await sendTextMessage(sender, 'JMBG mora sadrzati 13 cifara unesi ponovo validan JMBG');
            }
        } else {
            await sendTextMessage(sender, 'JMBG? 📅');
        }
    } else if (student.phone === '') {
        console.log('PHONE');
        if (text && text !== '') {
            if (validator.isMobilePhone(text)) {
                student.phone = text;
                await student.save();
                await colectingStudentDate(sender);
            } else {
                await sendTextMessage(sender, 'Ovo ne izgleda kao telefon? Unesite ponovo');
            }
        } else {
            await sendTextMessage(sender, 'Telefon? ☎');
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
            await sendQuickReply(sender, 'Godina (5 - master, 6 - doktorske) 👪',['1', '2', '3', '4', '5', '6']);
        }
    } else if (student.field === '') {
        console.log('Field');
        if (text && text !== '') {
            if (['RTI', 'SI', 'EE', 'OG', 'SS', 'TE', 'FE', 'Osnovne'].includes(text)) {
                student.field = text;
                await student.save();
                await colectingStudentDate(sender);
            } else {
                await sendQuickReply(sender, 'Molimo izaberite jedan od odseka', ['RTI', 'SI', 'EE', 'OG', 'SS', 'TE', 'FE', 'Osnovne']);
            }
        } else {
            await sendQuickReply(sender, 'Odsek 👪',['RTI', 'SI', 'EE', 'OG', 'SS', 'TE', 'FE', 'Osnovne']);
        }
    } else {
        console.log("KRAJ");
        await sendTextMessage(sender, 'KRAJ!!! Bot je inicijalizovan.!!🙋');
        return;
    }

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

const sendVerificationEmail = (sender, email) => {
    // 1. Get email
    // 2. Generate UUID
    // 3. Get sender id and user
    // 4. save token to the user
};

module.exports = {
    conversation,
    sendVerificationEmail,
    colectingStudentDate,
}