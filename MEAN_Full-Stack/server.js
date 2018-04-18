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
app.use(express.static(__dirname + '/team-manager/dist'));

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
mongoose.connect('mongodb://localhost/team-manager');
mongoose.connection.on('connected', () => console.log('connected to MongoDB'));
mongoose.Promise = global.Promise;
const { Schema } = mongoose;
const playerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    minlength: [2, 'name must be at least 3 characters'],
    default: '',
    trim: true
  },
  pref: {
    type: String,
    default: '',
    trim: true
  }
}, {
  timestamps: true
});
playerSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' });
const Player = mongoose.model('Player', playerSchema);




// - - - - = = = = Controller = = = = - - - - 
const playerController = {
  index: (request, response) => {

    Player.find({})
      .then(players => response.json(players))
      .catch(error => console.log(error));

  },
  create: (request, response) => {

    Player.create(request.body)
      .then(player => response.json(player))
      .catch(error => console.log(error));

  },
  delete: (request, response) => {

    Player.remove({'_id': request.params.id})
      .then(players => response.json(players))
      .catch(error => console.log(error));
  }
};


// - - - - = = = = Routes = = = = - - - - 
app 
.get('/players', playerController.index)
.post('/players', playerController.create)
.delete('/players/:id', playerController.delete)
.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./team-manager/dist/index.html"))
});


// - - - - = = = = Server Listener = = = = - - - - 
const port = 9200;
app.listen(port, ()=> console.log(`Express server listening on port ${port}`));