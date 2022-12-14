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

const Mess = mongoose.model('messages', messSchema)
module.exports = Mess;