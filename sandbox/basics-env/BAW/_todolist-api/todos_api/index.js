/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable no-var */

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');

// Including exported routes from "routes/todos.js"
var todoRoutes = require('./routes/routes');

// Allow to access the request body that comes in
/* var jsonParser = bodyParser.json();
var urlEncodedParser = bodyParser.urlencoded({extended: true}); */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/vues'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile('/index.html');
});

/* app.get('/', urlEncodedParser, function(req, res) {
    res.send('THE ROOT ROUTES !');
}) */

/* app.get('/happy', function(req, res) {
    res.send(':op');
}) */

// Specify url path to use todos in app
app.use('/api/todos', todoRoutes);
/* app.use('/api/todos', jsonParser, todoRoutes); */

app.get('/json', function(req, res) {
  res.json('{data: mydata}');
});

app.listen(port, function() {
  console.log('APP ISRUNNING ON PORT ' + port);
});
