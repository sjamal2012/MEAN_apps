const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

const petSchema = new Schema({
  name: {
    unique: [true, 'name is in use'],
    type: String,
    default: '',
    trim: true
  },
  type: {
    type: String,
    default: '',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  skills: [{
    type: String,
    trim: true
  }],
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

petSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' });
module.exports = mongoose.model('Pet', petSchema);