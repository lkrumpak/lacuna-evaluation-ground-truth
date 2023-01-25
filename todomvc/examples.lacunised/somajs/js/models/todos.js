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

	todo.Model = function () {

		var storeKey = 'todos-somajs';

		return {
			get: function () {
				// get the data from the local storage
				return JSON.parse(localStorage.getItem(storeKey) || '[]');
			},
			set: function (items) {lacuna_lazy_load("js/models/todos.js[269:375]", functionData => eval(functionData))},
			getActive: function () {
				// returns items that are not completed
				return this.get().filter(function (item) {lacuna_lazy_load("js/models/todos.js[494:530]", functionData => eval(functionData))}).length;
			}
		};
	};

})(window.todo = window.todo || {});
