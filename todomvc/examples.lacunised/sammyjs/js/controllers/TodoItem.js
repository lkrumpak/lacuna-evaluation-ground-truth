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

	var ESCAPE_KEY = 27;
	var ENTER_KEY = 13;

	var TodoItem = {
		// `effectCause`
		// i.e. "removeClick" = "a click to remove a todoItem"

		removeClick: function () {lacuna_lazy_load("js/controllers/TodoItem.js[227:315]", functionData => eval(functionData))},

		toggleClick: function () {lacuna_lazy_load("js/controllers/TodoItem.js[345:442]", functionData => eval(functionData))},

		editDblClick: function () {lacuna_lazy_load("js/controllers/TodoItem.js[473:627]", functionData => eval(functionData))},

		editBlur: function () {lacuna_lazy_load("js/controllers/TodoItem.js[654:780]", functionData => eval(functionData))},

		editKeyup: function (e) {lacuna_lazy_load("js/controllers/TodoItem.js[809:1068]", functionData => eval(functionData))},

		init: function () {
			$('#todo-list')
				.on('click', '.destroy', TodoItem.removeClick)
				.on('click', '.toggle', TodoItem.toggleClick)
				.on('dblclick', 'label', TodoItem.editDblClick)
				.on('blur', '.edit', TodoItem.editBlur)
				.on('keyup', '.edit', TodoItem.editKeyup);
		}
	};

	TodoApp.bind('todoListRendered', TodoItem.init);
})(jQuery);
