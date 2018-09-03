const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        // unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['Obavezan', 'Izborni'],
        required: true
    },
    modul: {
        type: String,
        default: '-'
    },
    year: {
        type: Number,
        required: true
    },
    esbp: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['Osnovne akademske studije', 'Master akademske studije', 'Doktorske akademske studije'],
        required: true
    },
    scoring: {
        activity: {
            type: Number,
            default: 0
        },
        practicalWork: {
            type: Number,
            default: 0
        },
        project: {
            type: Number,
            default: 0
        },
        colloquium: {
            type: Number,
            default: 0
        },
        seminar: {
            type: Number,
            default: 0
        },
        writtenExam: {
            type: Number,
            default: 0
        },
        oralExam: {
            type: Number,
            default: 0
        }
    },
    hours: {
        theory: {
            type: Number,
            default: 0
        },
        exercise: {
            type: Number,
            default: 0
        },
        other: {
            type: Number,
            default: 0
        }
    },
    // Professors
    goals: {
        type: String,
        required: true
    },
    content: {
        type: String,
        require: true
    },
    literature: {
        type: String,
        required: true
    }


});

module.exports = mongoose.model('Course', courseSchema);