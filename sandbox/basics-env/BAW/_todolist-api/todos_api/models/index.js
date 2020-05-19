/* FILE TO CONNECT TO MONGOOSE */
var mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/todo-api', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ));;

mongoose.Promise = Promise;

module.exports.Todo = require("./models");