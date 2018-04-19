const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

//create schema
const userSchema = new Schema({
  first_name: {
    type: String,
    default: '',
    trim: true
  },
  last_name: {
    type: String,
    default: '',
    trim: true
  },
  email: {
    unique: [true, 'email is in use'],
    type: String,
    default: '',
    trim: true
  },
  password: {
    type: String,
    default: '',
    trim: true
  },
  bikes: [{
    type: Schema.Types.ObjectId, ref: 'Bike'
  }]
}, {
  timestamps: true
});

//create callable variable using this schema
var User = mongoose.model('User', userSchema);

//utilize 'pre' function for login vs register purposes
userSchema.pre('save', function(done){
  User.findOne({'_id':this._id})
  .then(existing_user => {
    if(existing_user == null){
      bcrypt.hash(this.password, 10)
      .then(hashed_password => {
        this.password = hashed_password;
        console.log(this.password);
        done();
      })
      .catch(error => {
        console.log("error setting hash");
        done();
      })
    } else {
      done();
    }
  })
  .catch(error => console.log(user))
});

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' });
module.exports = mongoose.model('User', userSchema);