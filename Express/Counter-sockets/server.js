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
    response.render('counter');
})

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  console.log("Client/socket is connected!");
  console.log("Client/socket id is: ", socket.id);
  // all the server socket code goes in here
  socket.on("posting_form", function(data){
      if (parseInt(data.change) == 1){
          console.log("adding 1 to count");
          let count = parseInt(data.count) + parseInt(data.change);
          io.emit('updated_count', {count: count})
      }
      else if (parseInt(data.change) == 2){
          console.log("adding 2 to count");
          let count = parseInt(data.count) + parseInt(data.change);
          io.emit('updated_count', {count: count})
      }
      else {
          console.log("resetting");
          let count = 0;
          io.emit('updated_count', {count: count})
      }

  })
})
