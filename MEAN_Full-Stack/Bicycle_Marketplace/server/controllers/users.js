const mongoose = require('mongoose');
var User = require('mongoose').model('User');
const validator = require('express-validator');
const email_validator = require('email-validator');
const bcrypt = require('bcrypt-as-promised');
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

module.exports = {
  create: (request, response) => {
    console.log('creating user...')
    if(email_validator.validate(request.body.email) == true){
      User.create(request.body)
      .then(users => {
        console.log('user created')
        User.findOne({email: request.body.email})
          .then(user => {
            if(user!=null){
              completeLogin(request, response, user)
            } else {
              clearUser(request,response);
            }
          })
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error));
    }
  },
  login: (request, response) => {
    User.findOne({email: request.body.email})
      .then(user => {
        if(user!=null){
          bcrypt.hash(request.body.password, 10)
          .then(hashed_password => {
            bcrypt.compare(request.body.password, user.password)
            .then(matches => {
              if(matches==true){
                completeLogin(request, response, user);
              } else {
                clearUser(request, response);
              }
            })
            .catch(err => {
              console.log(err)
              console.error("email or password is incorrect");
            })
          })
        } else {
          response.json(null);
        }
      })
      .catch(error => console.log(error));
  },
  get: (request, response) => {
    User.findOne({'_id': request.params.id})
      .then(user => {
        response.json(user.toObject())
      })
      .catch(error => console.log(error));
  },
  logout: (request, response) => {
    clearUser(request, response);
  }
};

//called upon login/logout respectively
  //stores cookies for current user
  //clears cookies
function completeLogin(request, response, user) {
  console.log('logged in as ' + user.first_name);
  request.session.user = user.toObject();
  delete request.session.user.password;
  response.cookie('session')
  response.cookie('userID', user._id.toString());
  response.cookie('expiration', Date.now() + 86400 * 1000);
  response.json(user);
}
function clearUser(request, response) {
  console.log('logging out');
  request.session.destroy();
  response.clearCookie('userID');
  response.clearCookie('expiration');
  response.json(null);
}