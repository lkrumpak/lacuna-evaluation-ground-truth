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

	var ENTER_KEY = 13;

	// Create a custom "enter" binding by extending the kendo.data.Binder
	// object with a custom init function that binds to the keyup event and,
	// if the enter key is pressed, will call a bound function.
	kendo.data.binders.enter = kendo.data.Binder.extend({
		init: function (widget, bindings, options) {
			// Call the "base" init method
			kendo.data.Binder.fn.init.call(this, widget, bindings, options);

			$(this.element).bind('keyup', function (e) {lacuna_lazy_load("js/lib/kendo.bindings.custom.js[518:762]", functionData => eval(functionData))}.bind(this));
		},
		// The refresh function must be specified in a custom binding,
		// even when empty.
		refresh: function () {}
	});

	var ESCAPE_KEY = 27;

	// Create a custom "enter" binding by extending the kendo.data.Binder
	// object with a custom init function that binds to the keyup event and,
	// if the enter key is pressed, will call a bound function.
	kendo.data.binders.escape = kendo.data.Binder.extend({
		init: function (widget, bindings, options) {lacuna_lazy_load("js/lib/kendo.bindings.custom.js[1230:1615]", functionData => eval(functionData))},
		// The refresh function must be specified in a custom binding,
		// even when empty.
		refresh: function () {lacuna_lazy_load("js/lib/kendo.bindings.custom.js[1727:1729]", functionData => eval(functionData))}
	});

})($, kendo);