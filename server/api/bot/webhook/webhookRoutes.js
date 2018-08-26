const { catchErrors } = require ('../../_lib/ErrorHandler');
const webhookController = require('./webhookController');
const router = require('express').Router();


router
    .get('/webhook', catchErrors(webhookController.verifyToken))
    .post('/webhook',catchErrors(webhookController.startConversation))
    ;

module.exports = router;
