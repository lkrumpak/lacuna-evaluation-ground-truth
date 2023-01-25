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
(function ($, kendo) {
	'use strict';

	var itemBase, separator, idField;

	kendo.data.extensions = kendo.data.extensions || {};

	// Function to create a quasi-unique GUID for localStorage
	var getGuid = function () {lacuna_lazy_load("js/lib/kendo.data.localstoragedatasource.js[217:395]", functionData => eval(functionData))};

	// Obtains the list of keys from localStorage
	var getKeys = function () {
		var keysList = localStorage.getItem(itemBase);
		return keysList ? keysList.split(',') : [];
	};

	// Checks the localStorage key list for the current id and,
	// if it doesn't exist, adds that key to the list and saves
	// the list back to localStorage.
	var addKeyIfNew = function (id) {lacuna_lazy_load("js/lib/kendo.data.localstoragedatasource.js[764:965]", functionData => eval(functionData))};

	// Fetches an array of objects from localStorage
	var getFromLocalStorage = function () {
		var keys = getKeys(),
			todos = [];

		$.each(keys, function (index, value) {lacuna_lazy_load("js/lib/kendo.data.localstoragedatasource.js[1138:1264]", functionData => eval(functionData))});

		return todos;
	};

	// Saves the current item to localStorage
	var saveToLocalStorage = function (data) {lacuna_lazy_load("js/lib/kendo.data.localstoragedatasource.js[1374:1551]", functionData => eval(functionData))};

	// Removes the current item from localStorage
	var removeFromLocalStorage = function (data) {lacuna_lazy_load("js/lib/kendo.data.localstoragedatasource.js[1647:1888]", functionData => eval(functionData))};

	// Specify a CRUD transport object for our custom Kendo DataSource
	var localTransports = {
		read: function (options) {
			var todos = getFromLocalStorage();

			options.success(todos);
		},
		create: function (options) {lacuna_lazy_load("js/lib/kendo.data.localstoragedatasource.js[2113:2190]", functionData => eval(functionData))},
		update: function (options) {lacuna_lazy_load("js/lib/kendo.data.localstoragedatasource.js[2221:2298]", functionData => eval(functionData))},
		destroy: function (options) {lacuna_lazy_load("js/lib/kendo.data.localstoragedatasource.js[2330:2411]", functionData => eval(functionData))}
	};

	// Create the custom DataSource by extending a kendo.data.DataSource
	// and specify an init method that wires up needed functionality.
	kendo.data.extensions.LocalStorageDataSource = kendo.data.DataSource.extend({
		init: function (options) {
			// DataSource consumers can specify custom itemBase and separator
			// strings when initializing the DataSource. These values are
			// used when saving records to localStorage.
			itemBase = options.itemBase || 'kendo-ds';
			separator = options.separator || '-';
			idField = options.schema.model.idField;

			// The idField is required. If not specified on the model, throw an error
			if (!idField) {
				throw new Error('An id field is required in order to work with localStorage. Please specify an id on your Model.');
			}

			// Call the "base" DataSource init function and provide our custom transport object
			kendo.data.DataSource.fn.init.call(this, $.extend(true, {}, { transport: localTransports }, options));
		}
	});
})($, kendo);
