const petController = require('../controllers/pets.js');

module.exports = function(app){
  app 
  .get('/pets', petController.index)
  .get('/pet_details/:id', petController.details)
  .get('/like_pet/:id', petController.like)
  .post('/new', petController.create)
  .post('/update/:id', petController.update)
  .delete('/delete/:id', petController.delete)
  .all("*", (req,res,next) => {
    res.sendFile(path.resolve("../pet-shelter/dist/index.html"))
  });
}