const mongoose = require('mongoose');



const broadcastSchema = mongoose.Schema({
  date: Date,
  message: String
});

module.exports = mongoose.model('Broadcast', broadcastSchema);