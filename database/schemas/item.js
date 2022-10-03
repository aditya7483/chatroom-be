const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  price: {
    type: Number,
    required: true
  },
  img: {
    type: Image
  }
})

module.exports = mongoose.model('notes', itemSchema);