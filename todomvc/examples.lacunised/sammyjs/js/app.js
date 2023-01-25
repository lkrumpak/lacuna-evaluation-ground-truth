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
/*global Sammy, jQuery, TodoApp */

(function (window, $) {
	'use strict';

	window.TodoApp = Sammy('#todoapp').use('Template');

	TodoApp.notFound = function () {lacuna_lazy_load("js/app.js[162:196]", functionData => eval(functionData))};

	$(function () {
		TodoApp.run('#/');
	});
})(window, jQuery);
