/* global $ */
$(document).ready(function() {
 // LOAD ENTRIES
 $.getJSON('/api/todos')
 .then(addAllTodos).
 catch(function(err){
     console.log('ERR:', err); 
 });
 
 // SAVE ENTRY
 $('#todoInput').keypress(function(event) {
     if(event.which == 13) {
        createTodo();
     }
 });
 
 // DELETE ENTRY
 $('.list').on('click', '.close', function(e) {
     e.stopPropagation();
     deleteTodo($(this).parent());
 });
 
 // UPDATE ENTRY
 $('.list').on('click', '.task', function() {
     //console.log($(this));
     updateTodo($(this));
 });
});

function addAllTodos(todos) {
 //var todosObj = todos;
 todos.forEach(function(todo) {
     addTodo(todo);
 });
}

function addTodo(todo) {
var todoName = todo.name,
 newTodo = $(`<li class="task"> ${todoName} <span class="close">x</span></li>`);
 //newTodo = $('<li class="task">' + todoName + '</li>');
 newTodo.data('id', todo._id);
 newTodo.data('completed', todo.completed);
 
 if(todo.completed) {
     newTodo.addClass('done');
 }
 
 //console.log('Todo Id: ', newTodo.data('id'));
 $('.list').append(newTodo);
}

function createTodo() {
 var inputValue = $('#todoInput').val();
 $('#todoInput').val('');
 //console.log(inputValue);
 
 $.post('/api/todos', {name: inputValue})
 .then(function(newTodo) {
     //console.log(newTodo);
     addTodo(newTodo);
 });
}

function deleteTodo(todo) {
 var clickedID = todo.data('id');
 
 var urlToDelete = '/api/todos/' + clickedID;
 //console.log('URL', urlToDelete);
 $.ajax({
     method: 'DELETE',
     url: urlToDelete
 })
 .then(function(data) {
     //console.log(data);
     todo.remove();
 })
 .catch(function(err) {
     console.log(err);
 });
}

function updateTodo(todo) {
 var updateUrl =  '/api/todos/' + todo.data('id'),
     isDone = !todo.data('completed'),
     updateData = {completed : isDone};
 
 console.log('isComplete', isDone, ' Up',updateData);
 
 $.ajax({
     method: 'PUT',
     url: updateUrl,
     data: updateData
 })
 .then(function(data){
     console.log('Then', data);
     todo.toggleClass('done');
     todo.data('completed', isDone);
 })
 .catch(function(err) {
     console.log(err)
 })
}