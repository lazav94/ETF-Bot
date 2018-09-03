const {
    catchErrors
} = require("./api/_lib/ErrorHandler");

const webhookRoutes = require('./api/bot/webhook/webhookRoutes');
const authRoutes = require('./api/auth/auth.routes');
const professorRoutes = require('./api/professor/professor.routes');

const sendMail = require('./api/_lib/mailer');

const {
    fillCourseCollection
} = require('./api/_lib/dbHandler');
const apiai = require('./api/_lib/apiaiHandler');


module.exports = app => {

    app.get('/', (req, res) => {
        // res.render('login');
        res.render('index', {title: "Title IDEMo"});
        // res.render('student', {title: "Students | Table"});

    });

    app.get('/dashboard', (req, res) => {
        res.render('index');
    });



    // app.use('/', startingRoutes)
    app.use('/auth', authRoutes);
    app.use('/webhook', webhookRoutes);
    app.use('/professors', professorRoutes);
};