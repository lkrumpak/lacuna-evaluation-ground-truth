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
/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Collection
	// ---------------

	// The collection of todos is backed by *localStorage* instead of a remote
	// server.
	var Todos = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.Todo,

		// Save all of the todo items under this example's namespace.
		localStorage: new Backbone.LocalStorage('todos-react-backbone'),

		// Filter down the list of all todo items that are finished.
		completed: function () {lacuna_lazy_load("js/todos.js[528:574]", functionData => eval(functionData))},

		// Filter down the list to only todo items that are still not finished.
		remaining: function () {lacuna_lazy_load("js/todos.js[676:723]", functionData => eval(functionData))},

		// We keep the Todos in sequential order, despite being saved by unordered
		// GUID in the database. This generates the next order number for new items.
		nextOrder: function () {lacuna_lazy_load("js/todos.js[907:970]", functionData => eval(functionData))},

		// Todos are sorted by their original insertion order.
		comparator: 'order'
	});

	// Create our global collection of **Todos**.
	app.todos = new Todos();
})();
