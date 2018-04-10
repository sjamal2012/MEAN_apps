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
app.use(express.static(__dirname + '/anonymous-notes/dist'));

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
mongoose.connect('mongodb://localhost/note-forum');
mongoose.connection.on('connected', () => console.log('connected to MongoDB'));
mongoose.Promise = global.Promise;
const { Schema } = mongoose;
const noteSchema = new Schema({
  content: {
    type: String,
    required: [true, 'Note is required'],
    minlength: [3, 'Note must be at least 3 characters'],
    default: '',
    trim: true
  }
}, {
  timestamps: true
});
noteSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' });
const Note = mongoose.model('Note', noteSchema);




// - - - - = = = = Controller = = = = - - - - 
const noteController = {
  index: (request, response) => {

    Note.find({})
      .then(notes => response.json(notes))
      .catch(error => console.log(error));

  },
  create: (request, response) => {

    Note.create(request.body)
      .then(note => response.json(note))
      .catch(error => console.log(error));

  }
};


// - - - - = = = = Routes = = = = - - - - 
app 
.get('/notes', noteController.index)
.post('/notes', noteController.create)
.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./anonymous-notes/dist/index.html"))
});


// - - - - = = = = Server Listener = = = = - - - - 
const port = 9200;
app.listen(port, ()=> console.log(`Express server listening on port ${port}`));