const moment = require('moment');
var CronJob = require('cron').CronJob;
const sendTextMessage = require('../bot/messanger').sendTextMessage;
const getAllStudentsID = require('../student/student.controller').getAllStudentsID;
const Broadcast = require('./broadcast.model');

const broadcastMessage = async message => {
    // 1. Get all students facebook IDs
    const studentIDs = await getAllStudentsID();
    // 2. For each student send message
    studentIDs.map(id => {
        console.log('Sending message to ', id);
        sendTextMessage(id, message);
    });

    // 3. Save broadcast message
    await (new Broadcast({
        message,
        date: Date.now()
    })).save();
}

const createReminder = (message, date) => {

    console.log('Cron job created for', new moment(new Date(date)).toDate());

	let job = new CronJob(new moment(new Date(date)).toDate(), async () => {

        // TODO as same as regular broadcast
        console.log('CRON JOB TRIGERED', moment());
        console.log('Message', message);

        broadcastMessage(message);


        job.stop();
	}, () => {
		console.log('Reminder Cron Job ended!');
		// job = null;
	},
	false,
	'Europe/Belgrade' // timeZone
    );
    job.start();
};

const broadcast = async (req, res) => {
    console.log('Broadcast controller function trigeer');

    const {
        message,
        reminderOn,
        date
    } = req.body;

    if(reminderOn === 'true') {
        console.log('Creating timed message');
        createReminder(message, date)
    } else {
        console.log('Sending messages to all user');
        broadcastMessage(message);
    }
    res.sendStatus(200);
};




module.exports = {
    broadcast
}