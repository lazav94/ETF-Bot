const Student = require('./student.model');
const {
  getCourseByID
} = require('../course/course.controller');

const getStudentById = async id => {
  return new Promise(async (resolve, reject) => {
    try {
      const student = await Student.findOne({
        id
      });
      if (student) {
        return resolve(student);
      } else {
        const getUserInfo = require('../bot/messanger').getUserInfo;
        const user = await getUserInfo(id);
        const newStudent = new Student({
          id,
          firstName: user.first_name,
          lastName: user.last_name
        });
        await newStudent.save();
        return resolve(newStudent);
      }
    } catch (error) {
      return reject(error);
    }
  });
};

const getAllStudentsID = async () => {
  const students = await Student.find();
  return students.map(student => student.id);
};

const getAllStudents = async () => Student.find();
const getAllStudentsByField = async (field) => Student.find({
  field
});
const getAllVerifiedStudents = async () => Student.find({
  verified: true
});


const getApplyExam = async id => {
  try {
    const student = await Student.findById(id).populate('exams.exam').exec();
    // const student = await Student.findOne({
      // firstName: 'Lazar'
    // }).populate('exams.exam').exec();

    if (student) {
      console.log('ID');
      console.log('Student', student.firstName);
      // console.log('Exams', student.exams);
      const exams = student.exams
        .filter(e => e.status === '-')
        .map(e => e.exam);
      const courses = await Promise.all(exams.map(async e => getCourseByID(e.course)));
      return courses;
      // await Promise.all(exams);
    } else {
      throw new Error('Student is null');
    }
  } catch (error) {
    console.error('Get apply exam', error);
  }

};
getApplyExam();

const index = async (req, res) => {
  console.log('Render student page');
  // TODO add student
  const students = await getAllVerifiedStudents();
  res.render('student', {
    title: 'Student',
    students
  });
};


module.exports = {
  index,
  getStudentById,
  getAllStudentsID,
  getAllStudents,
  getAllStudentsByField,
  getApplyExam
};