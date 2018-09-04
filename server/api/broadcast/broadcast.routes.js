const { catchErrors } = require ('../_lib/ErrorHandler.js');
const { broadcast } = require('./broadcast.controller');
const router = require('express').Router();


router
    .post('/', broadcast)
    ;

module.exports = router;
