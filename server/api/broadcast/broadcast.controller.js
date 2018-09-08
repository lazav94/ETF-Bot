const { moment } = require('../_lib/services');
var CronJob = require('cron').CronJob;
const sendTextMessage = require('../bot/messanger').sendTextMessage;
const {
  getAllStudentsID,
  getAllStudentsByField
} = require('../student/student.controller');
var apply = require('../bot/conversation').applyFlag;

const Broadcast = require('./broadcast.model');


const getAllMessages = async () => Broadcast.find();

const broadcastMessage = async (message, modul) => {
  // 1. Get all students facebook IDs
  let studentIDs;

  console.log('Broadcast for modul:', modul);
  // Get all ids, if we send
  if (modul === '') {
    studentIDs = await getAllStudentsID();
  } else {
    studentIDs = (await getAllStudentsByField(modul)).map(student => student.id);
  }
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
};

const createReminder = (message, date, modul) => {

  console.log('Cron job created for', new moment(new Date(date)).toDate());

  let job = new CronJob(new moment(new Date(date)).toDate(), async () => {

    // TODO as same as regular broadcast
    console.log('CRON JOB TRIGERED', moment());
    console.log('Message', message);

    broadcastMessage(message, modul);


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
    date,
    modul
  } = req.body;

  if (reminderOn === 'true') {
    console.log('Creating timed message');
    createReminder(message, date, modul);
  } else {
    console.log('Sending messages to all user');
    broadcastMessage(message, modul);
  }
  res.sendStatus(200);
};

const index = async (req, res) => {
  const messages = await getAllMessages();
  res.render('index', {
    title: 'Title | Braodcast',
    messages,
    apply
  });
};


module.exports = {
  index,
  broadcast,
  getAllMessages
};