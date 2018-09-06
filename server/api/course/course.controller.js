const Course = require('./course.model');


const getAllCourses = async () => Course.find();

const getCourseByID = async (id) => Course.findById(id);

const getAllCoursesNamesAndCodes = async () => {
    const names = await Course.aggregate([
        {
            $project: {
                name: 1,
                code: 2
            }
        }
    ]);
    // console.log(names);
    return names;
};

const findCourseByNameOrCode = async searchString => Course.findOne({ $or : [
    { name: searchString},
    { code: searchString},
]})


const index = async (req, res) => {
    const courses = await getAllCourses();
    res.render('course', {title: "Title | Braodcast", courses });
}

module.exports = {
    getAllCourses,
    getCourseByID,
    getAllCoursesNamesAndCodes,
    findCourseByNameOrCode,
    index
}