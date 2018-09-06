const mongoose = require('mongoose');



const studentSchema = mongoose.Schema({
    id: { type: String, required: true, unique: true },
    image: {type: String, default: 'https://cdn4.iconfinder.com/data/icons/professions-1-2/151/8-512.png' },
    verified: {type: Boolean, default: false},
    token: { type: String, default: ''},
    index: { type: String, default: '' },
    firstName: { type: String, requred: true },
    lastName: { type: String, required: true },
    parentName: { type: String, default: '' },
    gender: {
        type: String,
        enum: ['muski', 'zenski', '-']
    },
    dateOfBirth: { type: String, default: '' },
    addressOfBirth: { type: String, default: '' },
    jmbg: {
        type: String,
        maxlength: 13,
        default: '',
    },
    email: { type: String, default: '' },
    phone: { type: String, default: ''},
    balance: Number,
    year: { type: Number, default: -1},
    field: { type: String, default: ''},
    gpa: {type: Number, default: 0 },

    exams: [{
        status: {
            type: String,
            enum: ['POLOZIO', 'PAO', '-']
        },
        exam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exam'
        }
    }],
    // predmete koje slusa
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
    // broj polozenih ispita - to se racune exam koji su success
    // exam koji imaju status success

});

module.exports = mongoose.model('Student', studentSchema);