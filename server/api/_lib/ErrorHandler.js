const log = require('winston');

exports.catchErrors = fn => {
    return (req, res, next) => {
        return fn(req, res, next).catch(next);
    }
};

exports.notFound = (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
};