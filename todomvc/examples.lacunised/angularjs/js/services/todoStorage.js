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
/*global angular */

/**
 * Services that persists and retrieves todos from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */
angular.module('todomvc')
	.factory('todoStorage', function ($http, $injector) {
		'use strict';

		// Detect if an API backend is present. If so, return the API module, else
		// hand off the localStorage adapter
		return $http.get('/api')
			.then(function () {lacuna_lazy_load("js/services/todoStorage.js[478:517]", functionData => eval(functionData))}, function () {
				return $injector.get('localStorage');
			});
	})

	.factory('api', function ($resource) {lacuna_lazy_load("js/services/todoStorage.js[625:1955]", functionData => eval(functionData))})

	.factory('localStorage', function ($q) {
		'use strict';

		var STORAGE_ID = 'todos-angularjs';

		var store = {
			todos: [],

			_getFromLocalStorage: function () {
				return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
			},

			_saveToLocalStorage: function (todos) {lacuna_lazy_load("js/services/todoStorage.js[2239:2306]", functionData => eval(functionData))},

			clearCompleted: function () {lacuna_lazy_load("js/services/todoStorage.js[2340:2637]", functionData => eval(functionData))},

			delete: function (todo) {lacuna_lazy_load("js/services/todoStorage.js[2667:2869]", functionData => eval(functionData))},

			get: function () {
				var deferred = $q.defer();

				angular.copy(store._getFromLocalStorage(), store.todos);
				deferred.resolve(store.todos);

				return deferred.promise;
			},

			insert: function (todo) {lacuna_lazy_load("js/services/todoStorage.js[3086:3262]", functionData => eval(functionData))},

			put: function (todo, index) {lacuna_lazy_load("js/services/todoStorage.js[3296:3475]", functionData => eval(functionData))}
		};

		return store;
	});
