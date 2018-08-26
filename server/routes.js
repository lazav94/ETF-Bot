const {
    catchErrors
} = require("./api/_lib/ErrorHandler");

const webhookRoutes = require('./api/bot/webhook/webhookRoutes');


module.exports = app => {

    app.get('/', catchErrors((req, res) => {
        console.log("HAOS");
    }));

    app.use('/webhook', webhookRoutes);
};