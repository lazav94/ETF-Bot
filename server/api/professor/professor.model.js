const mongoose = require('mongoose');

const professorSchema = mongoose.Schema({
    image: {
        type: String,
        default: 'https://cdn.iconscout.com/public/images/icon/premium/png-512/professor-avatar-teacher-scholar-manager-boss-professional-371c015c33da7fca-512x512.png'
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