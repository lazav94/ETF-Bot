const mongoose = require('mongoose');



const studentSchema = mongoose.Schema({
    id: String,
    verified: {type: Boolean, default: false},
    token: { type: String, default: ''},
    index: { type: String },
    firstName: { type: String, requred: true },
    lastName: { type: String, required: true },
    parentName: String,
    gender: {
        type: String,
        enum: ['muski', 'zensi', '-']
    },
    dateOfBirth: Date,
    addressOfBirth: { type: String, required: true },
    jmbg: {
        type: String,
        minlength: 13,
        maxlength: 13
    },
    email: { type: String, default: '' },
    phone: { type: String, default: ''},
    balance: Number,
    year: { type: Number, default: -1},
    // prosek
    // broj polozenih ispita
    // lista polozenih ispita
    field: { type: String, default: ''} // TODO maybe change to model
    // predmete koje slusa

});

module.exports = mongoose.model('Student', studentSchema);