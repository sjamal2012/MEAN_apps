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

//ObjectId
const ObjectId = require('mongodb').ObjectID

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

//Validators & Bcrypt
const validator = require('express-validator');
const email_validator = require('email-validator');
const bcrypt = require('bcrypt-as-promised');
app.use(validator());

// Morgan (optional)
let morgan = require("morgan");
app.use(morgan('dev'));




// - - - - = = = = Model = = = = - - - - 
const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bike-market');
mongoose.connection.on('connected', () => console.log('connected to MongoDB'));
mongoose.Promise = global.Promise;
const { Schema } = mongoose;
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
})

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
userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' });
const User = mongoose.model('User', userSchema);
const Bike = mongoose.model('Bike', bikeSchema);




// - - - - = = = = Controller = = = = - - - - 
const userController = {
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

const bikeController = {
  index: (request, response) => {
    Bike.find({})
      .then(bikes => response.json(bikes))
      .catch(error => console.log(error));
  },
  my_index: (request, response) => {
    User.findOne({'_id': request.params.id})
      .populate('bikes')
      .exec(function(err, user){
        response.json(user.bikes);
      })  
  },
  create: (request, response) => {
    User.findOne({'_id': request.params.id})
      .then(user => {
        let ObjectId = mongoose.Types.ObjectId(request.params.id);
        let bike = new Bike();
        bike._user = ObjectId;
        bike.title = request.body.bike.title;
        bike.description = request.body.bike.description;
        bike.img = request.body.bike.img;
        bike.price = request.body.bike.price;
        bike.city = request.body.bike.city;
        bike.state = request.body.bike.state;
        Bike.create(bike)
          .then(() => {
            console.log(bike)
            let newBike = bike.toObject();
            user.bikes.push(newBike)
            console.log(user)
            user.save(function(err){
              if(err){
                console.error('bike could not be pushed to user...')
              } else {
                console.log('added bike to user ' + user.first_name + ' ' + user.last_name)
              }
            })
            response.json(bike)
          })
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error));
  },
  update: (request, response) => {
    Bike.findOne({'_id': request.params.id})
      .then(bike => {
        bike.title = request.body.title;
        bike.description = request.body.description;
        bike.img = request.body.img;
        bike.price = request.body.price;
        bike.city = request.body.city;
        bike.state = request.body.state;
        bike.save(function(err){
          if(err){
            console.error('bike could not be updated...')
          } else {
            console.log('bike updated')
            response.json()
          }
        })
      })
  },
  delete: (request, response) => {
    Bike.remove({'_id': request.params.id})
      .then(bikes => {
        console.log(request.body)
        User.findOne({'_id':request.body.user_id})
          .then(user => {
            let index = user.bikes.indexOf(ObjectId(request.params.id))
            if (index > -1){
              user.bikes.splice(index, 1);
              user.save(function(err){
                if(err){
                  console.error('bike could not be removed form user')
                } else {
                  response.json()
                  console.log('removed bike from user')
                }
              })
            }
          })
      })
      .catch(error => console.log(error));
  }
};


// - - - - = = = = Routes = = = = - - - - 
app 
.get('/bikes', bikeController.index)
.get('/my_bikes/:id', bikeController.my_index)
.get('/get_user/:id', userController.get)
.post('/new_bike/:id', bikeController.create)
.post('/new_user', userController.create)
.post('/login', userController.login)
.post('/delete_bike/:id', bikeController.delete)
.post('/update_bike/:id', bikeController.update)
.delete('/logout', userController.logout)
.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./bicycle-marketplace/dist/index.html"))
});


// - - - - = = = = Server Listener = = = = - - - - 
const port = 9200;
app.listen(port, ()=> console.log(`Express server listening on port ${port}`));