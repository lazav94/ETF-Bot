const mongoose = require('mongoose');

const examPerionSchema = mongoose.Schema({
  startDate: {
    type: Date,
    required: true
  },
  endDate:{
    type: Date,
    required: true
  },
  exams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam'
  }]
});

module.exports = mongoose.model('ExamPeriond', examPerionSchema);