const {
  catchErrors
} = require('./api/_lib/ErrorHandler');

const {
  pause
} = require('./api/_lib/dashbot');

var apply = require('./api/bot/conversation').applyFlag;


const webhookRoutes = require('./api/bot/webhook/webhookRoutes');
const authRoutes = require('./api/auth/auth.routes');
const studentRoutes = require('./api/student/student.routes');
const professorRoutes = require('./api/professor/professor.routes');
const broadcastRoutes = require('./api/broadcast/broadcast.routes');
const courseRoutes = require('./api/course/course.routes');

const sendMail = require('./api/_lib/mailer');

const {
  fillCourseCollection
} = require('./api/_lib/dbHandler');
const apiai = require('./api/_lib/apiaiHandler');

const broadcastController = require('./api/broadcast/broadcast.controller');
const applyRoute = require('./api/bot/conversation').applyRoute;
module.exports = app => {

  app.get('/', async (req, res) => {
    // res.render('login');
    const messages = await broadcastController.getAllMessages();
    res.render('index', {title: 'Title | Braodcast', messages, apply });
    // res.render('student', {title: "Students | Table"});

  });

  app.post('/pause', pause);
  app.post('/apply', applyRoute);


  // app.use('/', startingRoutes)
  app.use('/auth', authRoutes);
  app.use('/webhook', webhookRoutes);
  app.use('/students', studentRoutes);
  app.use('/professors', professorRoutes);
  app.use('/broadcast', broadcastRoutes);
  app.use('/courses', courseRoutes);
};