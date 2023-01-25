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
/*global Backbone, TodoMVC:true */

var TodoMVC = TodoMVC || {};

(function () {
	'use strict';

	// Todo Model
	// ----------
	TodoMVC.Todo = Backbone.Model.extend({
		defaults: {
			title: '',
			completed: false,
			created: 0
		},

		initialize: function () {lacuna_lazy_load("js/TodoMVC.Todos.js[262:332]", functionData => eval(functionData))},

		toggle: function () {lacuna_lazy_load("js/TodoMVC.Todos.js[357:416]", functionData => eval(functionData))},

		isCompleted: function () {lacuna_lazy_load("js/TodoMVC.Todos.js[446:484]", functionData => eval(functionData))},

		matchesFilter: function (filter) {lacuna_lazy_load("js/TodoMVC.Todos.js[522:675]", functionData => eval(functionData))}
	});

	// Todo Collection
	// ---------------
	TodoMVC.TodoList = Backbone.Collection.extend({
		model: TodoMVC.Todo,

		localStorage: new Backbone.LocalStorage('todos-backbone-marionette'),

		comparator: 'created',

		getCompleted: function () {lacuna_lazy_load("js/TodoMVC.Todos.js[922:969]", functionData => eval(functionData))},

		getActive: function () {
			return this.reject(this._isCompleted);
		},

		_isCompleted: function (todo) {lacuna_lazy_load("js/TodoMVC.Todos.js[1079:1114]", functionData => eval(functionData))}
	});
})();
