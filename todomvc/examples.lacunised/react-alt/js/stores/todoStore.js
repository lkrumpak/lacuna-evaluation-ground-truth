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
/*jshint quotmark:false */
/*jshint newcap:false */


var app = app || {};

(function () {
	'use strict';

	var Utils = app.Utils;
	var LOCALSTORAGE_NAMESPACE = 'react-alt-todo';

	var TodoStore = function () {
		this.state = {
			todos: Utils.store(LOCALSTORAGE_NAMESPACE + '.todos'),
			nowShowing: Utils.store(LOCALSTORAGE_NAMESPACE + '.nowShowing') || app.ALL_TODOS,
			editing: Utils.store(LOCALSTORAGE_NAMESPACE + '.editing') || null
		};

		this.bindListeners({
			addTodo: app.todoActions.addTodo,
			toggleAll: app.todoActions.toggleAll,
			toggle: app.todoActions.toggle,
			destroy: app.todoActions.destroy,
			save: app.todoActions.save,
			clearCompleted: app.todoActions.clearCompleted,
			edit: app.todoActions.edit,
			show: app.todoActions.show
		});
	};

	TodoStore.prototype.addTodo = function (todo) {lacuna_lazy_load("js/stores/todoStore.js[820:957]", functionData => eval(functionData))};

	TodoStore.prototype.toggleAll = function (checked) {lacuna_lazy_load("js/stores/todoStore.js[1012:1255]", functionData => eval(functionData))};

	TodoStore.prototype.toggle = function (todoToToggle) {lacuna_lazy_load("js/stores/todoStore.js[1312:1602]", functionData => eval(functionData))};

	TodoStore.prototype.destroy = function (todoToDestroy) {lacuna_lazy_load("js/stores/todoStore.js[1661:1885]", functionData => eval(functionData))};

	TodoStore.prototype.save = function (command) {lacuna_lazy_load("js/stores/todoStore.js[1935:2238]", functionData => eval(functionData))};

	TodoStore.prototype.clearCompleted = function () {lacuna_lazy_load("js/stores/todoStore.js[2291:2508]", functionData => eval(functionData))};

	TodoStore.prototype.edit = function (id) {lacuna_lazy_load("js/stores/todoStore.js[2553:2663]", functionData => eval(functionData))};

	TodoStore.prototype.show = function (nowShowing) {lacuna_lazy_load("js/stores/todoStore.js[2716:2843]", functionData => eval(functionData))};

	TodoStore.displayName = 'TodoStore';

	app.todoStore = app.alt.createStore(TodoStore);
})();
