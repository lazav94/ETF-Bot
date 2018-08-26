const { catchErrors } = require ('../../_lib/ErrorHandler');
const webhookController = require('./webhookController');
const router = require('express').Router();


router
    .get('/', catchErrors(webhookController.verifyToken))
    .post('/',catchErrors(webhookController.startConversation))
    ;

module.exports = router;
