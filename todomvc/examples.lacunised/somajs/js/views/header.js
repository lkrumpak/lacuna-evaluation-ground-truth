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

	todo.HeaderView = function (scope, template, model, dispatcher) {

		// get data from the injected model
		var items = model.get();

		// template function: add a new item on an enter key press
		scope.add = function (event) {lacuna_lazy_load("js/views/header.js[284:511]", functionData => eval(functionData))};

		// template function: remove text from the input (used on blur event)
		scope.clear = function (event) {lacuna_lazy_load("js/views/header.js[619:659]", functionData => eval(functionData))};

		// save the changes to the model and dispatch a custom event to render the templates
		function update() {lacuna_lazy_load("js/views/header.js[769:829]", functionData => eval(functionData))}

		// listen to a custom event to render the header view
		dispatcher.addEventListener('render', function () {
			items = model.get();
			template.render();
		});

	};

})(window.todo = window.todo || {});
