const { catchErrors } = require ('../_lib/ErrorHandler.js');
const { index } = require('./student.controller');
const router = require('express').Router();


router
    .get('/', index)
    ;

module.exports = router;
