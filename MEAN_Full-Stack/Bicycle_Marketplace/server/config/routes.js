const bikeController = require('../controllers/bikes.js');
const userController = require('../controllers/users.js');
const path = require('path');

module.exports = function(app){
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
}