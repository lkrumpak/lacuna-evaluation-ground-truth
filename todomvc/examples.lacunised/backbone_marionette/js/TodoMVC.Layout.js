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
/*global TodoMVC:true, Backbone */

var TodoMVC = TodoMVC || {};

(function () {
	'use strict';

	var filterChannel = Backbone.Radio.channel('filter');

	TodoMVC.RootLayout = Mn.View.extend({

		el: '#todoapp',

		regions: {
			header: '#header',
			main: '#main',
			footer: '#footer'
		}
	});

	// Layout Header View
	// ------------------
	TodoMVC.HeaderLayout = Mn.View.extend({

		template: '#template-header',

		// UI bindings create cached attributes that
		// point to jQuery selected objects
		ui: {
			input: '#new-todo'
		},

		events: {
			'keypress @ui.input': 'onInputKeypress',
			'keyup @ui.input': 'onInputKeyup'
		},

		// According to the spec
		// If escape is pressed during the edit, the edit state should be left and any changes be discarded.
		onInputKeyup: function (e) {lacuna_lazy_load("js/TodoMVC.Layout.js[796:877]", functionData => eval(functionData))},

		onInputKeypress: function (e) {lacuna_lazy_load("js/TodoMVC.Layout.js[912:1121]", functionData => eval(functionData))}
	});

	// Layout Footer View
	// ------------------
	TodoMVC.FooterLayout = Mn.View.extend({
		template: '#template-footer',

		// UI bindings create cached attributes that
		// point to jQuery selected objects
		ui: {
			filters: '#filters a',
			completed: '.completed a',
			active: '.active a',
			all: '.all a',
			summary: '#todo-count',
			clear: '#clear-completed'
		},

		events: {
			'click @ui.clear': 'onClearClick'
		},

		collectionEvents: {
			all: 'render'
		},

		templateContext: {
			activeCountLabel: function () {
				return (this.activeCount === 1 ? 'item' : 'items') + ' left';
			}
		},

		initialize: function () {
			this.listenTo(filterChannel.request('filterState'), 'change:filter', this.updateFilterSelection, this);
		},

		serializeData: function () {
			var active = this.collection.getActive().length;
			var total = this.collection.length;

			return {
				activeCount: active,
				totalCount: total,
				completedCount: total - active
			};
		},

		onRender: function () {
			this.$el.parent().toggle(this.collection.length > 0);
			this.updateFilterSelection();
		},

		updateFilterSelection: function () {
			this.ui.filters.removeClass('selected');
			this.ui[filterChannel.request('filterState').get('filter')]
			.addClass('selected');
		},

		onClearClick: function () {lacuna_lazy_load("js/TodoMVC.Layout.js[2433:2555]", functionData => eval(functionData))}
	});
})();
