// - - - - = = = = Configurations = = = = - - - - 

// Express
const express = require('express');
const app = express();

// Path
const path = require('path');

// CORS
const cors = require('cors');
app.use(cors());

// Static Directory
app.use(express.static(__dirname + '/bicycle-marketplace/dist'));

// Body Parser 
const parser = require('body-parser');
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// Morgan (optional)
let morgan = require("morgan");
app.use(morgan('dev'));




// - - - - = = = = Model = = = = - - - - 
const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bicycle-marketplace');
mongoose.connection.on('connected', () => console.log('connected to MongoDB'));
mongoose.Promise = global.Promise;
const { Schema } = mongoose;
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'name is required'],
    default: '',
    trim: true
  },
  score: {
    type: Number,
    required: [true, 'score is required'],
    default: null,
    trim: true
  }
}, {
  timestamps: true
});
userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' });
const User = mongoose.model('User', userSchema);




// - - - - = = = = Controller = = = = - - - - 
const userController = {
  index: (request, response) => {

    User.find({})
      .then(users => response.json(users))
      .catch(error => console.log(error));

  },

  create: (request, response) => {

    User.create(request.body)
      .then(user => response.json(user))
      .catch(error => console.log(error));
  }
};


// - - - - = = = = Routes = = = = - - - - 
app 
.get('/get_rankings', userController.index)
.post('/get_rankings', userController.create)
.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./github-battle/dist/index.html"))
});


// - - - - = = = = Server Listener = = = = - - - - 
const port = 9200;
app.listen(port, ()=> console.log(`Express server listening on port ${port}`));
