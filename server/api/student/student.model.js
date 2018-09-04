const mongoose = require('mongoose');



const studentSchema = mongoose.Schema({
    id: String,
    verified: {type: Boolean, default: false},
    index: { type: String },
    firstName: String,
    lastName: String,
    parentName: String,
    gender: String, // ENUM
    dateOfBirth: Date,
    addressOfBirth: String,
    jmbg: Number,
    email: { type: String default: '' },
    phone: Number,
    balance: Number,
    year: Number,
    yearOfStuding: Number,
    // prosek
    // broj polozenih ispita
    // lista polozenih ispita
    field: String // TODO maybe change to model
    // predmete koje slusa

});

module.exports = mongoose.model('Student', studentSchema);