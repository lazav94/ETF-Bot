const mongoose = require('mongoose');



const consultationSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor'
  },
  status: Boolean,
  date: Date

});

module.exports = mongoose.model('Consultation', consultationSchema);