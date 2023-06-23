const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  descr: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true

  }
});

module.exports = mongoose.model('Productos', userSchema);   