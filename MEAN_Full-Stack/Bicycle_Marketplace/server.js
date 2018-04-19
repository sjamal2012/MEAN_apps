// - - - - = = = = Configurations = = = = - - - - 

// Express
const express = require('express');
const app = express();

//Session
const session = require('express-session');
const cookieParser = require('cookie-parser');
const sessionConfig = {
  saveUninitialized: true,
  secret: 'sessionSecret',
  resave: false,
  name: 'session',
  rolling: true,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 360000
  }
}
app.use(session(sessionConfig));
app.use(cookieParser('secret'));

// Path
const path = require('path');

// Static Directory
app.use(express.static(__dirname + '/bicycle-marketplace/dist'));

// Body Parser 
const parser = require('body-parser');
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// - - - - = = = = Server Listener = = = = - - - - 
require('./server/config/database'); 
require('./server/config/routes')(app);
const port = 9200;
app.listen(port, ()=> console.log(`Express server listening on port ${port}`));