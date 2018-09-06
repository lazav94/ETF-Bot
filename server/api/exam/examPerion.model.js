const mongoose = require('mongoose');

const examPerionSchema = mongoose.Schema({
    startDate: Date,
    endDate: Date,
    exams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
    }]
});

module.exports = mongoose.model('ExamPeriond', examPerion);