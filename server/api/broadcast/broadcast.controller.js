const moment = require('moment');
var CronJob = require('cron').CronJob;
const sendTextMessage = require('../bot/messanger').sendTextMessage;
const getAllStudentsID = require('../student/student.controller').getAllStudentsID;

const createReminder = (message, date) => {

    console.log('Cron job created for', new Date(date));

	let job = new CronJob(new Date(date), async () => {

        // TODO as same as regular broadcast
        console.log('CRON JOB TRIGERED', moment());
        console.log('Message', message);

        const studentIDs = await getAllStudentsID();
        studentIDs.map(id => {
            console.log('Sending message to ', id);
            sendTextMessage(id, message);
        })


        job.stop();
	}, () => {
		console.log('Reminder Cron Job ended!');
		// job = null;
	},
	false,
	null // timeZone
    );
    job.start();
};

const broadcast = async (req, res) => {
    console.log('Broadcast controller function trigeer');
    console.log('Broadcast data', req.body);

    const {
        message,
        reminderOn,
        date
    } = req.body;

    if(reminderOn === 'true') {
        // TODO create cron job
        console.log('Creating timed message');
        // console.log(date);
        console.log(date);
        createReminder(message, date)
    } else {
        // send message now
        console.log('Sending messages to all user');
        const studentIDs = await getAllStudentsID();
        console.log(studentIDs);
        studentIDs.map(id => {
            console.log('Sending message to ', id);
            sendTextMessage(id, message);
        })

    }

    res.sendStatus(200);
};




module.exports = {
    broadcast
}