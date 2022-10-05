const mongoose = require('mongoose')

const messSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('messages', messSchema);