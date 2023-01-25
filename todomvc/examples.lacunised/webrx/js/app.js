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
/*global wx, Rx */
(function () {
	'use strict';

	var localStorageKey = 'todos-webrx';
	var displayModeAll = 'all';
	var displayModeActive = 'active';
	var displayModeCompleted = 'completed';

	// represent a single todo item
	function Todo(title, completed) {lacuna_lazy_load("js/app.js[260:379]", functionData => eval(functionData))}

	// our main view model
	var ViewModel = function (todos) {
		// map array of passed in todos to an observableArray of Todo objects
		this.todos = wx.list(todos.map(function (todo) {lacuna_lazy_load("js/app.js[562:615]", functionData => eval(functionData))}));

		// we want to get notified of changes to any of the todos contained in the list
		// not just of structural changes to the list (via "listChanged" obserable).
		// Those changes are then exposed using the list's "itemChanged" obseravable
		this.todos.changeTrackingEnabled = true;

		this.current = wx.property();
		this.showMode = wx.property('all');

		// create a live-filtered projection of the todos collection that will update
		// when its source (this.todos) or any of its items changes or when when "showMode" changes
		this.filteredTodos = this.todos.project(function (todo) {lacuna_lazy_load("js/app.js[1207:1398]", functionData => eval(functionData))}.bind(this), this.showMode.changed);

		// add a new entry, when enter key is pressed
		this.addCmd = wx.command(function () {lacuna_lazy_load("js/app.js[1523:1654]", functionData => eval(functionData))}, this);

		// remove a single entry
		this.removeCmd = wx.command(function (todo) {lacuna_lazy_load("js/app.js[1737:1770]", functionData => eval(functionData))}, this);

		// mark all todos complete/incomplete
		this.completeAllCmd = wx.command(function () {lacuna_lazy_load("js/app.js[1867:1968]", functionData => eval(functionData))}, this);

		// remove all completed entries
		this.removeCompletedCmd = wx.command(function () {lacuna_lazy_load("js/app.js[2063:2210]", functionData => eval(functionData))}, this);

		// edit an item
		this.editItemCmd = wx.command(function (item) {lacuna_lazy_load("js/app.js[2286:2352]", functionData => eval(functionData))}, this);

		// cancel editing an item and revert to the previous content
		this.cancelEditingCmd = wx.command(function (item) {lacuna_lazy_load("js/app.js[2478:2542]", functionData => eval(functionData))}, this);

		// stop editing an item, remove the item, if it is now empty
		this.saveEditingCmd = wx.command(function (item) {lacuna_lazy_load("js/app.js[2666:2888]", functionData => eval(functionData))}, this);

		this.countCompleted = function () {
			return this.todos.filter(function (todo) {lacuna_lazy_load("js/app.js[2980:3015]", functionData => eval(functionData))}).length;
		};

		// create an observable output-property representing all completed todos
		this.completedCount = Rx.Observable.merge(this.todos.listChanged, this.todos.itemChanged)
			.select(this.countCompleted, this)
			.toProperty(this.countCompleted());

		this.countRemaining = function () {
			return this.todos.length() - this.completedCount();
		};

		// create an observable output-property representing all todos that are not complete
		this.remainingCount = Rx.Observable.merge(this.todos.listChanged, this.todos.itemChanged)
			.select(this.countRemaining, this)
			.toProperty(this.countRemaining());

		// setup routing
		var self = this;

		wx.router.state({
			name: '$',
			url: '/examples/webrx/',
			onEnter: function () {
				self.showMode(displayModeAll);
			}
		}).state({
			name: 'active',
			onEnter: function () {lacuna_lazy_load("js/app.js[3855:3899]", functionData => eval(functionData))}
		}).state({
			name: 'completed',
			onEnter: function () {lacuna_lazy_load("js/app.js[3959:4006]", functionData => eval(functionData))}
		});

		// reload root state ($)
		wx.router.reload();

		// persistence
		Rx.Observable.merge(this.todos.listChanged, this.todos.itemChanged)
			.throttle(500)
			.subscribeOnNext(function () {lacuna_lazy_load("js/app.js[4201:4364]", functionData => eval(functionData))}, this);
	};

	// check local storage for todos
	var todos = JSON.parse(localStorage.getItem(localStorageKey));

	// bind a new instance of our view model to the page
	var viewModel = new ViewModel(todos || []);
	wx.applyBindings(viewModel);
}());
