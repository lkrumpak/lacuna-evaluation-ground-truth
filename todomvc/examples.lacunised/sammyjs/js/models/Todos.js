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
/*global TodoApp */

(function () {
	'use strict';

	var Todos = {
		all: [],
		visible: [],
		flag: null,

		createId: (function () {
			// Creates a unique ID for every todoItem.
			var s4 = function () {lacuna_lazy_load("js/models/Todos.js[205:291]", functionData => eval(functionData))};

			return function () {lacuna_lazy_load("js/models/Todos.js[316:346]", functionData => eval(functionData))};
		})(),

		findOne: function (param, value) {lacuna_lazy_load("js/models/Todos.js[392:577]", functionData => eval(functionData))},

		filter: function (param, value) {
			return Todos.all.filter(function (thisTodo) {lacuna_lazy_load("js/models/Todos.js[663:707]", functionData => eval(functionData))});
		},

		get: function (id) {
			if (id && id !== 'active' && id !== 'completed') {
				// We are looking for a particular todoItem.
				return Todos.findOne('id', id);
			} else if (id === 'active' || id === 'completed') {
				// We either want to receive only the completed or active todoItems.
				return Todos.filter('completed', id === 'completed');
			} else {
				// We want all of the todoItems.
				return JSON.parse(localStorage.getItem('todos-sammyjs')) || [];
			}
		},

		getData: function () {
			return {
				flag: Todos.flag,
				all: Todos.all,
				active: Todos.get('active'),
				completed: Todos.get('completed'),
				visible: Todos.get(Todos.flag)
			};
		},

		save: function (e, data) {lacuna_lazy_load("js/models/Todos.js[1417:1544]", functionData => eval(functionData))},

		toggleCompleted: function (e, data) {lacuna_lazy_load("js/models/Todos.js[1585:1802]", functionData => eval(functionData))},

		toggleAllCompleted: function () {lacuna_lazy_load("js/models/Todos.js[1839:2123]", functionData => eval(functionData))},

		edit: function (e, data) {lacuna_lazy_load("js/models/Todos.js[2153:2287]", functionData => eval(functionData))},

		removeCompleted: function () {lacuna_lazy_load("js/models/Todos.js[2321:2423]", functionData => eval(functionData))},

		remove: function (e, data) {lacuna_lazy_load("js/models/Todos.js[2455:2528]", functionData => eval(functionData))},

		fetchTodos: function (e, flag) {
			// Called from each route's instantiation.
			Todos.all = Todos.get();

			Todos.flag = flag;

			TodoApp.trigger('launch', Todos.getData());

			Todos.sync();
		},

		syncQuiet: function () {
			// Syncs data with `localStorage`, without forcing all of the todoItems
			// to repaint.
			localStorage.setItem('todos-sammyjs', JSON.stringify(Todos.all));

			TodoApp.trigger('todosUpdatedQuiet', Todos.getData());
		},

		sync: function () {
			// Syncs data with `localStorage`, and rebuilds the todoItems.
			Todos.syncQuiet();

			TodoApp.trigger('todosUpdated', Todos.getData());
		}
	};

	TodoApp
		.bind('fetchTodos', Todos.fetchTodos)
		.bind('saveTodo', Todos.save)
		.bind('doneEditingTodo', Todos.edit)
		.bind('toggleTodoCompleted', Todos.toggleCompleted)
		.bind('removeTodo', Todos.remove)
		.bind('toggleAllTodosCompleted', Todos.toggleAllCompleted)
		.bind('removeCompletedTodos', Todos.removeCompleted);
})();
