// Express
const express = require('express');
const app = express();

// Static Directory
app.use(express.static(__dirname + '/pet-shelter/dist'));

// Body Parser 
const parser = require('body-parser');
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// - - - - = = = = Server Listener = = = = - - - - 
require('./server/config/database'); 
require('./server/config/routes')(app); 
const port = 9200;
app.listen(port, ()=> console.log(`Express server listening on port ${port}`));