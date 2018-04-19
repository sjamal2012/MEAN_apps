const mongoose = require('mongoose');
var Bike = require('mongoose').model('Bike');
var User = require('mongoose').model('User');
const ObjectId = require('mongodb').ObjectID;
const path = require('path');


module.exports = {
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
                console.log(err)
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
