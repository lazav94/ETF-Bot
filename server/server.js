const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const moment = require('moment');
// const flash = require('flash');
require('dotenv').config();

const winston =require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log`
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
      new winston.transports.Console({
        format: winston.format.simple()        }),
    ]
  });

const errorHandlers = require('./api/_lib/ErrorHandler');

const app = express();

// Midlleware to print unlndled promise Rejcetion
process.on('unhandledRejection', (reason, p) => {
    log.info('🚧 UnhandledPromiseRejectionWarning: Unhandled promise rejection', p, ' reason: ', reason);
});

// view engine setup
// This is the folder where we keep pug files
app.set('views', path.join(__dirname, 'views'));
// We use the engine pug, mustache or EJS work great too
app.set('view engine', 'pug');

// Serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({
    extended: false
}));

// app.use(flash());

// Setting up port
app.set('port', process.env.PORT || 8081);



// Connection to Mongo DB
// mongoose.connect(process.env.MONGO_URI, {
//     reconnectTries: Number.MAX_VALUE,
//     reconnectInterval: 1000,
//     autoReconnect: true
// }, (error) => {
//     log.info('Connected to Database!', process.env.MONGO_URI);
//     if (error) {
//         log.error('Mongo error', error);
//     }
// });
// mongoose.Promise = global.Promise;



// TODO Session JWT

require('./routes')(app);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);


app.listen(app.get('port'), () => {
    // log.info('ETF Bot Running on port:', app.get('port'));
    // log.info('Time:', moment());
});

module.exports = app;