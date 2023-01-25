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

	var ENTER_KEY = 13;

	var TodoList = {
		// `effectCause`
		// i.e. "newKeydown" = "a keydown event to create a new Todo"

		newKeydown: function (e) {lacuna_lazy_load("js/controllers/TodoList.js[212:414]", functionData => eval(functionData))},

		toggleAllClick: (function () {
			var flags = ['active', 'completed'];
			var count = 1;

			return function () {lacuna_lazy_load("js/controllers/TodoList.js[531:605]", functionData => eval(functionData))};
		})(),

		removeCompletedClick: function () {lacuna_lazy_load("js/controllers/TodoList.js[652:701]", functionData => eval(functionData))},

		init: function () {
			// The TodoApp has launched, let's bind our events.

			$('#new-todo').on('keydown', TodoList.newKeydown);
			$('#toggle-all').on('click', TodoList.toggleAllClick);
			$('#footer').on('click', '#clear-completed', TodoList.removeCompletedClick);
		}
	};

	TodoApp.bind('todoListRendered', TodoList.init);
})(jQuery);
