var express = require("express");
var bodyParser = require('body-parser');
var session = require("express-session");
var path = require("path");
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/static"));
app.use(session({secret: 'codingdojorocks'}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response){
    let users = request.session.users = {};
    response.render('index', users);
})
var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);
var users = [];
io.sockets.on('connection', function (socket) {
  console.log("Client/socket is connected!");
  console.log("Client/socket id is: ", socket.id);
  // all the server socket code goes in here

  socket.on("got_new_user", function(data){
      console.log(data);
      console.log("gathering user info..." + data.name);
      // let identifier = Math.floor(Math.random()*100)
      // let full_name = data.name + "_" + identifier
      console.log(socket.id);
      let id = socket.id;
      socket.broadcast.emit('display_new_user', {new_user_name: data.name, id: id})
      users.push({new_user_name: data.name, id: id})
      socket.emit('display_group_chat', {users: users, id: id})

      console.log(users);
  })
  socket.on('disconnect', function(){
      console.log(socket.id);
      socket.broadcast.emit('disconnect_user', socket.id)
  })
})
