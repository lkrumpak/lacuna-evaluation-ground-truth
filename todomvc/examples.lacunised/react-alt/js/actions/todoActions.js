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

	app.todoActions = app.alt.generateActions(
		'toggleAll',
		'toggle',
		'destroy',
		'save',
		'clearCompleted',
		'edit',
		'show'
	);

	app.todoActions = Utils.extend(
		app.todoActions,
		app.alt.createActions({
			addTodo: function (title) {lacuna_lazy_load("js/actions/todoActions.js[376:466]", functionData => eval(functionData))}
		})
	);
})();
