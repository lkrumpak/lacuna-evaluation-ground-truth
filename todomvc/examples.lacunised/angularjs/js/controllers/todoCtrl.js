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
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('todomvc')
	.controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, store) {
		'use strict';

		var todos = $scope.todos = store.todos;

		$scope.newTodo = '';
		$scope.editedTodo = null;

		$scope.$watch('todos', function () {
			$scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
			$scope.completedCount = todos.length - $scope.remainingCount;
			$scope.allChecked = !$scope.remainingCount;
		}, true);

		// Monitor the current route for changes and adjust the filter accordingly.
		$scope.$on('$routeChangeSuccess', function () {
			var status = $scope.status = $routeParams.status || '';
			$scope.statusFilter = (status === 'active') ?
				{ completed: false } : (status === 'completed') ?
				{ completed: true } : {};
		});

		$scope.addTodo = function () {lacuna_lazy_load("js/controllers/todoCtrl.js[1039:1345]", functionData => eval(functionData))};

		$scope.editTodo = function (todo) {lacuna_lazy_load("js/controllers/todoCtrl.js[1384:1524]", functionData => eval(functionData))};

		$scope.saveEdits = function (todo, event) {lacuna_lazy_load("js/controllers/todoCtrl.js[1571:2330]", functionData => eval(functionData))};

		$scope.revertEdits = function (todo) {lacuna_lazy_load("js/controllers/todoCtrl.js[2372:2517]", functionData => eval(functionData))};

		$scope.removeTodo = function (todo) {lacuna_lazy_load("js/controllers/todoCtrl.js[2558:2586]", functionData => eval(functionData))};

		$scope.saveTodo = function (todo) {lacuna_lazy_load("js/controllers/todoCtrl.js[2625:2650]", functionData => eval(functionData))};

		$scope.toggleCompleted = function (todo, completed) {lacuna_lazy_load("js/controllers/todoCtrl.js[2707:2927]", functionData => eval(functionData))};

		$scope.clearCompletedTodos = function () {lacuna_lazy_load("js/controllers/todoCtrl.js[2973:3005]", functionData => eval(functionData))};

		$scope.markAll = function (completed) {lacuna_lazy_load("js/controllers/todoCtrl.js[3048:3187]", functionData => eval(functionData))};
	});
