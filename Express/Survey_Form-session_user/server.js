var express = require("express");
var bodyParser = require('body-parser');
var session = require("express-session");
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/static"));
app.use(session({secret: 'codingdojorocks'}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response){
    response.render('index');
})

app.post('/result', function(request, response){
    request.session.name = request.body.name;
    name = request.session.name;
    request.session.location = request.body.location;
    location = request.session.location;
    request.session.language = request.body.language;
    language = request.session.language;
    request.session.comment = request.body.comment;
    comment = request.session.comment;

    response.render('show', {name:name,location:location,language:language,comment:comment})
})

app.listen(8000, function(){
    console.log("listening on port 8000");
})
