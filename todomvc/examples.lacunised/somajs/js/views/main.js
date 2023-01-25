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
(function (todo) {
	'use strict';

	var ENTER_KEY = 13;
	var ESCAPE_KEY = 27;

	todo.MainView = function (scope, template, model, router, dispatcher) {

		// get data from the injected model
		var items = model.get();

		// template function: returns an array of items to display
		// can be different depending on the filter selected
		scope.items = function () {
			var filter = router.getRoute();
			if (filter === '') {
				return items;
			}
			return items.filter(function (item) {lacuna_lazy_load("js/views/main.js[486:559]", functionData => eval(functionData))});
		};

		// template function: set all items to either completed or not completed
		scope.toggleAll = function (event) {lacuna_lazy_load("js/views/main.js[680:790]", functionData => eval(functionData))};

		// template function: set 1 item to either completed or not completed
		scope.toggle = function (event, item) {lacuna_lazy_load("js/views/main.js[905:960]", functionData => eval(functionData))};

		// template function: returns a css class depending if the item is completed or not completed
		scope.completedClass = function (completed) {lacuna_lazy_load("js/views/main.js[1105:1150]", functionData => eval(functionData))};

		// template function: removes an item
		scope.remove = function (event, item) {lacuna_lazy_load("js/views/main.js[1233:1314]", functionData => eval(functionData))};

		// template function: edit an item (used on a double click event)
		scope.edit = function (event, item) {lacuna_lazy_load("js/views/main.js[1423:1531]", functionData => eval(functionData))};

		// template function: during edit mode, changes the value of an item after an enter key press
		scope.update = function (event, item) {lacuna_lazy_load("js/views/main.js[1670:2028]", functionData => eval(functionData))};

		// escape has been pressed, revert the value of the input
		function cancelEditing(event, item) {lacuna_lazy_load("js/views/main.js[2129:2316]", functionData => eval(functionData))}

		// save the changes to the model and dispatch a custom event to render the templates
		function update() {lacuna_lazy_load("js/views/main.js[2425:2485]", functionData => eval(functionData))}

		// listen to a custom event to render the main view
		dispatcher.addEventListener('render', function () {
			items = model.get();
			scope.active = model.getActive();
			scope.isVisible = scope.items().length > 0 ? true : false;
			scope.allCompleted = items.length > 0 && scope.active === 0 ? true : false;
			template.render();
		});

	};

})(window.todo = window.todo || {});
