const { catchErrors } = require ('../_lib/ErrorHandler');
const courseController = require('./course.controller');
const router = require('express').Router();


router
    .get('/', catchErrors(courseController.index))
    ;

module.exports = router;
