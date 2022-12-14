const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },

  messAlert: {
    type: Boolean,
    default: false
  },

  password: {
    type: String,
    required: true,
  },
})

const User = mongoose.model('user', userSchema)

module.exports = User;