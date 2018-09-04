const { catchErrors } = require ('../_lib/ErrorHandler.js');
const { login, verify } = require('./auth.controller');
const router = require('express').Router();


router
    .post('/', login)
    .get('/verify', catchErrors(verify))
    // .post('/',catchErrors(authController.login))
    ;

module.exports = router;
