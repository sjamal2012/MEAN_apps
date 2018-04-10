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
  console.log("Client/socket with id " + socket.id + "is connected!");
  // all the server socket code goes in here
  socket.on('new_user', function(data){
      socket.broadcast.emit('display_new_user', {user:data.user, id: socket.id})
  })
  socket.on("new_message", function(data){
      let id = socket.id;

      io.emit('display_new_message', {message:data.message, user:data.user, id:id})
      users.push(data)
      socket.emit('display_messages', {message:data.message, id:id})
  })
  socket.on('disconnect', function(){
      console.log("user disconnected");
      for (var i = 0; i < users.length; i++) {
          console.log(users[i].id, socket.id);
          if (users[i].id == socket.id){
              console.log("got user");
              socket.broadcast.emit('left_chat', {user:users[i].user})
          }
      }
  })
})
