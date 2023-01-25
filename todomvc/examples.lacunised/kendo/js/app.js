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
/*global $ kendo*/
var app = app || {};

(function ($, kendo) {
	'use strict';

	var filterBase = {
		field: 'completed',
		operator: 'eq'
	};

	// Route object to manage filtering the todo item list
	var router = new kendo.Router();

	router.route('/', function () {
		app.todoData.filter({});
		app.todoViewModel.set('filter', '');
	});

	router.route('/active', function () {lacuna_lazy_load("js/app.js[377:489]", functionData => eval(functionData))});

	router.route('/completed', function () {lacuna_lazy_load("js/app.js[533:647]", functionData => eval(functionData))});

	// Todo Model Object
	app.Todo = kendo.data.Model.define({
		id: 'id',
		fields: {
			id: { editable: false, nullable: true },
			title: { type: 'string' },
			completed: { type: 'boolean', nullable: false, defaultValue: false },
			edit: { type: 'boolean', nullable: false, defaultValue: false }
		}
	});

	// The Todo DataSource. This is a custom DataSource that extends the
	// Kendo UI DataSource and adds custom transports for saving data to
	// localStorage.
	// Implementation in js/lib/kendo.data.localstoragedatasource.ds
	app.todoData = new kendo.data.extensions.LocalStorageDataSource({
		itemBase: 'todos-kendo',
		schema: {
			model: app.Todo
		},
		change: function () {
			var completed = $.grep(this.data(), function (el) {lacuna_lazy_load("js/app.js[1390:1428]", functionData => eval(functionData))});

			app.todoViewModel.set('allCompleted', completed.length === this.data().length);
		}
	});

	// The core ViewModel for our todo app
	app.todoViewModel = kendo.observable({
		todos: app.todoData,
		filter: null,

		// Main element visibility handler
		isVisible: function () {
			return this.get('todos').data().length ? '' : 'hidden';
		},

		// new todo value
		newTodo: null,

		// Core CRUD Methods
		saveTodo: function () {lacuna_lazy_load("js/app.js[1859:2106]", functionData => eval(functionData))},

		toggleAll: function () {lacuna_lazy_load("js/app.js[2134:2322]", functionData => eval(functionData))},
		startEdit: function (e) {lacuna_lazy_load("js/app.js[2350:2484]", functionData => eval(functionData))},
		endEdit: function (e) {lacuna_lazy_load("js/app.js[2510:2892]", functionData => eval(functionData))},
		cancelEdit: function (e) {lacuna_lazy_load("js/app.js[2921:3016]", functionData => eval(functionData))},

		sync: function () {lacuna_lazy_load("js/app.js[3039:3073]", functionData => eval(functionData))},
		destroy: function (e) {lacuna_lazy_load("js/app.js[3099:3156]", functionData => eval(functionData))},
		destroyCompleted: function () {lacuna_lazy_load("js/app.js[3190:3324]", functionData => eval(functionData))},

		// Methods for retrieving filtered todos and count values
		activeTodos: function () {
			return $.grep(this.get('todos').data(), function (el) {lacuna_lazy_load("js/app.js[3473:3512]", functionData => eval(functionData))});
		},
		activeCount: function () {
			return this.activeTodos().length;
		},
		completedTodos: function () {
			return $.grep(this.get('todos').data(), function (el) {lacuna_lazy_load("js/app.js[3680:3718]", functionData => eval(functionData))});
		},
		completedCount: function () {
			return this.completedTodos().length;
		},

		allCompleted: false,

		// Text value bound methods
		activeCountText: function () {
			return this.activeCount() === 1 ? 'item' : 'items';
		},

		// Class attribute bound methods
		todoItemClass: function (item) {lacuna_lazy_load("js/app.js[4020:4140]", functionData => eval(functionData))},
		allFilterClass: function () {
			return this.get('filter') ? '' : 'selected';
		},
		activeFilterClass: function () {
			return this.get('filter') === 'active' ? 'selected' : '';
		},
		completedFilterClass: function () {
			return this.get('filter') === 'completed' ? 'selected' : '';
		}

	});

	// Bind the ViewModel to the todoapp DOM element
	kendo.bind($('#todoapp'), app.todoViewModel);

	router.start();

}($, kendo));
