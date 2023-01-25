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
/*global window, Ractive */
(function (window, Ractive) {
	'use strict';

	// Create some filter functions, which we'll need later
	var filters = {
		completed: function (item) {lacuna_lazy_load("js/app.js[177:203]", functionData => eval(functionData))},
		active: function (item) {lacuna_lazy_load("js/app.js[231:258]", functionData => eval(functionData))}
	};

	// The keycode for the 'enter' and 'escape' keys
	var ENTER_KEY = 13;
	var ESCAPE_KEY = 27;

	// Create our Ractive instance
	var todoList = new Ractive({
		// Specify a target element - an ID, a CSS selector, or the element itself
		el: 'todoapp',

		// Specify a template, or the ID of a script tag containing the template
		template: '#main',

		// This is our viewmodel - as well as our list of tasks (which gets added
		// later from localStorage - see persistence.js), it includes helper
		// functions and computed values
		data: {
			filter: function (item) {lacuna_lazy_load("js/app.js[831:1176]", functionData => eval(functionData))},

			// completedTasks() and activeTasks() are computed values, that will update
			// our app view reactively whenever `items` changes (including changes to
			// child properties like `items[1].completed`)
			completedTasks: function () {lacuna_lazy_load("js/app.js[1416:1478]", functionData => eval(functionData))},

			activeTasks: function () {lacuna_lazy_load("js/app.js[1509:1568]", functionData => eval(functionData))},

			// By default, show all tasks. This value changes when the route changes
			// (see routes.js)
			currentFilter: 'all'
		},

		// We can define custom events. Here, we're defining an `enter` event,
		// and an `escape` event, which fire when the user hits those keys while
		// an input is focused:
		//
		// <input id="edit" class="edit" on-blur-enter="submit" on-escape="cancel" autofocus>
		events: (function () {
			var makeCustomEvent = function (keyCode) {
				return function (node, fire) {
					var keydownHandler = function (event) {lacuna_lazy_load("js/app.js[2115:2237]", functionData => eval(functionData))};

					node.addEventListener('keydown', keydownHandler, false);

					return {
						teardown: function () {lacuna_lazy_load("js/app.js[2345:2421]", functionData => eval(functionData))}
					};
				};
			};

			return {
				enter: makeCustomEvent(ENTER_KEY),
				escape: makeCustomEvent(ESCAPE_KEY)
			};
		}())
	});


	// Here, we're defining how to respond to user interactions. Unlike many
	// libraries, where you use CSS selectors to dictate what event corresponds
	// to what action, in Ractive the 'meaning' of the event is baked into the
	// template itself (e.g. <button on-click='remove'>Remove</button>).
	todoList.on({

		// Removing a todo is as straightforward as splicing it out of the array -
		// Ractive intercepts calls to array mutator methods and updates the view
		// accordingly. The DOM is updated in the most efficient manner possible.
		remove: function (event, index) {lacuna_lazy_load("js/app.js[3131:3175]", functionData => eval(functionData))},

		// The `event` object contains useful properties for (e.g.) retrieving
		// data from the DOM
		newTodo: function (event) {lacuna_lazy_load("js/app.js[3302:3508]", functionData => eval(functionData))},

		edit: function (event) {lacuna_lazy_load("js/app.js[3536:3642]", functionData => eval(functionData))},

		submit: function (event) {lacuna_lazy_load("js/app.js[3672:3919]", functionData => eval(functionData))},

		cancel: function (event) {lacuna_lazy_load("js/app.js[3949:4002]", functionData => eval(functionData))},

		clearCompleted: function () {lacuna_lazy_load("js/app.js[4035:4183]", functionData => eval(functionData))},

		toggleAll: function (event) {lacuna_lazy_load("js/app.js[4216:4428]", functionData => eval(functionData))}
	});

	window.todoList = todoList;

})(window, Ractive);
