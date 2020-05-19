var express= require('express');

var router = express.Router();
var db = require("../models");
        
router.get('/', function(req, res) {
  db.Todo.find()
  .then(function(todos) {
    res.json(todos);
  })
  .catch(function(err) {
    res.send(err);
  })
});

router.post('/', function(req, res) {
  //console.log("Post request: ", req.body.name);
  db.Todo.create(req.body)
  .then(function(newTodo) {
    res.status(201).json(newTodo);
  })
  .catch(function(err) {
    console.log("CATCH Post request: ", req.body);
    res.send(err);
  })
});
/*router.post('/', function(req, res) {
  res.send('A POST MESSAGE !!');
  //console.log(req.body);
});*/

/* To get more information on a user data */
//Ex: '..api/todos/5ebacda0feb0e43071d3d5be'
router.get('/:todoId', function(req, res) {
  db.Todo.findById(req.params.todoId)
  .then(function(foundTodo){
    res.json(foundTodo);
  })
  .catch(function(err) {
    res.send(err);
  })
})

/* UPDATE */
router.put('/:todoId', function(req, res) {
  //"new: true" allows to return the update value and not the old saved
  db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
  .then(function(todo) {
    res.json(todo);
  })
  .catch(function(err) {
    res.send(err);
  })
})

/*DELETE */
router.delete('/:todoId', function(req, res) {
  db.Todo.remove({_id: req.params.todoId})
  .then(function() {
    res.send('REMOVEDDDD !');
  })
  .catch(function(err) {
    res.send(err);
  })
});

module.exports = router;