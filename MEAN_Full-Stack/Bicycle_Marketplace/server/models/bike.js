const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

const bikeSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  title: {
    type: String,
    default: '',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  img: {
    type: String,
    default: '',
    trim: true
  },
  price: {
    type: Number,
    default: null,
    trim: true
  },
  city: {
    type: String,
    default: '',
    trim: true
  },
  state: {
    type: String,
    default: '',
    trim: true
  }
}, {
  timestamps: true
});

bikeSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' });
module.exports = mongoose.model('Bike', bikeSchema);