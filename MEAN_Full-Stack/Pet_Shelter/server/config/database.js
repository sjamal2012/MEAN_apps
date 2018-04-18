const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const models_path = path.resolve('server', 'models');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/pet-shelter');
mongoose.connection.on('connected', () => console.log('connected to MongoDB'));

fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) {
    require(models_path + '/' + file);
  }
});