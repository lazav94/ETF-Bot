const Exam = require('./exam.model');
const ExamPeriod = require('./examPeriod.model');

const getExamPeriod = async examPeriod => {
  try {
    const examPeriodResult = await ExamPeriod.findOne({
      name: examPeriod
    });
    if (examPeriodResult) {
      return examPeriodResult;
    } else {
      console.log('Find first');
      return (await ExamPeriod.find().sort({
        startDate: 1
      }).limit(1))[0];
    }
  } catch (error) {
    console.log('Exam period error: ', error);
  }
};

module.exports = {
  getExamPeriod
};