var http = require('http');
var my_module = require('./mathlib')();
console.log(my_module);
console.log(my_module.add(2,3));
console.log(my_module.multiply(2,4));
console.log(my_module.square(5));
console.log(my_module.random(20,34));
