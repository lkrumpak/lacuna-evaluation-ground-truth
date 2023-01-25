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
/*global Router:false */
(function (todo, Router) {

	'use strict';

	todo.Router = function (dispatcher) {

		// create the router (director.js)
		var router = new Router().init().configure({
			notfound: render
		});

		// dispatch a custom event to render the template on a route change
		router.on(/.*/, render);

		function render() {lacuna_lazy_load("js/models/router.js[338:377]", functionData => eval(functionData))}

		return {
			getRoute: function () {
				return router.getRoute()[0];
			}
		};
	};

})(window.todo = window.todo || {}, Router);
