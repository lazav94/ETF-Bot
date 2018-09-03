const { catchErrors } = require ('../_lib/ErrorHandler.js');
const { index } = require('./professor.controller');
const router = require('express').Router();


router
    .get('/', index)
    ;

module.exports = router;
