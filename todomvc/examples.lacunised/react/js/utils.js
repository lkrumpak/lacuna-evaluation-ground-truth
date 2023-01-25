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
var app = app || {};

(function () {
	'use strict';

	app.Utils = {
		uuid: function () {lacuna_lazy_load("js/utils.js[88:415]", functionData => eval(functionData))},

		pluralize: function (count, word) {lacuna_lazy_load("js/utils.js[454:502]", functionData => eval(functionData))},

		store: function (namespace, data) {lacuna_lazy_load("js/utils.js[541:727]", functionData => eval(functionData))},

		extend: function () {lacuna_lazy_load("js/utils.js[752:982]", functionData => eval(functionData))}
	};
})();
