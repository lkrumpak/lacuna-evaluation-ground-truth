// LACUNA LAZY LOAD FALLBACK
function lacuna_lazy_load(id, callback){
    fetch("http://127.0.0.1:8125/lazyload/", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({id})
    }).then(response => {
        return response.text();
    }).then(callback);
}
/*global jQuery, TodoApp */

(function ($) {
	'use strict';

	var TodoItem = {
		renderAllTodos: function (e, data) {
			this.renderEach('templates/todoItem.template', data.visible).then(function () {
				$('#todo-list').html(this.content);

				TodoApp.trigger('todoItemsRendered', data);
			});
		},

		toggleCompleteClass: function (e, data) {lacuna_lazy_load("js/views/TodoItem.js[345:515]", functionData => eval(functionData))},

		editingTodo: function (e, data) {lacuna_lazy_load("js/views/TodoItem.js[552:697]", functionData => eval(functionData))},

		doneEditingTodo: function (e, data) {lacuna_lazy_load("js/views/TodoItem.js[738:929]", functionData => eval(functionData))}
	};

	TodoApp.bind('todosUpdated', TodoItem.renderAllTodos);

	TodoApp.bind('toggleAllTodosCompleted', TodoItem.toggleCompleteClass);
	TodoApp.bind('toggledTodoCompleted', TodoItem.toggleCompleteClass);

	TodoApp.bind('editingTodo', TodoItem.editingTodo);
	TodoApp.bind('cancelEditingTodo', TodoItem.doneEditingTodo);
	TodoApp.bind('doneEditingTodo', TodoItem.doneEditingTodo);
})(jQuery);
