var express= require('express');
var router = express.Router();
var helpers = require('../helpers/helpers');

/* GET and CREATE todos */
router.route('/')
  .get(helpers.getTodos)
  .post(helpers.createTodo);

/* GET, UPDATE and DELETE a todo */
//'/:todoId' => Ex: '..api/todos/5ebacda0feb0e43071d3d5be'
router.route('/:todoId')
  .get(helpers.findTodo)
  .put(helpers.updateTodo)
  .delete(helpers.deleteTodo);

module.exports = router;