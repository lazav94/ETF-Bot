const mongoose = require('mongoose');

const professorSchema = mongoose.Schema({
    image: {
        type: String,
        default: ''
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    office: {
        type: String,
        required: true
    }
    // subjects - predmete koje predaje

});

module.exports = mongoose.model('Professor', professorSchema);