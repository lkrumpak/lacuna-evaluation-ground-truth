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
/*global TodoMVC: true, Backbone */

var TodoMVC = TodoMVC || {};

(function () {
	'use strict';

	var filterChannel = Backbone.Radio.channel('filter');

	// Todo List Item View
	// -------------------
	//
	// Display an individual todo item, and respond to changes
	// that are made to the item, including marking completed.
	TodoMVC.TodoView = Mn.View.extend({

		tagName: 'li',

		template: '#template-todoItemView',

		className: function () {lacuna_lazy_load("js/TodoMVC.TodoList.Views.js[446:515]", functionData => eval(functionData))},

		ui: {
			edit: '.edit',
			destroy: '.destroy',
			label: 'label',
			toggle: '.toggle'
		},

		events: {
			'click @ui.destroy': 'deleteModel',
			'dblclick @ui.label': 'onEditClick',
			'keydown @ui.edit': 'onEditKeypress',
			'focusout @ui.edit': 'onEditFocusout',
			'click @ui.toggle': 'toggle'
		},

		modelEvents: {
			change: 'render'
		},

		deleteModel: function () {lacuna_lazy_load("js/TodoMVC.TodoList.Views.js[896:926]", functionData => eval(functionData))},

		toggle: function () {lacuna_lazy_load("js/TodoMVC.TodoList.Views.js[951:987]", functionData => eval(functionData))},

		onEditClick: function () {lacuna_lazy_load("js/TodoMVC.TodoList.Views.js[1017:1121]", functionData => eval(functionData))},

		onEditFocusout: function () {lacuna_lazy_load("js/TodoMVC.TodoList.Views.js[1154:1343]", functionData => eval(functionData))},

		onEditKeypress: function (e) {lacuna_lazy_load("js/TodoMVC.TodoList.Views.js[1377:1623]", functionData => eval(functionData))}
	});

	// Item List View Body
	// --------------
	//
	// Controls the rendering of the list of items, including the
	// filtering of items for display.
	TodoMVC.ListViewBody = Mn.CollectionView.extend({
		tagName: 'ul',

		id: 'todo-list',

		childView: TodoMVC.TodoView,

		filter: function (child) {lacuna_lazy_load("js/TodoMVC.TodoList.Views.js[1924:2044]", functionData => eval(functionData))}
	});

	// Item List View
	// --------------
	//
	// Manages List View
	TodoMVC.ListView = Mn.View.extend({

		template: '#template-todoListView',

		regions: {
			listBody: {
				el: 'ul',
				replaceElement: true
			}
		},

		ui: {
			toggle: '#toggle-all'
		},

		events: {
			'click @ui.toggle': 'onToggleAllClick'
		},

		collectionEvents: {
			'change:completed': 'render',
			all: 'setCheckAllState'
		},

		initialize: function () {
			this.listenTo(filterChannel.request('filterState'), 'change:filter', this.render, this);
		},

		setCheckAllState: function () {
			function reduceCompleted(left, right) {lacuna_lazy_load("js/TodoMVC.TodoList.Views.js[2658:2707]", functionData => eval(functionData))}

			var allCompleted = this.collection.reduce(reduceCompleted, true);
			this.ui.toggle.prop('checked', allCompleted);
			this.$el.parent().toggle(!!this.collection.length);
		},

		onToggleAllClick: function (e) {lacuna_lazy_load("js/TodoMVC.TodoList.Views.js[2921:3061]", functionData => eval(functionData))},

		onRender: function () {
			this.showChildView('listBody', new TodoMVC.ListViewBody({
				collection: this.collection
			}));
		}
	});
})();
