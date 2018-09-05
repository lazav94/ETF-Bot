const mongoose = require('mongoose');



const studentSchema = mongoose.Schema({
    id: String,
    image: {type: String, default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZHEA16ZXF_244FFAtOw2pmhUE7iR0ikbDm3UI_gRdFgWWHIz8zg' },
    verified: {type: Boolean, default: false},
    token: { type: String, default: ''},
    index: { type: String, default: '' },
    firstName: { type: String, requred: true },
    lastName: { type: String, required: true },
    parentName: { type: String, default: '' },
    gender: {
        type: String,
        enum: ['muski', 'zensi', '-']
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
    // prosek
    // broj polozenih ispita
    // lista polozenih ispita
    field: { type: String, default: ''} // TODO maybe change to model
    // predmete koje slusa

});

module.exports = mongoose.model('Student', studentSchema);