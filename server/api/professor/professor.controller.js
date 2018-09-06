const Professor = require('./professor.model');

const getAllProfessors = async () => Professor.find();
const getProfessorByID = async id => Professor.findById(id);
const findProfessorByName = async name => {
    const professors = await getAllProfessors();
    const professor = professors.map(professor => {
        if(professor.firstName === name ||  professor.lastName === name || `${professor.firstName} ${professor.lastName}` === name || `${professor.lastName} ${professor.firstName}` === name)
            return professor;
    }).filter(professor => professor);

    return professor[0];

};



/// Routes function
const index = async (req, res) => {
    console.log('Render professors page');
    const professors = await getAllProfessors();
    res.render('professors', { title: 'Professors', professors });

}
module.exports = {
    getAllProfessors,
    getProfessorByID,
    findProfessorByName,
    index
}