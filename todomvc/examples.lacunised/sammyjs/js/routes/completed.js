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
/*global TodoApp */

(function () {
	'use strict';

	TodoApp.route('get', '#/completed', function () {lacuna_lazy_load("js/routes/completed.js[101:151]", functionData => eval(functionData))});
})();
