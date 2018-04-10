var express = require("express");
var session = require('express-session')
var app = express();

app.use(express.static(__dirname + "/static"));
app.use(session({secret: 'codingdojorocks'}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response){
    if (request.session.count == undefined){
        request.session.count = 0;

        response.render('counter', {count: request.session.count});
    }
    else {
        request.session.count++;
        console.log(request.session.count);
        response.render('counter', {count: request.session.count});
    }
})

app.get('/add2', function(request, response){
    request.session.count += 1;
    response.redirect('/')
})
app.get('/refresh', function(request, response){
    response.redirect('/')
})
app.get('/reset', function(request, response){
    request.session.count = undefined;
    response.redirect('/')
})
app.listen(8000, function(){
    console.log("listening on port 8000");
})
