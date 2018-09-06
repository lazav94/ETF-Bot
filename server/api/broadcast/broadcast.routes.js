const { catchErrors } = require ('../_lib/ErrorHandler.js');
const { index, broadcast } = require('./broadcast.controller');
const router = require('express').Router();


router
    .get('/', index)
    .post('/', broadcast)
    ;

module.exports = router;
