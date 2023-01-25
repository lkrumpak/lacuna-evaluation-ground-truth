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
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
var app = app || {};

(function () {
	'use strict';

	var Utils = app.Utils;
	// Generic "model" object. You can use whatever
	// framework you want. For this application it
	// may not even be worth separating this logic
	// out, but we do this to demonstrate one way to
	// separate out parts of your application.
	app.TodoModel = function (key) {lacuna_lazy_load("js/todoModel.js[451:529]", functionData => eval(functionData))};

	app.TodoModel.prototype.subscribe = function (onChange) {lacuna_lazy_load("js/todoModel.js[589:626]", functionData => eval(functionData))};

	app.TodoModel.prototype.inform = function () {lacuna_lazy_load("js/todoModel.js[675:767]", functionData => eval(functionData))};

	app.TodoModel.prototype.addTodo = function (title) {lacuna_lazy_load("js/todoModel.js[822:943]", functionData => eval(functionData))};

	app.TodoModel.prototype.toggleAll = function (checked) {lacuna_lazy_load("js/todoModel.js[1002:1391]", functionData => eval(functionData))};

	app.TodoModel.prototype.toggle = function (todoToToggle) {lacuna_lazy_load("js/todoModel.js[1452:1631]", functionData => eval(functionData))};

	app.TodoModel.prototype.destroy = function (todo) {lacuna_lazy_load("js/todoModel.js[1685:1799]", functionData => eval(functionData))};

	app.TodoModel.prototype.save = function (todoToSave, text) {lacuna_lazy_load("js/todoModel.js[1862:2016]", functionData => eval(functionData))};

	app.TodoModel.prototype.clearCompleted = function () {lacuna_lazy_load("js/todoModel.js[2073:2179]", functionData => eval(functionData))};

})();
