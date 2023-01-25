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

	todo.FooterView = function (scope, template, model, router, dispatcher) {

		// get data from the injected model
		var items = model.get();

		// template function: returns a css class for the current filter (all/active/completed)
		scope.highlightFilter = function (filter) {
			var route = router.getRoute();
			return route === filter ? 'selected' : '';
		};

		// template function: returns the number of completed items
		scope.clearCompleted = function () {lacuna_lazy_load("js/views/footer.js[499:594]", functionData => eval(functionData))};

		// save the changes to the model and dispatch a custom event to render the templates
		function update() {lacuna_lazy_load("js/views/footer.js[704:764]", functionData => eval(functionData))}

		// listen to a custom event to render the footer view
		dispatcher.addEventListener('render', function () {
			items = model.get();
			scope.active = model.getActive();
			scope.completed = items.length - scope.active;
			scope.itemLabel = scope.active === 1 ? 'item' : 'items';
			scope.footerVisible = items.length > 0 ? true : false;
			scope.clearCompletedVisible = scope.completed > 0 ? true : false;
			template.render();
		});

	};

})(window.todo = window.todo || {});
