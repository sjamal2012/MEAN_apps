var Pet = require('mongoose').model('Pet');

module.exports = {
  index: (request, response) => {
    Pet.find({})
      .then(pets => response.json(pets))
      .catch(error => console.log(error));
  },
  create: (request, response) => {
    Pet.create(request.body)
      .then(() => {
        Pet.findOne({name:request.body.name})
        .then(pet => response.json(pet))
        .catch(error => console.log(error))
      })
      .catch(error => {
        console.log(error)
        response.json(null)
      }) 
  },
  details: (request, response) => {
    console.log('ran details')
    Pet.findOne({'_id': request.params.id})
      .then(pet => response.json(pet))
      .catch(error => console.log(error));
  },
  like: (request, response) => {
    Pet.findOne({'_id': request.params.id})
      .then(pet => {
        pet.likes++;
        pet.save(function(err){
          if(err){
            console.log('!!-could not add like-!!')
          } else {
            response.json(pet)
          }
        })
      })
      .catch(error => console.log(error));
  },
  update: (request, response) => {
    Pet.findOne({'_id': request.params.id})
      .then(pet => {
        pet.name = request.body.name;
        pet.type = request.body.type;
        pet.description = request.body.description;
        pet.skills = [];
        if(request.body.skills0){
          console.log('setting skills[0]')
          pet.skills.splice(0, 0, request.body.skills0);
        }
        if(request.body.skills1){
          console.log('setting skills[1]')
          pet.skills.splice(1, 0, request.body.skills1);
        }
        if(request.body.skills2){
          console.log('setting skills[2]')
          pet.skills.splice(2, 0, request.body.skills2);
        }
        pet.save(function(err){
          if(err){
            console.error('pet could not be updated...')
            response.json(null)
          } else {
            console.log('pet updated')
            response.json(pet)
          }
        })
      })
  },
  delete: (request, response) => {
    Pet.remove({'_id': request.params.id})
      .then(pets => response.json(pets))
      .catch(error => console.log(error));
  }
};