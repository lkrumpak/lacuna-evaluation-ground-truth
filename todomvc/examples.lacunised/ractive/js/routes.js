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
/*global window, Router, todoList */
(function (window, Router, todoList) {
	'use strict';

	// We're using https://github.com/flatiron/director for routing

	var router = new Router({
		'/active': function () {lacuna_lazy_load("js/routes.js[210:259]", functionData => eval(functionData))},
		'/completed': function () {lacuna_lazy_load("js/routes.js[289:341]", functionData => eval(functionData))}
	});

	router.configure({
		notfound: function () {lacuna_lazy_load("js/routes.js[392:468]", functionData => eval(functionData))}
	});

	router.init();

})(window, Router, todoList);
