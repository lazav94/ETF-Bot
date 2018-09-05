const getUserInfo = require('../bot/messanger').getUserInfo;
const Student = require('./student.model');

const getStudentById = async id => {
    return new Promise(async (resolve, reject) => {
        try {
            const student = await Student.findOne({
                id
            });
            if (student) {
                resolve(student);
            } else {
                const user = await getUserInfo(id);
                const newStudent = new Student({
                    id,
                    firstName: user.first_name,
			        lastName: user.last_name
                });
                resolve(newStudent);
            }
        } catch (error) {
            reject(error);
        }
    });
};

const getAllStudentsID = async () => {
    const students = await Student.find();
    return students.map(student => student.id);
}

const index = (req, res) => {
    console.log("Render student page");
    // TODO add student
    res.render(student, {title: 'Student'});
}

module.exports = {
    index,
    getStudentById,
    getAllStudentsID
}