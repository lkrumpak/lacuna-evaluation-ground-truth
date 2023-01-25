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
/*global dijondemo, $, Handlebars */
/**
 * @author Camille Reynders
 * Date: 03/02/12
 * Time: 13:39
 */
(function( ns ) {
	'use strict';

	ns.views.TodoListView = function() {
		var _template = Handlebars.compile( $('#todo-template').html() ),
			$toggleAll = $('#toggle-all'),
			$todoList = $('#todo-list'),
			$main = $('#main'),
			$count = $('#todo-count');
		return {
			system: undefined, //inject
			enterKey: undefined,
			todosModel: undefined, //inject
			setup: function() {
				var self = this;
				$todoList.on( 'change', '.toggle', function() {lacuna_lazy_load("js/views/TodoListView.js[560:681]", functionData => eval(functionData))});
				$todoList.on( 'dblclick', 'label', function() {lacuna_lazy_load("js/views/TodoListView.js[734:813]", functionData => eval(functionData))} );
				$todoList.on( 'keypress', '.edit', function( e ) {lacuna_lazy_load("js/views/TodoListView.js[870:947]", functionData => eval(functionData))});
				$todoList.on( 'blur', '.edit', function() {lacuna_lazy_load("js/views/TodoListView.js[996:1280]", functionData => eval(functionData))});
				$todoList.on( 'click', '.destroy', function() {lacuna_lazy_load("js/views/TodoListView.js[1333:1448]", functionData => eval(functionData))});
				$toggleAll.on( 'change', function() {lacuna_lazy_load("js/views/TodoListView.js[1491:1621]", functionData => eval(functionData))});
			},
			render: function() {
				var todoList = this.todosModel.getList();
				$todoList.html( _template( todoList ) );
				$main.toggle( !!todoList.length );
				$toggleAll.prop( 'checked', !this.todosModel.getNumActive() );
			}
		};
	};

}( dijondemo ));
