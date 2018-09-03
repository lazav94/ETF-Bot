const Student = require('./student.model');

const getStudentById = async id => {
    return new Promise((resolve, reject) => {
        try {
            const student = await Student.findOne({
                id
            });
            if (student) {
                resolve(student);
            } else {
                const newStudent = new Student({
                    id
                });
                resolve(newStudent);
            }
        } catch (error) {
            reject(error);
        }
    });
}

const index = (req, res) => {
    console.log("Render student page");
    // TODO add student
    res.render(student, {title: 'Student'});
}

moduel.exports = {
    index
}