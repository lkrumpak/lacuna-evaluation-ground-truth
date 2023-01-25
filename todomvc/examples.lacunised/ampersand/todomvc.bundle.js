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
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var MainView = require('./views/main');
var Me = require('./models/me');
var Router = require('./router');


window.app = {
	init: function () {
		// Model representing state for
		// user using the app. Calling it
		// 'me' is a bit of convention but
		// it's basically 'app state'.
		this.me = new Me();
		// Our main view
		this.view = new MainView({
			el: document.body,
			model: this.me
		});
		// Create and fire up the router
		this.router = new Router();
		this.router.history.start();
	}
};

window.app.init();

},{"./models/me":2,"./router":5,"./views/main":7}],2:[function(require,module,exports){
// typically we us a 'me' model to represent state for the
// user of the app. So in an app where you have a logged in
// user this is where we'd store username, etc.
// We also use it to store session properties, which is the
// non-persisted state that we use to track application
// state for this user in this session.
'use strict';

var State = require('ampersand-state');
var Todos = require('./todos');


module.exports = State.extend({
	initialize: function () {
		// Listen to changes to the todos collection that will
		// affect lengths we want to calculate.
		this.listenTo(this.todos, 'change:completed add remove', this.handleTodosUpdate);
		// We also want to calculate these values once on init
		this.handleTodosUpdate();
		// Listen for changes to `mode` so we can update
		// the collection mode.
		this.listenTo(this, 'change:mode', this.handleModeChange);
	},
	collections: {
		todos: Todos
	},
	// We used only session properties here because there's
	// no API or persistance layer for these in this app.
	session: {
		activeCount: {
			type: 'number',
			default: 0
		},
		completedCount: {
			type: 'number',
			default: 0
		},
		totalCount:{
			type: 'number',
			default: 0
		},
		allCompleted: {
			type: 'boolean',
			default: false
		},
		mode: {
			type: 'string',
			values: [
				'all',
				'completed',
				'active'
			],
			default: 'all'
		}
	},
	derived: {
		// We produce this as an HTML snippet here
		// for convenience since it also has to be
		// pluralized it was easier this way.
		itemsLeftHtml: {
			deps: ['activeCount'],
			fn: function () {
				var plural = (this.activeCount === 1) ? '' : 's';
				return '<strong>' + this.activeCount + '</strong> item' + plural + ' left';
			}
		}
	},
	// Calculate and set various lengths we're
	// tracking. We set them as session properties
	// so they're easy to listen to and bind to DOM
	// where needed.
	handleTodosUpdate: function () {
		var total = this.todos.length;
		// use a method we defined on the collection itself
		// to count how many todos are completed
		var completed = this.todos.getCompletedCount();
		// We use `set` here in order to update multiple attributes at once
		// It's possible to set directely using `this.completedCount = completed` ...
		this.set({
			completedCount: completed,
			activeCount: total - completed,
			totalCount: total,
			allCompleted: total === completed
		});
	},
	handleModeChange: function () {
		this.todos.setMode(this.mode);
	}
});

},{"./todos":4,"ampersand-state":22}],3:[function(require,module,exports){
'use strict';

// We're using 'ampersand-state' here instead of 'ampersand-model'
// because we don't need any of the RESTful
// methods for this app.
var State = require('ampersand-state');


module.exports = State.extend({
	// Properties this model will store
	props: {
		title: {
			type: 'string',
			default: ''
		},
		completed: {
			type: 'boolean',
			default: false
		}
	},
	// session properties work the same way as `props`
	// but will not be included when serializing.
	session: {
		editing: {
			type: 'boolean',
			default: false
		}
	},
	destroy: function () {lacuna_lazy_load("todomvc.bundle.js[4239:4305]", functionData => eval(functionData))}
});

},{"ampersand-state":22}],4:[function(require,module,exports){
'use strict';

var Collection = require('ampersand-collection');
var SubCollection = require('ampersand-subcollection');
var debounce = require('debounce');
var Todo = require('./todo');
var STORAGE_KEY = 'todos-ampersand';


module.exports = Collection.extend({
	model: Todo,
	initialize: function () {
		// Attempt to read from localStorage
		this.readFromLocalStorage();

		// This is what we'll actually render
		// it's a subcollection of the whole todo collection
		// that we'll add/remove filters to accordingly.
		this.subset = new SubCollection(this);

		// We put a slight debounce on this since it could possibly
		// be called in rapid succession.
		this.writeToLocalStorage = debounce(this.writeToLocalStorage, 100);

		// Listen for storage events on the window to keep multiple
		// tabs in sync
		window.addEventListener('storage', this.handleStorageEvent.bind(this));

		// We listen for changes to the collection
		// and persist on change
		this.on('all', this.writeToLocalStorage, this);
	},
	getCompletedCount: function() {
		return this.reduce(function(total, todo){lacuna_lazy_load("todomvc.bundle.js[5462:5511]", functionData => eval(functionData))}, 0);
	},
	// Helper for removing all completed items
	clearCompleted: function () {lacuna_lazy_load("todomvc.bundle.js[5594:5702]", functionData => eval(functionData))},
	// Updates the collection to the appropriate mode.
	// mode can 'all', 'completed', or 'active'
	setMode: function (mode) {
		if (mode === 'all') {
			this.subset.clearFilters();
		} else {
			this.subset.configure({
				where: {
					completed: mode === 'completed'
				}
			}, true);
		}
	},
	// The following two methods are all we need in order
	// to add persistance to localStorage
	writeToLocalStorage: function () {lacuna_lazy_load("todomvc.bundle.js[6127:6183]", functionData => eval(functionData))},
	readFromLocalStorage: function () {
		var existingData = localStorage[STORAGE_KEY];
		if (existingData) {
			this.set(JSON.parse(existingData));
		}
	},
	// Handles events from localStorage. Browsers will fire
	// this event in other tabs on the same domain.
	handleStorageEvent: function (e) {lacuna_lazy_load("todomvc.bundle.js[6479:6550]", functionData => eval(functionData))}
});

},{"./todo":3,"ampersand-collection":9,"ampersand-subcollection":28,"debounce":53}],5:[function(require,module,exports){
'use strict';
/*global app */

var Router = require('ampersand-router');


module.exports = Router.extend({
	routes: {
		'*filter': 'setFilter'
	},
	setFilter: function (arg) {
		app.me.mode = arg || 'all';
	}
});

},{"ampersand-router":16}],6:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {lacuna_lazy_load("todomvc.bundle.js[7036:7370]", functionData => eval(functionData))};
},{"jade/runtime":55}],7:[function(require,module,exports){
'use strict';
/*global app */

var View = require('ampersand-view');
var TodoView = require('./todo');
var ENTER_KEY = 13;


module.exports = View.extend({
	events: {
		'keypress [data-hook~=todo-input]': 'handleMainInput',
		'click [data-hook~=mark-all]': 'handleMarkAllClick',
		'click [data-hook~=clear-completed]': 'handleClearClick'
	},
	// Declaratively bind all our data to the template.
	// This means only changed data in the DOM is updated
	// with this approach we *only* ever touch the DOM with
	// appropriate dom methods. Not just `innerHTML` which
	// makes it about as fast as possible.
	// These get re-applied if the view's element is replaced
	// or if the model isn't there yet, etc.
	// Binding type reference:
	// http://ampersandjs.com/docs#ampersand-dom-bindings-binding-types
	bindings: {
		// Show hide main and footer
		// based on truthiness of totalCount
		'model.totalCount': {
			type: 'toggle',
			selector: '#main, #footer'
		},
		'model.completedCount': [
			// Hides when there are none
			{
				type: 'toggle',
				hook: 'clear-completed'
			},
			// Inserts completed count
			{
				type: 'text',
				hook: 'completed-count'
			}
		],
		// Inserts HTML from model that also
		// does pluralizing.
		'model.itemsLeftHtml': {
			type: 'innerHTML',
			hook: 'todo-count'
		},
		// Add 'selected' to right
		// element
		'model.mode': {
			type: 'switchClass',
			name: 'selected',
			cases: {
				'all': '[data-hook=all-mode]',
				'active': '[data-hook=active-mode]',
				'completed': '[data-hook=completed-mode]',
			}
		},
		// Bind 'checked' state of checkbox
		'model.allCompleted': {
			type: 'booleanAttribute',
			name: 'checked',
			hook: 'mark-all'
		}
	},
	// cache
	initialize: function () {
		this.mainInput = this.queryByHook('todo-input');
		this.renderCollection(app.me.todos.subset, TodoView, this.queryByHook('todo-container'));
	},
	// handles DOM event from main input
	handleMainInput: function (e) {lacuna_lazy_load("todomvc.bundle.js[9386:9538]", functionData => eval(functionData))},
	// Here we set all to state provided.
	handleMarkAllClick: function () {lacuna_lazy_load("todomvc.bundle.js[9612:9735]", functionData => eval(functionData))},
	// Handler for clear click
	handleClearClick: function () {lacuna_lazy_load("todomvc.bundle.js[9796:9833]", functionData => eval(functionData))}
});

},{"./todo":8,"ampersand-view":35}],8:[function(require,module,exports){
'use strict';

var View = require('ampersand-view');
var todoTemplate = require('../templates/todo.jade');
var ENTER_KEY = 13;
var ESC_KEY = 27;


module.exports = View.extend({
	// note that Ampersand is extrememly flexible with templating.
	// This template property can be:
	//   1. A plain HTML string
	//   2. A function that returns an HTML string
	//   3. A function that returns a DOM element
	//
	// Here we're using a jade template. A browserify transform
	// called 'jadeify' lets us require a ".jade" file as if
	// it were a module and it will compile it to a function
	// for us. This function returns HTML as per #2 above.
	template: todoTemplate,
	// Events work like backbone they're all delegated to
	// root element.
	events: {
		'change [data-hook=checkbox]': 'handleCheckboxChange',
		'click [data-hook=action-delete]': 'handleDeleteClick',
		'dblclick [data-hook=title]': 'handleDoubleClick',
		'keyup [data-hook=input]': 'handleKeypress',
		'blur [data-hook=input]': 'handleBlur'
	},
	// Declarative data bindings
	bindings: {
		'model.title': [
			{
				type: 'text',
				hook: 'title'
			},
			{
				type: 'value',
				hook: 'input'
			}
		],
		'model.editing': [
			{
				type: 'toggle',
				yes: '[data-hook=input]',
				no: '[data-hook=view]'
			},
			{
				type: 'booleanClass'
			}
		],
		'model.completed': [
			{
				type: 'booleanAttribute',
				name: 'checked',
				hook: 'checkbox'
			},
			{
				type: 'booleanClass'
			}
		]
	},
	render: function () {lacuna_lazy_load("todomvc.bundle.js[11399:11632]", functionData => eval(functionData))},
	handleCheckboxChange: function (e) {lacuna_lazy_load("todomvc.bundle.js[11670:11717]", functionData => eval(functionData))},
	handleDeleteClick: function () {lacuna_lazy_load("todomvc.bundle.js[11751:11779]", functionData => eval(functionData))},
	// Just put us in edit mode and focus
	handleDoubleClick: function () {lacuna_lazy_load("todomvc.bundle.js[11852:11907]", functionData => eval(functionData))},
	handleKeypress: function (e) {lacuna_lazy_load("todomvc.bundle.js[11939:12098]", functionData => eval(functionData))},
	// Since we always blur even in the other
	// scenarios we use this as a 'save' point.
	handleBlur: function () {lacuna_lazy_load("todomvc.bundle.js[12213:12369]", functionData => eval(functionData))}
});

},{"../templates/todo.jade":6,"ampersand-view":35}],9:[function(require,module,exports){
var BackboneEvents = require('backbone-events-standalone');
var classExtend = require('ampersand-class-extend');
var isArray = require('is-array');
var extend = require('extend-object');
var slice = [].slice;


function Collection(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator) this.comparator = options.comparator;
    if (options.parent) this.parent = options.parent;
    if (!this.mainIndex) {
        var idAttribute = this.model && this.model.prototype && this.model.prototype.idAttribute;
        this.mainIndex = idAttribute || 'id';
    }
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, extend({silent: true}, options));
}

extend(Collection.prototype, BackboneEvents, {
    initialize: function () {lacuna_lazy_load("todomvc.bundle.js[13303:13305]", functionData => eval(functionData))},

    indexes: [],

    isModel: function (model) {lacuna_lazy_load("todomvc.bundle.js[13356:13421]", functionData => eval(functionData))},

    add: function (models, options) {lacuna_lazy_load("todomvc.bundle.js[13460:13559]", functionData => eval(functionData))},

    // overridable parse method
    parse: function (res, options) {lacuna_lazy_load("todomvc.bundle.js[13629:13656]", functionData => eval(functionData))},

    // overridable serialize method
    serialize: function () {lacuna_lazy_load("todomvc.bundle.js[13722:14029]", functionData => eval(functionData))},

    toJSON: function () {lacuna_lazy_load("todomvc.bundle.js[14056:14096]", functionData => eval(functionData))},

    set: function (models, options) {lacuna_lazy_load("todomvc.bundle.js[14135:18668]", functionData => eval(functionData))},

    get: function (query, indexName) {lacuna_lazy_load("todomvc.bundle.js[18708:18900]", functionData => eval(functionData))},

    // Get the model at the given index.
    at: function (index) {lacuna_lazy_load("todomvc.bundle.js[18969:19011]", functionData => eval(functionData))},

    remove: function (models, options) {lacuna_lazy_load("todomvc.bundle.js[19053:19915]", functionData => eval(functionData))},

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function (models, options) {lacuna_lazy_load("todomvc.bundle.js[20239:20650]", functionData => eval(functionData))},

    sort: function (options) {lacuna_lazy_load("todomvc.bundle.js[20682:21943]", functionData => eval(functionData))},

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function () {
        var list = this.indexes || [];
        var i = 0;
        list.push(this.mainIndex);
        list.push('cid');
        var l = list.length;
        this.models = [];
        this._indexes = {};
        for (; i < l; i++) {
            this._indexes[list[i]] = {};
        }
    },

    _prepareModel: function (attrs, options) {lacuna_lazy_load("todomvc.bundle.js[22423:22984]", functionData => eval(functionData))},

    _deIndex: function (model) {lacuna_lazy_load("todomvc.bundle.js[23018:23164]", functionData => eval(functionData))},

    _index: function (model) {lacuna_lazy_load("todomvc.bundle.js[23196:23394]", functionData => eval(functionData))},

    // Internal method to create a model's ties to a collection.
    _addReference: function (model, options) {lacuna_lazy_load("todomvc.bundle.js[23507:23663]", functionData => eval(functionData))},

        // Internal method to sever a model's ties to a collection.
    _removeReference: function (model, options) {lacuna_lazy_load("todomvc.bundle.js[23782:23950]", functionData => eval(functionData))},

    _onModelEvent: function (event, model, collection, options) {lacuna_lazy_load("todomvc.bundle.js[24017:24352]", functionData => eval(functionData))}
});

Object.defineProperties(Collection.prototype, {
    length: {
        get: function () {
            return this.models.length;
        }
    },
    isCollection: {
        value: true
    }
});

var arrayMethods = [
    'indexOf',
    'lastIndexOf',
    'every',
    'some',
    'forEach',
    'map',
    'filter',
    'reduce',
    'reduceRight'
];

arrayMethods.forEach(function (method) {
    Collection.prototype[method] = function () {
        return this.models[method].apply(this.models, arguments);
    };
});

// alias each/forEach for maximum compatibility
Collection.prototype.each = Collection.prototype.forEach;

Collection.extend = classExtend;

module.exports = Collection;

},{"ampersand-class-extend":10,"backbone-events-standalone":12,"extend-object":13,"is-array":14}],10:[function(require,module,exports){
var objectExtend = require('extend-object');


/// Following code is largely pasted from Backbone.js

// Helper function to correctly set up the prototype chain, for subclasses.
// Similar to `goog.inherits`, but uses a hash of prototype properties and
// class properties to be extended.
var extend = function(protoProps) {
    var parent = this;
    var child;
    var args = [].slice.call(arguments);

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && protoProps.hasOwnProperty('constructor')) {
        child = protoProps.constructor;
    } else {
        child = function () {
            return parent.apply(this, arguments);
        };
    }

    // Add static properties to the constructor function from parent
    objectExtend(child, parent);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();

    // Mix in all prototype properties to the subclass if supplied.
    if (protoProps) {
        args.unshift(child.prototype);
        objectExtend.apply(null, args);
    }

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
};

// Expose the extend function
module.exports = extend;

},{"extend-object":13}],11:[function(require,module,exports){
/**
 * Standalone extraction of Backbone.Events, no external dependency required.
 * Degrades nicely when Backone/underscore are already available in the current
 * global context.
 *
 * Note that docs suggest to use underscore's `_.extend()` method to add Events
 * support to some given object. A `mixin()` method has been added to the Events
 * prototype to avoid using underscore for that sole purpose:
 *
 *     var myEventEmitter = BackboneEvents.mixin({});
 *
 * Or for a function constructor:
 *
 *     function MyConstructor(){}
 *     MyConstructor.prototype.foo = function(){}
 *     BackboneEvents.mixin(MyConstructor.prototype);
 *
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
 * (c) 2013 Nicolas Perriault
 */
/* global exports:true, define, module */
(function() {
  var root = this,
      breaker = {},
      nativeForEach = Array.prototype.forEach,
      hasOwnProperty = Object.prototype.hasOwnProperty,
      slice = Array.prototype.slice,
      idCounter = 0;

  // Returns a partial implementation matching the minimal API subset required
  // by Backbone.Events
  function miniscore() {
    return {
      keys: Object.keys,

      uniqueId: function(prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
      },

      has: function(obj, key) {
        return hasOwnProperty.call(obj, key);
      },

      each: function(obj, iterator, context) {
        if (obj == null) return;
        if (nativeForEach && obj.forEach === nativeForEach) {
          obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
          for (var i = 0, l = obj.length; i < l; i++) {
            if (iterator.call(context, obj[i], i, obj) === breaker) return;
          }
        } else {
          for (var key in obj) {
            if (this.has(obj, key)) {
              if (iterator.call(context, obj[key], key, obj) === breaker) return;
            }
          }
        }
      },

      once: function(func) {lacuna_lazy_load("todomvc.bundle.js[28810:29035]", functionData => eval(functionData))}
    };
  }

  var _ = miniscore(), Events;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {lacuna_lazy_load("todomvc.bundle.js[30197:30510]", functionData => eval(functionData))},

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {lacuna_lazy_load("todomvc.bundle.js[30801:31713]", functionData => eval(functionData))},

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {lacuna_lazy_load("todomvc.bundle.js[32575:32978]", functionData => eval(functionData))}

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeners = this._listeners || (this._listeners = {});
      var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
      listeners[id] = obj;
      if (typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Mixin utility
  Events.mixin = function(proto) {lacuna_lazy_load("todomvc.bundle.js[35382:35622]", functionData => eval(functionData))};

  // Export Events as BackboneEvents depending on current context
  if (typeof define === "function") {
    define(function() {lacuna_lazy_load("todomvc.bundle.js[35751:35779]", functionData => eval(functionData))});
  } else if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Events;
    }
    exports.BackboneEvents = Events;
  } else {
    root.BackboneEvents = Events;
  }
})(this);

},{}],12:[function(require,module,exports){
module.exports = require('./backbone-events-standalone');

},{"./backbone-events-standalone":11}],13:[function(require,module,exports){
var arr = [];
var each = arr.forEach;
var slice = arr.slice;


module.exports = function(obj) {
    each.call(slice.call(arguments, 1), function(source) {
        if (source) {
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        }
    });
    return obj;
};

},{}],14:[function(require,module,exports){

/**
 * isArray
 */

var isArray = Array.isArray;

/**
 * toString
 */

var str = Object.prototype.toString;

/**
 * Whether or not the given `val`
 * is an array.
 *
 * example:
 *
 *        isArray([]);
 *        // > true
 *        isArray(arguments);
 *        // > false
 *        isArray('');
 *        // > false
 *
 * @param {mixed} val
 * @return {bool}
 */

module.exports = isArray || function (val) {lacuna_lazy_load("todomvc.bundle.js[36977:37034]", functionData => eval(functionData))};

},{}],15:[function(require,module,exports){
var Events = require('backbone-events-standalone');
var _ = require('underscore');


// Handles cross-browser history management, based on either
// [pushState](http://diveintohtml5.info/history.html) and real URLs, or
// [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
// and URL fragments. If the browser supports neither.
var History = function () {
    this.handlers = [];
    this.checkUrl = _.bind(this.checkUrl, this);

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
        this.location = window.location;
        this.history = window.history;
    }
};

// Cached regex for stripping a leading hash/slash and trailing space.
var routeStripper = /^[#\/]|\s+$/g;

// Cached regex for stripping leading and trailing slashes.
var rootStripper = /^\/+|\/+$/g;

// Cached regex for stripping urls of hash.
var pathStripper = /#.*$/;

// Has the history handling already been started?
History.started = false;

// Set up all inheritable **Backbone.History** properties and methods.
_.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Are we at the app root?
    atRoot: function () {lacuna_lazy_load("todomvc.bundle.js[38372:38507]", functionData => eval(functionData))},

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function (window) {
        var match = (window || this).location.href.match(/#(.*)$/);
        return match ? match[1] : '';
    },

    // Get the pathname and search params, without the root.
    getPath: function () {lacuna_lazy_load("todomvc.bundle.js[38883:39105]", functionData => eval(functionData))},

    // Get the cross-browser normalized URL fragment from the path or hash.
    getFragment: function (fragment) {
        if (fragment == null) {
            if (this._hasPushState || !this._wantsHashChange) {
                fragment = this.getPath();
            } else {
                fragment = this.getHash();
            }
        }
        return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function (options) {
        if (History.started) throw new Error("Backbone.history has already been started");
        History.started = true;

        // Figure out the initial configuration.
        // Is pushState desired ... is it available?
        this.options          = _.extend({root: '/'}, this.options, options);
        this.root             = this.options.root;
        this._wantsHashChange = this.options.hashChange !== false;
        this._hasHashChange   = 'onhashchange' in window;
        this._wantsPushState  = !!this.options.pushState;
        this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
        this.fragment         = this.getFragment();

        // Add a cross-platform `addEventListener` shim for older browsers.
        var addEventListener = window.addEventListener;

        // Normalize root to always include a leading and trailing slash.
        this.root = ('/' + this.root + '/').replace(rootStripper, '/');

        // Depending on whether we're using pushState or hashes, and whether
        // 'onhashchange' is supported, determine how we check the URL state.
        if (this._hasPushState) {
            addEventListener('popstate', this.checkUrl, false);
        } else if (this._wantsHashChange && this._hasHashChange) {
            addEventListener('hashchange', this.checkUrl, false);
        } else if (this._wantsHashChange) {
            this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
        }

        // Transition from hashChange to pushState or vice versa if both are
        // requested.
        if (this._wantsHashChange && this._wantsPushState) {

            // If we've started off with a route from a `pushState`-enabled
            // browser, but we're currently in a browser that doesn't support it...
            if (!this._hasPushState && !this.atRoot()) {
                this.location.replace(this.root + '#' + this.getPath());
                // Return immediately as browser will do redirect to new url
                return true;

            // Or if we've started out with a hash-based route, but we're currently
            // in a browser where it could be `pushState`-based instead...
            } else if (this._hasPushState && this.atRoot()) {
                this.navigate(this.getHash(), {replace: true});
            }
        }

        if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function () {lacuna_lazy_load("todomvc.bundle.js[42256:42874]", functionData => eval(functionData))},

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function (route, callback) {
        this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`.
    checkUrl: function (e) {lacuna_lazy_load("todomvc.bundle.js[43229:43355]", functionData => eval(functionData))},

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function (fragment) {
        fragment = this.fragment = this.getFragment(fragment);
        return this.handlers.some(function (handler) {
            if (handler.route.test(fragment)) {
                handler.callback(fragment);
                return true;
            }
        });
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function (fragment, options) {lacuna_lazy_load("todomvc.bundle.js[44319:45592]", functionData => eval(functionData))},

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function (location, fragment, replace) {lacuna_lazy_load("todomvc.bundle.js[45771:46068]", functionData => eval(functionData))}

});

module.exports = new History();

},{"backbone-events-standalone":20,"underscore":21}],16:[function(require,module,exports){
;window.ampersand = window.ampersand || {};window.ampersand["ampersand-router"] = window.ampersand["ampersand-router"] || [];window.ampersand["ampersand-router"].push("1.0.6");
var classExtend = require('ampersand-class-extend');
var Events = require('backbone-events-standalone');
var ampHistory = require('./ampersand-history');
var _ = require('underscore');


// Routers map faux-URLs to actions, and fire events when routes are
// matched. Creating a new one sets its `routes` hash, if not set statically.
var Router = module.exports = function (options) {
    options || (options = {});
    this.history = options.history || ampHistory;
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
};

// Cached regular expressions for matching named param parts and splatted
// parts of route strings.
var optionalParam = /\((.*?)\)/g;
var namedParam    = /(\(\?)?:\w+/g;
var splatParam    = /\*\w+/g;
var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

// Set up all inheritable **Backbone.Router** properties and methods.
_.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function () {},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function (query, num) {
    //       ...
    //     });
    //
    route: function (route, name, callback) {
        if (!_.isRegExp(route)) route = this._routeToRegExp(route);
        if (_.isFunction(name)) {
            callback = name;
            name = '';
        }
        if (!callback) callback = this[name];
        var router = this;
        this.history.route(route, function (fragment) {
            var args = router._extractParameters(route, fragment);
            if (router.execute(callback, args, name) !== false) {
                router.trigger.apply(router, ['route:' + name].concat(args));
                router.trigger('route', name, args);
                router.history.trigger('route', router, name, args);
            }
        });
        return this;
    },

    // Execute a route handler with the provided parameters.  This is an
    // excellent place to do pre-route setup or post-route cleanup.
    execute: function (callback, args, name) {
        if (callback) callback.apply(this, args);
    },

    // Simple proxy to `ampHistory` to save a fragment into the history.
    navigate: function (fragment, options) {lacuna_lazy_load("todomvc.bundle.js[48749:48827]", functionData => eval(functionData))},

    // Helper for doing `internal` redirects without adding to history
    // and thereby breaking backbutton functionality.
    redirectTo: function (newUrl) {lacuna_lazy_load("todomvc.bundle.js[48989:49059]", functionData => eval(functionData))},

    // Bind all defined routes to `history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function () {
        if (!this.routes) return;
        this.routes = _.result(this, 'routes');
        var route, routes = Object.keys(this.routes);
        while ((route = routes.pop()) != null) {
            this.route(route, this.routes[route]);
        }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function (route) {
        route = route
            .replace(escapeRegExp, '\\$&')
            .replace(optionalParam, '(?:$1)?')
            .replace(namedParam, function (match, optional) {lacuna_lazy_load("todomvc.bundle.js[49883:49952]", functionData => eval(functionData))})
            .replace(splatParam, '([^?]*?)');
        return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function (route, fragment) {
        var params = route.exec(fragment).slice(1);
        return params.map(function (param, i) {
            // Don't decode the search params.
            if (i === params.length - 1) return param || null;
            return param ? decodeURIComponent(param) : null;
        });
    }

});

Router.extend = classExtend;

},{"./ampersand-history":15,"ampersand-class-extend":17,"backbone-events-standalone":20,"underscore":21}],17:[function(require,module,exports){
module.exports=require(10)
},{"extend-object":18}],18:[function(require,module,exports){lacuna_lazy_load("todomvc.bundle.js[50897:50927]", functionData => eval(functionData))},{}],19:[function(require,module,exports){lacuna_lazy_load("todomvc.bundle.js[50968:50998]", functionData => eval(functionData))},{}],20:[function(require,module,exports){
module.exports=require(12)
},{"./backbone-events-standalone":19}],21:[function(require,module,exports){
//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {lacuna_lazy_load("todomvc.bundle.js[52883:53000]", functionData => eval(functionData))};

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.6.0';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return obj;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {lacuna_lazy_load("todomvc.bundle.js[54535:54815]", functionData => eval(functionData))};

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {lacuna_lazy_load("todomvc.bundle.js[55117:55663]", functionData => eval(functionData))};

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {lacuna_lazy_load("todomvc.bundle.js[55874:56626]", functionData => eval(functionData))};

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {lacuna_lazy_load("todomvc.bundle.js[56761:56963]", functionData => eval(functionData))};

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {lacuna_lazy_load("todomvc.bundle.js[57170:57475]", functionData => eval(functionData))};

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {lacuna_lazy_load("todomvc.bundle.js[57584:57721]", functionData => eval(functionData))};

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {lacuna_lazy_load("todomvc.bundle.js[57930:58292]", functionData => eval(functionData))};

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, predicate, context) {lacuna_lazy_load("todomvc.bundle.js[58521:58879]", functionData => eval(functionData))};

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {lacuna_lazy_load("todomvc.bundle.js[59034:59241]", functionData => eval(functionData))};

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {lacuna_lazy_load("todomvc.bundle.js[59348:59548]", functionData => eval(functionData))};

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {lacuna_lazy_load("todomvc.bundle.js[59659:59704]", functionData => eval(functionData))};

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {lacuna_lazy_load("todomvc.bundle.js[59866:59915]", functionData => eval(functionData))};

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {lacuna_lazy_load("todomvc.bundle.js[60081:60128]", functionData => eval(functionData))};

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {lacuna_lazy_load("todomvc.bundle.js[60381:60827]", functionData => eval(functionData))};

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {lacuna_lazy_load("todomvc.bundle.js[60937:61381]", functionData => eval(functionData))};

  // Shuffle an array, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {lacuna_lazy_load("todomvc.bundle.js[61547:61775]", functionData => eval(functionData))};

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {lacuna_lazy_load("todomvc.bundle.js[61996:62192]", functionData => eval(functionData))};

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {lacuna_lazy_load("todomvc.bundle.js[62290:62410]", functionData => eval(functionData))};

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {lacuna_lazy_load("todomvc.bundle.js[62529:63037]", functionData => eval(functionData))};

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iterator, context) {lacuna_lazy_load("todomvc.bundle.js[63187:63431]", functionData => eval(functionData))};
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {lacuna_lazy_load("todomvc.bundle.js[63627:63706]", functionData => eval(functionData))});

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {lacuna_lazy_load("todomvc.bundle.js[63896:63926]", functionData => eval(functionData))});

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {lacuna_lazy_load("todomvc.bundle.js[64138:64201]", functionData => eval(functionData))});

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {lacuna_lazy_load("todomvc.bundle.js[64415:64706]", functionData => eval(functionData))};

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {lacuna_lazy_load("todomvc.bundle.js[64799:64970]", functionData => eval(functionData))};

  // Return the number of elements in an object.
  _.size = function(obj) {lacuna_lazy_load("todomvc.bundle.js[65047:65158]", functionData => eval(functionData))};

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {lacuna_lazy_load("todomvc.bundle.js[65451:65603]", functionData => eval(functionData))};

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {lacuna_lazy_load("todomvc.bundle.js[65890:65975]", functionData => eval(functionData))};

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {lacuna_lazy_load("todomvc.bundle.js[66652:66717]", functionData => eval(functionData))};

  // Trim out all falsy values from an array.
  _.compact = function(array) {lacuna_lazy_load("todomvc.bundle.js[66796:66841]", functionData => eval(functionData))};

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {lacuna_lazy_load("todomvc.bundle.js[66957:67303]", functionData => eval(functionData))};

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {lacuna_lazy_load("todomvc.bundle.js[67424:67469]", functionData => eval(functionData))};

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {lacuna_lazy_load("todomvc.bundle.js[67583:67646]", functionData => eval(functionData))};

  // Split an array into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(array, predicate) {lacuna_lazy_load("todomvc.bundle.js[67843:67994]", functionData => eval(functionData))};

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {lacuna_lazy_load("todomvc.bundle.js[68234:68703]", functionData => eval(functionData))};

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {lacuna_lazy_load("todomvc.bundle.js[68837:68889]", functionData => eval(functionData))};

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {lacuna_lazy_load("todomvc.bundle.js[69020:69221]", functionData => eval(functionData))};

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {lacuna_lazy_load("todomvc.bundle.js[69398:69551]", functionData => eval(functionData))};

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {lacuna_lazy_load("todomvc.bundle.js[69678:69896]", functionData => eval(functionData))};

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {lacuna_lazy_load("todomvc.bundle.js[70126:70392]", functionData => eval(functionData))};

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {lacuna_lazy_load("todomvc.bundle.js[70851:71345]", functionData => eval(functionData))};

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {lacuna_lazy_load("todomvc.bundle.js[71466:71807]", functionData => eval(functionData))};

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {lacuna_lazy_load("todomvc.bundle.js[72062:72396]", functionData => eval(functionData))};

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){lacuna_lazy_load("todomvc.bundle.js[72536:72538]", functionData => eval(functionData))};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {lacuna_lazy_load("todomvc.bundle.js[72994:73340]", functionData => eval(functionData))};
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {lacuna_lazy_load("todomvc.bundle.js[73614:74000]", functionData => eval(functionData))};

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {lacuna_lazy_load("todomvc.bundle.js[74227:74440]", functionData => eval(functionData))};

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {lacuna_lazy_load("todomvc.bundle.js[74539:74765]", functionData => eval(functionData))};

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {lacuna_lazy_load("todomvc.bundle.js[74914:75035]", functionData => eval(functionData))};

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {lacuna_lazy_load("todomvc.bundle.js[75157:75235]", functionData => eval(functionData))};

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {lacuna_lazy_load("todomvc.bundle.js[75670:76503]", functionData => eval(functionData))};

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {lacuna_lazy_load("todomvc.bundle.js[76830:77545]", functionData => eval(functionData))};

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {lacuna_lazy_load("todomvc.bundle.js[77708:77897]", functionData => eval(functionData))};

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {lacuna_lazy_load("todomvc.bundle.js[78124:78166]", functionData => eval(functionData))};

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {lacuna_lazy_load("todomvc.bundle.js[78333:78551]", functionData => eval(functionData))};

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {lacuna_lazy_load("todomvc.bundle.js[78667:78780]", functionData => eval(functionData))};

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {lacuna_lazy_load("todomvc.bundle.js[79228:79423]", functionData => eval(functionData))};

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {lacuna_lazy_load("todomvc.bundle.js[79512:79715]", functionData => eval(functionData))};

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {lacuna_lazy_load("todomvc.bundle.js[80971:81168]", functionData => eval(functionData))};

  // Fill in a given object with default properties.
  _.defaults = function(obj) {lacuna_lazy_load("todomvc.bundle.js[81253:81471]", functionData => eval(functionData))};

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {lacuna_lazy_load("todomvc.bundle.js[81555:81659]", functionData => eval(functionData))};

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {lacuna_lazy_load("todomvc.bundle.js[81911:81954]", functionData => eval(functionData))};

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {lacuna_lazy_load("todomvc.bundle.js[82058:85850]", functionData => eval(functionData))};

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {lacuna_lazy_load("todomvc.bundle.js[85948:85982]", functionData => eval(functionData))};

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {lacuna_lazy_load("todomvc.bundle.js[86118:86302]", functionData => eval(functionData))};

  // Is a given value a DOM element?
  _.isElement = function(obj) {lacuna_lazy_load("todomvc.bundle.js[86372:86419]", functionData => eval(functionData))};

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {lacuna_lazy_load("todomvc.bundle.js[86546:86602]", functionData => eval(functionData))};

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {lacuna_lazy_load("todomvc.bundle.js[87198:87251]", functionData => eval(functionData))};
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {lacuna_lazy_load("todomvc.bundle.js[87494:87552]", functionData => eval(functionData))};

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {lacuna_lazy_load("todomvc.bundle.js[87666:87714]", functionData => eval(functionData))};

  // Is a given value a boolean?
  _.isBoolean = function(obj) {lacuna_lazy_load("todomvc.bundle.js[87780:87871]", functionData => eval(functionData))};

  // Is a given value equal to null?
  _.isNull = function(obj) {lacuna_lazy_load("todomvc.bundle.js[87938:87968]", functionData => eval(functionData))};

  // Is a given variable undefined?
  _.isUndefined = function(obj) {lacuna_lazy_load("todomvc.bundle.js[88039:88071]", functionData => eval(functionData))};

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {lacuna_lazy_load("todomvc.bundle.js[88235:88282]", functionData => eval(functionData))};

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {lacuna_lazy_load("todomvc.bundle.js[88506:88561]", functionData => eval(functionData))};

  // Keep the identity function around for default iterators.
  _.identity = function(value) {lacuna_lazy_load("todomvc.bundle.js[88657:88680]", functionData => eval(functionData))};

  _.constant = function(value) {lacuna_lazy_load("todomvc.bundle.js[88714:88771]", functionData => eval(functionData))};

  _.property = function(key) {lacuna_lazy_load("todomvc.bundle.js[88803:88865]", functionData => eval(functionData))};

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {lacuna_lazy_load("todomvc.bundle.js[88992:89226]", functionData => eval(functionData))};

  // Run a function **n** times.
  _.times = function(n, iterator, context) {lacuna_lazy_load("todomvc.bundle.js[89305:89437]", functionData => eval(functionData))};

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {lacuna_lazy_load("todomvc.bundle.js[89534:89662]", functionData => eval(functionData))};

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {lacuna_lazy_load("todomvc.bundle.js[89771:89803]", functionData => eval(functionData))};

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {lacuna_lazy_load("todomvc.bundle.js[90465:90636]", functionData => eval(functionData))};
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {lacuna_lazy_load("todomvc.bundle.js[91163:91300]", functionData => eval(functionData))};
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {lacuna_lazy_load("todomvc.bundle.js[92606:94421]", functionData => eval(functionData))};

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {lacuna_lazy_load("todomvc.bundle.js[94515:94547]", functionData => eval(functionData))};

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {lacuna_lazy_load("todomvc.bundle.js[94884:94936]", functionData => eval(functionData))};

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {lacuna_lazy_load("todomvc.bundle.js[95231:95426]", functionData => eval(functionData))};
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {lacuna_lazy_load("todomvc.bundle.js[95612:95691]", functionData => eval(functionData))};
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {lacuna_lazy_load("todomvc.bundle.js[95800:95852]", functionData => eval(functionData))},

    // Extracts the result from a wrapped and chained object.
    value: function() {lacuna_lazy_load("todomvc.bundle.js[95939:95974]", functionData => eval(functionData))}

  });

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {lacuna_lazy_load("todomvc.bundle.js[96587:96610]", functionData => eval(functionData))});
  }
}).call(this);

},{}],22:[function(require,module,exports){
;window.ampersand = window.ampersand || {};window.ampersand["ampersand-state"] = window.ampersand["ampersand-state"] || [];window.ampersand["ampersand-state"].push("4.3.14");
var _ = require('underscore');
var BBEvents = require('backbone-events-standalone');
var KeyTree = require('key-tree-store');
var arrayNext = require('array-next');
var changeRE = /^change:/;

function Base(attrs, options) {
    options || (options = {});
    this.cid || (this.cid = _.uniqueId('state'));
    this._events = {};
    this._values = {};
    this._definition = Object.create(this._definition);
    if (options.parse) attrs = this.parse(attrs, options);
    this.parent = options.parent;
    this.collection = options.collection;
    this._keyTree = new KeyTree();
    this._initCollections();
    this._initChildren();
    this._cache = {};
    this._previousAttributes = {};
    if (attrs) this.set(attrs, _.extend({silent: true, initial: true}, options));
    this._changed = {};
    if (this._derived) this._initDerived();
    if (options.init !== false) this.initialize.apply(this, arguments);
}


_.extend(Base.prototype, BBEvents, {
    // can be allow, ignore, reject
    extraProperties: 'ignore',

    idAttribute: 'id',

    namespaceAttribute: 'namespace',

    typeAttribute: 'modelType',

    // Stubbed out to be overwritten
    initialize: function () {lacuna_lazy_load("todomvc.bundle.js[98033:98061]", functionData => eval(functionData))},

    // Get ID of model per configuration.
    // Should *always* be how ID is determined by other code.
    getId: function () {lacuna_lazy_load("todomvc.bundle.js[98191:98237]", functionData => eval(functionData))},

    // Get namespace of model per configuration.
    // Should *always* be how namespace is determined by other code.
    getNamespace: function () {lacuna_lazy_load("todomvc.bundle.js[98388:98441]", functionData => eval(functionData))},

    // Get type of model per configuration.
    // Should *always* be how type is determined by other code.
    getType: function () {lacuna_lazy_load("todomvc.bundle.js[98577:98625]", functionData => eval(functionData))},

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function () {lacuna_lazy_load("todomvc.bundle.js[98732:98776]", functionData => eval(functionData))},

    // get HTML-escaped value of attribute
    escape: function (attr) {lacuna_lazy_load("todomvc.bundle.js[98850:98898]", functionData => eval(functionData))},

    // Check if the model is currently in a valid state.
    isValid: function (options) {lacuna_lazy_load("todomvc.bundle.js[98990:99077]", functionData => eval(functionData))},

    // Parse can be used remap/restructure/rename incoming properties
    // before they are applied to attributes.
    parse: function (resp, options) {lacuna_lazy_load("todomvc.bundle.js[99232:99260]", functionData => eval(functionData))},

    // Serialize is the inverse of `parse` it lets you massage data
    // on the way out. Before, sending to server, for example.
    serialize: function () {lacuna_lazy_load("todomvc.bundle.js[99421:99748]", functionData => eval(functionData))},

    // Main set method used by generated setters/getters and can
    // be used directly if you need to pass options or set multiple
    // properties at once.
    set: function (key, value, options) {
        var self = this;
        var extraProperties = this.extraProperties;
        var triggers = [];
        var changing, changes, newType, newVal, def, cast, err, attr,
            attrs, dataType, silent, unset, currentVal, initial, hasChanged, isEqual;

        // Handle both `"key", value` and `{key: value}` -style arguments.
        if (_.isObject(key) || key === null) {
            attrs = key;
            options = value;
        } else {
            attrs = {};
            attrs[key] = value;
        }

        options = options || {};

        if (!this._validate(attrs, options)) return false;

        // Extract attributes and options.
        unset = options.unset;
        silent = options.silent;
        initial = options.initial;

        changes = [];
        changing = this._changing;
        this._changing = true;

        // if not already changing, store previous
        if (!changing) {
            this._previousAttributes = this.attributes;
            this._changed = {};
        }

        // For each `set` attribute...
        for (attr in attrs) {
            newVal = attrs[attr];
            newType = typeof newVal;
            currentVal = this._values[attr];
            def = this._definition[attr];


            if (!def) {
                // if this is a child model or collection
                if (this._children[attr] || this._collections[attr]) {
                    this[attr].set(newVal, options);
                    continue;
                } else if (extraProperties === 'ignore') {
                    continue;
                } else if (extraProperties === 'reject') {
                    throw new TypeError('No "' + attr + '" property defined on ' + (this.type || 'this') + ' model and extraProperties not set to "ignore" or "allow"');
                } else if (extraProperties === 'allow') {
                    def = this._createPropertyDefinition(attr, 'any');
                }
            }

            isEqual = this._getCompareForType(def.type);
            dataType = this._dataTypes[def.type];

            // check type if we have one
            if (dataType && dataType.set) {
                cast = dataType.set(newVal);
                newVal = cast.val;
                newType = cast.type;
            }

            // If we've defined a test, run it
            if (def.test) {
                err = def.test.call(this, newVal, newType);
                if (err) {
                    throw new TypeError('Property \'' + attr + '\' failed validation with error: ' + err);
                }
            }

            // If we are required but undefined, throw error.
            // If we are null and are not allowing null, throw error
            // If we have a defined type and the new type doesn't match, and we are not null, throw error.

            if (_.isUndefined(newVal) && def.required) {
                throw new TypeError('Required property \'' + attr + '\' must be of type ' + def.type + '. Tried to set ' + newVal);
            }
            if (_.isNull(newVal) && def.required && !def.allowNull) {
                throw new TypeError('Property \'' + attr + '\' must be of type ' + def.type + ' (cannot be null). Tried to set ' + newVal);
            }
            if ((def.type && def.type !== 'any' && def.type !== newType) && !_.isNull(newVal) && !_.isUndefined(newVal)) {
                throw new TypeError('Property \'' + attr + '\' must be of type ' + def.type + '. Tried to set ' + newVal);
            }
            if (def.values && !_.contains(def.values, newVal)) {
                throw new TypeError('Property \'' + attr + '\' must be one of values: ' + def.values.join(', '));
            }

            hasChanged = !isEqual(currentVal, newVal, attr);

            // enforce `setOnce` for properties if set
            if (def.setOnce && currentVal !== undefined && hasChanged) {
                throw new TypeError('Property \'' + key + '\' can only be set once.');
            }

            // keep track of changed attributes
            // and push to changes array
            if (hasChanged) {
                changes.push({prev: currentVal, val: newVal, key: attr});
                self._changed[attr] = newVal;
            } else {
                delete self._changed[attr];
            }
        }

        // actually update our values
        _.each(changes, function (change) {
            self._previousAttributes[change.key] = change.prev;
            if (unset) {
                delete self._values[change.key];
            } else {
                self._values[change.key] = change.val;
            }
        });

        if (!silent && changes.length) self._pending = true;
        if (!silent) {
            _.each(changes, function (change) {
                self.trigger('change:' + change.key, self, change.val, options);
            });
        }

        // You might be wondering why there's a `while` loop here. Changes can
        // be recursively nested within `"change"` events.
        if (changing) return this;
        if (!silent) {
            while (this._pending) {
                this._pending = false;
                this.trigger('change', this, options);
            }
        }
        this._pending = false;
        this._changing = false;
        return this;
    },

    get: function (attr) {lacuna_lazy_load("todomvc.bundle.js[105317:105351]", functionData => eval(functionData))},

    // Toggle boolean properties or properties that have a `values`
    // array in its definition.
    toggle: function (property) {lacuna_lazy_load("todomvc.bundle.js[105486:106052]", functionData => eval(functionData))},

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function () {lacuna_lazy_load("todomvc.bundle.js[106190:106247]", functionData => eval(functionData))},

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function (attr) {lacuna_lazy_load("todomvc.bundle.js[106439:106549]", functionData => eval(functionData))},

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function (diff) {lacuna_lazy_load("todomvc.bundle.js[107017:107533]", functionData => eval(functionData))},

    toJSON: function () {lacuna_lazy_load("todomvc.bundle.js[107560:107600]", functionData => eval(functionData))},

    unset: function (attr, options) {lacuna_lazy_load("todomvc.bundle.js[107639:107960]", functionData => eval(functionData))},

    clear: function (options) {lacuna_lazy_load("todomvc.bundle.js[107993:108153]", functionData => eval(functionData))},

    previous: function (attr) {lacuna_lazy_load("todomvc.bundle.js[108186:108328]", functionData => eval(functionData))},

    // Get default values for a certain type
    _getDefaultForType: function (type) {lacuna_lazy_load("todomvc.bundle.js[108416:108514]", functionData => eval(functionData))},

    // Determine which comparison algorithm to use for comparing a property
    _getCompareForType: function (type) {
        var dataType = this._dataTypes[type];
        if (dataType && dataType.compare) return _.bind(dataType.compare, this);
        return _.isEqual;
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function (attrs, options) {
        if (!options.validate || !this.validate) return true;
        attrs = _.extend({}, this.attributes, attrs);
        var error = this.validationError = this.validate(attrs, options) || null;
        if (!error) return true;
        this.trigger('invalid', this, error, _.extend(options || {}, {validationError: error}));
        return false;
    },

    _createPropertyDefinition: function (name, desc, isSession) {lacuna_lazy_load("todomvc.bundle.js[109412:109489]", functionData => eval(functionData))},

    // just makes friendlier errors when trying to define a new model
    // only used when setting up original property definitions
    _ensureValidType: function (type) {
        return _.contains(['string', 'number', 'boolean', 'array', 'object', 'date', 'any'].concat(_.keys(this._dataTypes)), type) ? type : undefined;
    },

    getAttributes: function (options, raw) {
        options || (options = {});
        _.defaults(options, {
            session: false,
            props: false,
            derived: false
        });
        var res = {};
        var val, item, def;
        for (item in this._definition) {
            def = this._definition[item];
            if ((options.session && def.session) || (options.props && !def.session)) {
                val = (raw) ? this._values[item] : this[item];
                if (typeof val === 'undefined') val = _.result(def, 'default');
                if (typeof val !== 'undefined') res[item] = val;
            }
        }
        if (options.derived) {
            for (item in this._derived) res[item] = this[item];
        }
        return res;
    },

    _initDerived: function () {
        var self = this;

        _.each(this._derived, function (value, name) {
            var def = self._derived[name];
            def.deps = def.depList;

            var update = function (options) {
                options = options || {};

                var newVal = def.fn.call(self);

                if (self._cache[name] !== newVal || !def.cache) {
                    if (def.cache) {
                        self._previousAttributes[name] = self._cache[name];
                    }
                    self._cache[name] = newVal;
                    self.trigger('change:' + name, self, self._cache[name]);
                }
            };

            def.deps.forEach(function (propString) {
                self._keyTree.add(propString, update);
            });
        });

        this.on('all', function (eventName) {
            if (changeRE.test(eventName)) {
                self._keyTree.get(eventName.split(':')[1]).forEach(function (fn) {
                    fn();
                });
            }
        }, this);
    },

    _getDerivedProperty: function (name, flushCache) {
        // is this a derived property that is cached
        if (this._derived[name].cache) {
            //set if this is the first time, or flushCache is set
            if (flushCache || !this._cache.hasOwnProperty(name)) {
                this._cache[name] = this._derived[name].fn.apply(this);
            }
            return this._cache[name];
        } else {
            return this._derived[name].fn.apply(this);
        }
    },

    _initCollections: function () {
        var coll;
        if (!this._collections) return;
        for (coll in this._collections) {
            this[coll] = new this._collections[coll](null, {parent: this});
        }
    },

    _initChildren: function () {
        var child;
        if (!this._children) return;
        for (child in this._children) {
            this[child] = new this._children[child]({}, {parent: this});
            this.listenTo(this[child], 'all', this._getEventBubblingHandler(child));
        }
    },

    // Returns a bound handler for doing event bubbling while
    // adding a name to the change string.
    _getEventBubblingHandler: function (propertyName) {
        return _.bind(function (name, model, newValue) {
            if (changeRE.test(name)) {
                this.trigger('change:' + propertyName + '.' + name.split(':')[1], model, newValue);
            } else if (name === 'change') {
                this.trigger('change', this);
            }
        }, this);
    },

    // Check that all required attributes are present
    _verifyRequired: function () {lacuna_lazy_load("todomvc.bundle.js[113303:113579]", functionData => eval(functionData))}
});

// getter for attributes
Object.defineProperties(Base.prototype, {
    attributes: {
        get: function () {
            return this.getAttributes({props: true, session: true});
        }
    },
    all: {
        get: function () {lacuna_lazy_load("todomvc.bundle.js[113819:113976]", functionData => eval(functionData))}
    },
    isState: {
        get: function () {lacuna_lazy_load("todomvc.bundle.js[114024:114040]", functionData => eval(functionData))},
        set: function () {lacuna_lazy_load("todomvc.bundle.js[114067:114070]", functionData => eval(functionData))}
    }
});

// helper for creating/storing property definitions and creating
// appropriate getters/setters
function createPropertyDefinition(object, name, desc, isSession) {
    var def = object._definition[name] = {};
    var type, descArray;

    if (_.isString(desc)) {
        // grab our type if all we've got is a string
        type = object._ensureValidType(desc);
        if (type) def.type = type;
    } else {

        //Transform array of ['type', required, default] to object form
        if (_.isArray(desc)) {
            descArray = desc;
            desc = {
                type: descArray[0],
                required: descArray[1],
                default: descArray[2]
            };
        }

        type = object._ensureValidType(desc.type);
        if (type) def.type = type;

        if (desc.required) def.required = true;

        if (desc.default && typeof desc.default === 'object') {
            throw new TypeError('The default value for ' + name + ' cannot be an object/array, must be a value or a function which returns a value/object/array');
        }
        def.default = desc.default;

        def.allowNull = desc.allowNull ? desc.allowNull : false;
        if (desc.setOnce) def.setOnce = true;
        if (def.required && _.isUndefined(def.default)) def.default = object._getDefaultForType(type);
        def.test = desc.test;
        def.values = desc.values;
    }
    if (isSession) def.session = true;

    // define a getter/setter on the prototype
    // but they get/set on the instance
    Object.defineProperty(object, name, {
        set: function (val) {
            this.set(name, val);
        },
        get: function () {
            var result = this._values[name];
            var typeDef = this._dataTypes[def.type];
            if (typeof result !== 'undefined') {
                if (typeDef && typeDef.get) {
                    result = typeDef.get(result);
                }
                return result;
            }
            return _.result(def, 'default');
        }
    });

    return def;
}

// helper for creating derived property definitions
function createDerivedProperty(modelProto, name, definition) {
    var def = modelProto._derived[name] = {
        fn: _.isFunction(definition) ? definition : definition.fn,
        cache: (definition.cache !== false),
        depList: definition.deps || []
    };

    // add to our shared dependency list
    _.each(def.depList, function (dep) {
        modelProto._deps[dep] = _(modelProto._deps[dep] || []).union([name]);
    });

    // defined a top-level getter for derived names
    Object.defineProperty(modelProto, name, {
        get: function () {
            return this._getDerivedProperty(name);
        },
        set: function () {lacuna_lazy_load("todomvc.bundle.js[116839:116951]", functionData => eval(functionData))}
    });
}

var dataTypes = {
    string: {
        default: function () {lacuna_lazy_load("todomvc.bundle.js[117024:117058]", functionData => eval(functionData))}
    },
    date: {
        set: function (newVal) {lacuna_lazy_load("todomvc.bundle.js[117109:117768]", functionData => eval(functionData))},
        get: function (val) {lacuna_lazy_load("todomvc.bundle.js[117798:117843]", functionData => eval(functionData))},
        default: function () {lacuna_lazy_load("todomvc.bundle.js[117874:117916]", functionData => eval(functionData))}
    },
    array: {
        set: function (newVal) {lacuna_lazy_load("todomvc.bundle.js[117968:118110]", functionData => eval(functionData))},
        default: function () {lacuna_lazy_load("todomvc.bundle.js[118141:118175]", functionData => eval(functionData))}
    },
    object: {
        set: function (newVal) {lacuna_lazy_load("todomvc.bundle.js[118228:118730]", functionData => eval(functionData))},
        default: function () {lacuna_lazy_load("todomvc.bundle.js[118761:118795]", functionData => eval(functionData))}
    },
    // the `state` data type is a bit special in that setting it should
    // also bubble events
    state: {
        set: function (newVal) {
            var isInstance = newVal instanceof Base || (newVal && newVal.isState);
            if (isInstance) {
                return {
                    val: newVal,
                    type: 'state'
                };
            } else {
                return {
                    val: newVal,
                    type: typeof newVal
                };
            }
        },
        compare: function (currentVal, newVal, attributeName) {
            var isSame = currentVal === newVal;

            // if this has changed we want to also handle
            // event propagation
            if (!isSame) {
                if (currentVal) {
                    this.stopListening(currentVal);
                }

                if (newVal != null) {
                    this.listenTo(newVal, 'all', this._getEventBubblingHandler(attributeName));
                }
            }

            return isSame;
        }
    }
};

// the extend method used to extend prototypes, maintain inheritance chains for instanceof
// and allow for additions to the model definitions.
function extend(protoProps) {
    var parent = this;
    var child;
    var args = [].slice.call(arguments);
    var prop, item;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && protoProps.hasOwnProperty('constructor')) {
        child = protoProps.constructor;
    } else {
        child = function () {
            return parent.apply(this, arguments);
        };
    }

    // Add static properties to the constructor function from parent
    _.extend(child, parent);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function () { this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();

    // set prototype level objects
    child.prototype._derived =  _.extend({}, parent.prototype._derived);
    child.prototype._deps = _.extend({}, parent.prototype._deps);
    child.prototype._definition = _.extend({}, parent.prototype._definition);
    child.prototype._collections = _.extend({}, parent.prototype._collections);
    child.prototype._children = _.extend({}, parent.prototype._children);
    child.prototype._dataTypes = _.extend({}, parent.prototype._dataTypes || dataTypes);

    // Mix in all prototype properties to the subclass if supplied.
    if (protoProps) {
        args.forEach(function processArg(def) {
            if (def.dataTypes) {
                _.each(def.dataTypes, function (def, name) {
                    child.prototype._dataTypes[name] = def;
                });
                delete def.dataTypes;
            }
            if (def.props) {
                _.each(def.props, function (def, name) {
                    createPropertyDefinition(child.prototype, name, def);
                });
                delete def.props;
            }
            if (def.session) {
                _.each(def.session, function (def, name) {
                    createPropertyDefinition(child.prototype, name, def, true);
                });
                delete def.session;
            }
            if (def.derived) {
                _.each(def.derived, function (def, name) {
                    createDerivedProperty(child.prototype, name, def);
                });
                delete def.derived;
            }
            if (def.collections) {
                _.each(def.collections, function (constructor, name) {
                    child.prototype._collections[name] = constructor;
                });
                delete def.collections;
            }
            if (def.children) {
                _.each(def.children, function (constructor, name) {lacuna_lazy_load("todomvc.bundle.js[122851:122937]", functionData => eval(functionData))});
                delete def.children;
            }
            _.extend(child.prototype, def);
        });
    }

    var toString = Object.prototype.toString;

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
}

Base.extend = extend;

// Our main exports
module.exports = Base;

},{"array-next":23,"backbone-events-standalone":25,"key-tree-store":26,"underscore":27}],23:[function(require,module,exports){
module.exports = function arrayNext(array, currentItem) {lacuna_lazy_load("todomvc.bundle.js[123502:123656]", functionData => eval(functionData))};

},{}],24:[function(require,module,exports){lacuna_lazy_load("todomvc.bundle.js[123701:123731]", functionData => eval(functionData))},{}],25:[function(require,module,exports){
module.exports=require(12)
},{"./backbone-events-standalone":24}],26:[function(require,module,exports){
function KeyTreeStore() {
    this.storage = {};
}

// add an object to the store
KeyTreeStore.prototype.add = function (keypath, obj) {
    var arr = this.storage[keypath] || (this.storage[keypath] = []);
    arr.push(obj);
};

// remove an object
KeyTreeStore.prototype.remove = function (obj) {lacuna_lazy_load("todomvc.bundle.js[124174:124436]", functionData => eval(functionData))};

// grab all relevant objects
KeyTreeStore.prototype.get = function (keypath) {
    var res = [];
    var key;

    for (key in this.storage) {
        if (keypath === key || key.indexOf(keypath + '.') === 0) {
            res = res.concat(this.storage[key]);
        }
    }

    return res;
};

module.exports = KeyTreeStore;

},{}],27:[function(require,module,exports){
//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.7.0';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var createCallback = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {lacuna_lazy_load("todomvc.bundle.js[126933:126984]", functionData => eval(functionData))};
      case 2: return function(value, other) {lacuna_lazy_load("todomvc.bundle.js[127030:127088]", functionData => eval(functionData))};
      case 3: return function(value, index, collection) {lacuna_lazy_load("todomvc.bundle.js[127146:127216]", functionData => eval(functionData))};
      case 4: return function(accumulator, value, index, collection) {lacuna_lazy_load("todomvc.bundle.js[127287:127370]", functionData => eval(functionData))};
    }
    return function() {lacuna_lazy_load("todomvc.bundle.js[127400:127452]", functionData => eval(functionData))};
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  _.iteratee = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return createCallback(value, context, argCount);
    if (_.isObject(value)) return _.matches(value);
    return _.property(value);
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    if (obj == null) return obj;
    iteratee = createCallback(iteratee, context);
    var i, length = obj.length;
    if (length === +length) {
      for (i = 0; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {lacuna_lazy_load("todomvc.bundle.js[128766:129190]", functionData => eval(functionData))};

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = function(obj, iteratee, memo, context) {lacuna_lazy_load("todomvc.bundle.js[129430:129959]", functionData => eval(functionData))};

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {lacuna_lazy_load("todomvc.bundle.js[130098:130599]", functionData => eval(functionData))};

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {lacuna_lazy_load("todomvc.bundle.js[130734:130973]", functionData => eval(functionData))};

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    predicate = _.iteratee(predicate, context);
    _.each(obj, function(value, index, list) {lacuna_lazy_load("todomvc.bundle.js[131267:131336]", functionData => eval(functionData))});
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {lacuna_lazy_load("todomvc.bundle.js[131471:131544]", functionData => eval(functionData))};

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    if (obj == null) return true;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {lacuna_lazy_load("todomvc.bundle.js[132239:132637]", functionData => eval(functionData))};

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (obj.length !== +obj.length) obj = _.values(obj);
    return _.indexOf(obj, target) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {lacuna_lazy_load("todomvc.bundle.js[133036:133236]", functionData => eval(functionData))};

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {lacuna_lazy_load("todomvc.bundle.js[133347:133392]", functionData => eval(functionData))};

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {lacuna_lazy_load("todomvc.bundle.js[133554:133603]", functionData => eval(functionData))};

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {lacuna_lazy_load("todomvc.bundle.js[133769:133816]", functionData => eval(functionData))};

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {lacuna_lazy_load("todomvc.bundle.js[133926:134629]", functionData => eval(functionData))};

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {lacuna_lazy_load("todomvc.bundle.js[134739:135438]", functionData => eval(functionData))};

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {lacuna_lazy_load("todomvc.bundle.js[135608:135959]", functionData => eval(functionData))};

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {lacuna_lazy_load("todomvc.bundle.js[136180:136376]", functionData => eval(functionData))};

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {lacuna_lazy_load("todomvc.bundle.js[136495:136994]", functionData => eval(functionData))};

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {lacuna_lazy_load("todomvc.bundle.js[137144:137381]", functionData => eval(functionData))};
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {lacuna_lazy_load("todomvc.bundle.js[137577:137663]", functionData => eval(functionData))});

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {lacuna_lazy_load("todomvc.bundle.js[137853:137883]", functionData => eval(functionData))});

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {lacuna_lazy_load("todomvc.bundle.js[138102:138172]", functionData => eval(functionData))});

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {lacuna_lazy_load("todomvc.bundle.js[138386:138662]", functionData => eval(functionData))};

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {lacuna_lazy_load("todomvc.bundle.js[138755:138926]", functionData => eval(functionData))};

  // Return the number of elements in an object.
  _.size = function(obj) {lacuna_lazy_load("todomvc.bundle.js[139003:139112]", functionData => eval(functionData))};

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {lacuna_lazy_load("todomvc.bundle.js[139320:139542]", functionData => eval(functionData))};

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {lacuna_lazy_load("todomvc.bundle.js[139835:139985]", functionData => eval(functionData))};

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {lacuna_lazy_load("todomvc.bundle.js[140272:140368]", functionData => eval(functionData))};

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {lacuna_lazy_load("todomvc.bundle.js[140562:140726]", functionData => eval(functionData))};

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {lacuna_lazy_load("todomvc.bundle.js[141043:141106]", functionData => eval(functionData))};

  // Trim out all falsy values from an array.
  _.compact = function(array) {lacuna_lazy_load("todomvc.bundle.js[141185:141230]", functionData => eval(functionData))};

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    for (var i = 0, length = input.length; i < length; i++) {
      var value = input[i];
      if (!_.isArray(value) && !_.isArguments(value)) {
        if (!strict) output.push(value);
      } else if (shallow) {
        push.apply(output, value);
      } else {
        flatten(value, shallow, strict, output);
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {lacuna_lazy_load("todomvc.bundle.js[141923:141975]", functionData => eval(functionData))};

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {lacuna_lazy_load("todomvc.bundle.js[142089:142152]", functionData => eval(functionData))};

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = _.iteratee(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i];
      if (isSorted) {
        if (!i || seen !== value) result.push(value);
        seen = value;
      } else if (iteratee) {
        var computed = iteratee(value, i, array);
        if (_.indexOf(seen, computed) < 0) {
          seen.push(computed);
          result.push(value);
        }
      } else if (_.indexOf(result, value) < 0) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true, []));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {lacuna_lazy_load("todomvc.bundle.js[143474:143885]", functionData => eval(functionData))};

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(slice.call(arguments, 1), true, true, []);
    return _.filter(array, function(value){lacuna_lazy_load("todomvc.bundle.js[144172:144218]", functionData => eval(functionData))});
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function(array) {lacuna_lazy_load("todomvc.bundle.js[144356:144587]", functionData => eval(functionData))};

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {lacuna_lazy_load("todomvc.bundle.js[144817:145083]", functionData => eval(functionData))};

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  _.lastIndexOf = function(array, item, from) {lacuna_lazy_load("todomvc.bundle.js[145813:146061]", functionData => eval(functionData))};

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {lacuna_lazy_load("todomvc.bundle.js[146316:146632]", functionData => eval(functionData))};

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var Ctor = function(){lacuna_lazy_load("todomvc.bundle.js[146772:146774]", functionData => eval(functionData))};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    args = slice.call(arguments, 2);
    bound = function() {lacuna_lazy_load("todomvc.bundle.js[147260:147599]", functionData => eval(functionData))};
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {lacuna_lazy_load("todomvc.bundle.js[147961:148272]", functionData => eval(functionData))};
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {lacuna_lazy_load("todomvc.bundle.js[148504:148754]", functionData => eval(functionData))};

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {lacuna_lazy_load("todomvc.bundle.js[148853:149151]", functionData => eval(functionData))};

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {lacuna_lazy_load("todomvc.bundle.js[149300:149431]", functionData => eval(functionData))};

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {lacuna_lazy_load("todomvc.bundle.js[149553:149631]", functionData => eval(functionData))};

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {lacuna_lazy_load("todomvc.bundle.js[150066:150948]", functionData => eval(functionData))};

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {lacuna_lazy_load("todomvc.bundle.js[151275:151999]", functionData => eval(functionData))};

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {lacuna_lazy_load("todomvc.bundle.js[152226:152268]", functionData => eval(functionData))};

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {lacuna_lazy_load("todomvc.bundle.js[152363:152447]", functionData => eval(functionData))};

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {lacuna_lazy_load("todomvc.bundle.js[152614:152861]", functionData => eval(functionData))};

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {lacuna_lazy_load("todomvc.bundle.js[152977:153090]", functionData => eval(functionData))};

  // Returns a function that will only be executed before being called N times.
  _.before = function(times, func) {lacuna_lazy_load("todomvc.bundle.js[153208:153390]", functionData => eval(functionData))};

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {lacuna_lazy_load("todomvc.bundle.js[154008:154199]", functionData => eval(functionData))};

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {lacuna_lazy_load("todomvc.bundle.js[154288:154487]", functionData => eval(functionData))};

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    if (!_.isObject(obj)) return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj, iteratee, context) {lacuna_lazy_load("todomvc.bundle.js[155597:156143]", functionData => eval(functionData))};

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {lacuna_lazy_load("todomvc.bundle.js[156260:156562]", functionData => eval(functionData))};

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    if (!_.isObject(obj)) return obj;
    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {lacuna_lazy_load("todomvc.bundle.js[156996:157100]", functionData => eval(functionData))};

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {lacuna_lazy_load("todomvc.bundle.js[157352:157395]", functionData => eval(functionData))};

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (
      aCtor !== bCtor &&
      // Handle Object.create(x) cases
      'constructor' in a && 'constructor' in b &&
      !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
        _.isFunction(bCtor) && bCtor instanceof bCtor)
    ) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size, result;
    // Recursively compare objects and arrays.
    if (className === '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size === b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      size = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      result = _.keys(b).length === size;
      if (result) {
        while (size--) {
          // Deep compare each member
          key = keys[size];
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {lacuna_lazy_load("todomvc.bundle.js[161450:161656]", functionData => eval(functionData))};

  // Is a given value a DOM element?
  _.isElement = function(obj) {lacuna_lazy_load("todomvc.bundle.js[161726:161773]", functionData => eval(functionData))};

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {lacuna_lazy_load("todomvc.bundle.js[161900:161957]", functionData => eval(functionData))};

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {lacuna_lazy_load("todomvc.bundle.js[162613:162655]", functionData => eval(functionData))};
  }

  // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
  if (typeof /./ !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {lacuna_lazy_load("todomvc.bundle.js[162930:162988]", functionData => eval(functionData))};

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {lacuna_lazy_load("todomvc.bundle.js[163102:163151]", functionData => eval(functionData))};

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {lacuna_lazy_load("todomvc.bundle.js[163673:163735]", functionData => eval(functionData))};

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {lacuna_lazy_load("todomvc.bundle.js[163959:164014]", functionData => eval(functionData))};

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {lacuna_lazy_load("todomvc.bundle.js[164110:164133]", functionData => eval(functionData))};

  _.constant = function(value) {lacuna_lazy_load("todomvc.bundle.js[164167:164223]", functionData => eval(functionData))};

  _.noop = function(){lacuna_lazy_load("todomvc.bundle.js[164247:164249]", functionData => eval(functionData))};

  _.property = function(key) {lacuna_lazy_load("todomvc.bundle.js[164281:164343]", functionData => eval(functionData))};

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {lacuna_lazy_load("todomvc.bundle.js[164470:164809]", functionData => eval(functionData))};

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {lacuna_lazy_load("todomvc.bundle.js[164888:165059]", functionData => eval(functionData))};

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {lacuna_lazy_load("todomvc.bundle.js[165156:165284]", functionData => eval(functionData))};

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {lacuna_lazy_load("todomvc.bundle.js[165393:165431]", functionData => eval(functionData))};

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {lacuna_lazy_load("todomvc.bundle.js[165802:165834]", functionData => eval(functionData))};
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {lacuna_lazy_load("todomvc.bundle.js[166062:166207]", functionData => eval(functionData))};
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? object[property]() : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {lacuna_lazy_load("todomvc.bundle.js[167651:167690]", functionData => eval(functionData))};

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {lacuna_lazy_load("todomvc.bundle.js[168023:169885]", functionData => eval(functionData))};

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {lacuna_lazy_load("todomvc.bundle.js[169987:170068]", functionData => eval(functionData))};

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {lacuna_lazy_load("todomvc.bundle.js[171117:171314]", functionData => eval(functionData))};
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {lacuna_lazy_load("todomvc.bundle.js[171502:171581]", functionData => eval(functionData))};
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {lacuna_lazy_load("todomvc.bundle.js[171683:171714]", functionData => eval(functionData))};

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {lacuna_lazy_load("todomvc.bundle.js[172321:172344]", functionData => eval(functionData))});
  }
}.call(this));

},{}],28:[function(require,module,exports){
var _ = require('underscore');
var Events = require('backbone-events-standalone');
var classExtend = require('ampersand-class-extend');
var underscoreMixins = require('ampersand-collection-underscore-mixin');
var slice = Array.prototype.slice;


function SubCollection(collection, spec) {
    spec || (spec = {});
    this.collection = collection;
    this._reset();
    this._watched = spec.watched || [];
    this._parseFilters(spec);
    this._runFilters();
    this.listenTo(this.collection, 'all', this._onCollectionEvent);
}


_.extend(SubCollection.prototype, Events, underscoreMixins, {
    // add a filter function directly
    addFilter: function (filter) {lacuna_lazy_load("todomvc.bundle.js[173077:173145]", functionData => eval(functionData))},

    // remove filter function directly
    removeFilter: function (filter) {lacuna_lazy_load("todomvc.bundle.js[173223:173294]", functionData => eval(functionData))},

    // clears filters fires events for changes
    clearFilters: function () {
        this._reset();
        this._runFilters();
    },

    // Update sub collection config, if `clear`
    // then clear existing filters before start.
    // This takes all the same filter arguments
    // as the init function. So you can pass:
    // {
    //   where: {
    //      name: 'something'
    //   },
    //   limit: 20
    // }
    configure: function (opts, clear) {lacuna_lazy_load("todomvc.bundle.js[173761:173871]", functionData => eval(functionData))},

    // gets a model at a given index
    at: function (index) {lacuna_lazy_load("todomvc.bundle.js[173936:173978]", functionData => eval(functionData))},

    // proxy `get` method to the underlying collection
    get: function (query, indexName) {lacuna_lazy_load("todomvc.bundle.js[174073:174196]", functionData => eval(functionData))},

    // remove filter if found
    _removeFilter: function (filter) {lacuna_lazy_load("todomvc.bundle.js[174266:174406]", functionData => eval(functionData))},

    // clear all filters, reset everything
    _reset: function () {
        this.models = [];
        this._resetFilters();
    },

    // just reset filters, no model changes
    _resetFilters: function () {
        this._filters = [];
        this._watched = [];
        this.limit = undefined;
        this.offset = undefined;
    },

    // internal method registering new filter function
    _addFilter: function (filter) {lacuna_lazy_load("todomvc.bundle.js[174837:174880]", functionData => eval(functionData))},

    // adds a property or array of properties to watch, ensures uniquness.
    _watch: function (item) {lacuna_lazy_load("todomvc.bundle.js[174986:175074]", functionData => eval(functionData))},

    // removes a watched property
    _unwatch: function (item) {lacuna_lazy_load("todomvc.bundle.js[175141:175204]", functionData => eval(functionData))},

    _parseFilters: function (spec) {
        if (spec.where) {
            _.each(spec.where, function (value, item) {lacuna_lazy_load("todomvc.bundle.js[175324:175492]", functionData => eval(functionData))}, this);
            // also make sure we watch all `where` keys
            this._watch(_.keys(spec.where));
        }
        if (spec.hasOwnProperty('limit')) this.limit = spec.limit;
        if (spec.hasOwnProperty('offset')) this.offset = spec.offset;
        if (spec.filter) {
            this._addFilter(spec.filter, false);
        }
        if (spec.filters) {
            spec.filters.forEach(this._addFilter, this);
        }
        if (spec.comparator) {
            this.comparator = spec.comparator;
        }
    },

    _runFilters: function () {
        // make a copy of the array for comparisons
        var existingModels = slice.call(this.models);
        var rootModels = slice.call(this.collection.models);
        var offset = (this.offset || 0);
        var newModels, toAdd, toRemove;

        // reduce base model set by applying filters
        if (this._filters.length) {
            newModels = _.reduce(this._filters, function (startingArray, filterFunc) {lacuna_lazy_load("todomvc.bundle.js[176480:176552]", functionData => eval(functionData))}, rootModels);
        } else {
            newModels = slice.call(rootModels);
        }

        // sort it
        if (this.comparator) newModels = _.sortBy(newModels, this.comparator);

        // trim it to length
        if (this.limit || this.offset) newModels = newModels.slice(offset, this.limit + offset);

        // now we've got our new models time to compare
        toAdd = _.difference(newModels, existingModels);
        toRemove = _.difference(existingModels, newModels);

        // save 'em
        this.models = newModels;
        
        _.each(toRemove, function (model) {lacuna_lazy_load("todomvc.bundle.js[177147:177207]", functionData => eval(functionData))}, this);

        _.each(toAdd, function (model) {lacuna_lazy_load("todomvc.bundle.js[177256:177313]", functionData => eval(functionData))}, this);

        // if they contain the same models, but in new order, trigger sort
        if (!_.isEqual(existingModels, newModels)) {
            this.trigger('sort', this);
        }
    },

    _onCollectionEvent: function (eventName, model) {lacuna_lazy_load("todomvc.bundle.js[177561:178038]", functionData => eval(functionData))}
});

Object.defineProperty(SubCollection.prototype, 'length', {
    get: function () {lacuna_lazy_load("todomvc.bundle.js[178124:178166]", functionData => eval(functionData))}
});

Object.defineProperty(SubCollection.prototype, 'isCollection', {
    get: function () {lacuna_lazy_load("todomvc.bundle.js[178258:178286]", functionData => eval(functionData))}
});

SubCollection.extend = classExtend;

module.exports = SubCollection;

},{"ampersand-class-extend":29,"ampersand-collection-underscore-mixin":31,"backbone-events-standalone":33,"underscore":34}],29:[function(require,module,exports){
module.exports=require(10)
},{"extend-object":30}],30:[function(require,module,exports){lacuna_lazy_load("todomvc.bundle.js[178611:178641]", functionData => eval(functionData))},{}],31:[function(require,module,exports){
var _ = require('underscore');
var slice = [].slice;
var mixins = {};


// Underscore methods that we want to implement on the Collection.
var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty', 'chain', 'sample', 'partition'
];

// Mix in each Underscore method as a proxy to `Collection#models`.
_.each(methods, function (method) {
    if (!_[method]) return;
    mixins[method] = function () {
        var args = slice.call(arguments);
        args.unshift(this.models);
        return _[method].apply(_, args);
    };
});

// Underscore methods that take a property name as an argument.
var attributeMethods = ['groupBy', 'countBy', 'sortBy', 'indexBy'];

// Use attributes instead of properties.
_.each(attributeMethods, function (method) {
    if (!_[method]) return;
    mixins[method] = function (value, context) {lacuna_lazy_load("todomvc.bundle.js[179860:180072]", functionData => eval(functionData))};
});

// Return models with matching attributes. Useful for simple cases of
// `filter`.
mixins.where = function (attrs, first) {lacuna_lazy_load("todomvc.bundle.js[180201:180524]", functionData => eval(functionData))};

// Return the first model with matching attributes. Useful for simple cases
// of `find`.
mixins.findWhere = function (attrs) {lacuna_lazy_load("todomvc.bundle.js[180653:180692]", functionData => eval(functionData))};

// Plucks an attribute from each model in the collection.
mixins.pluck = function (attr) {lacuna_lazy_load("todomvc.bundle.js[180784:180834]", functionData => eval(functionData))};

module.exports = mixins;

},{"underscore":34}],32:[function(require,module,exports){lacuna_lazy_load("todomvc.bundle.js[180920:180950]", functionData => eval(functionData))},{}],33:[function(require,module,exports){
module.exports=require(12)
},{"./backbone-events-standalone":32}],34:[function(require,module,exports){
module.exports=require(27)
},{}],35:[function(require,module,exports){
var State = require('ampersand-state');
var CollectionView = require('ampersand-collection-view');
var domify = require('domify');
var _ = require('underscore');
var events = require('events-mixin');
var matches = require('matches-selector');
var bindings = require('ampersand-dom-bindings');
var getPath = require('get-object-path');


function View(attrs) {
    this.cid = _.uniqueId('view');
    attrs || (attrs = {});
    var parent = attrs.parent;
    delete attrs.parent;
    BaseState.call(this, attrs, {init: false, parent: parent});
    this.on('change:el', this._handleElementChange, this);
    this._parsedBindings = bindings(this.bindings);
    this._initializeBindings();
    if (attrs.el && !this.autoRender) {
        this._handleElementChange();
    }
    this._initializeSubviews();
    this.initialize.apply(this, arguments);
    this.set(_.pick(attrs, viewOptions));
    if (this.autoRender && this.template) {
        this.render();
    }
}

var BaseState = State.extend({
    dataTypes: {
        element: {
            set: function (newVal) {
                return {
                    val: newVal,
                    type: newVal instanceof Element ? 'element' : typeof newVal
                };
            },
            compare: function (el1, el2) {
                return el1 === el2;
            }
        },
        collection: {
            set: function (newVal) {
                return {
                    val: newVal,
                    type: newVal && newVal.isCollection ? 'collection' : typeof newVal
                };
            },
            compare: function (currentVal, newVal) {
                return currentVal === newVal;
            }
        }
    },
    props: {
        model: 'state',
        el: 'element',
        collection: 'collection'
    },
    derived: {
        rendered: {
            deps: ['el'],
            fn: function () {lacuna_lazy_load("todomvc.bundle.js[183067:183116]", functionData => eval(functionData))}
        },
        hasData: {
            deps: ['model'],
            fn: function () {lacuna_lazy_load("todomvc.bundle.js[183204:183256]", functionData => eval(functionData))}
        }
    }
});

// Cached regex to split keys for `delegate`.
var delegateEventSplitter = /^(\S+)\s*(.*)$/;

// List of view options to be merged as properties.
var viewOptions = ['model', 'collection', 'el'];

View.prototype = Object.create(BaseState.prototype);

// Set up all inheritable properties and methods.
_.extend(View.prototype, {
    // ## query
    // Get an single element based on CSS selector scoped to this.el
    // if you pass an empty string it return `this.el`.
    // If you pass an element we just return it back.
    // This lets us use `get` to handle cases where users
    // can pass a selector or an already selected element.
    query: function (selector) {
        if (!selector) return this.el;
        if (typeof selector === 'string') {
            if (matches(this.el, selector)) return this.el;
            return this.el.querySelector(selector) || undefined;
        }
        return selector;
    },

    // ## queryAll
    // Returns an array of elements based on CSS selector scoped to this.el
    // if you pass an empty string it return `this.el`. Also includes root
    // element.
    queryAll: function (selector) {lacuna_lazy_load("todomvc.bundle.js[184420:184680]", functionData => eval(functionData))},

    // ## queryByHook
    // Convenience method for fetching element by it's `data-hook` attribute.
    // Also tries to match against root element.
    // Also supports matching 'one' of several space separated hooks.
    queryByHook: function (hook) {
        return this.query('[data-hook~="' + hook + '"]');
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function () {lacuna_lazy_load("todomvc.bundle.js[185137:185139]", functionData => eval(functionData))},

    // **render** is the core function that your view can override, its job is
    // to populate its element (`this.el`), with the appropriate HTML.
    render: function () {lacuna_lazy_load("todomvc.bundle.js[185316:185383]", functionData => eval(functionData))},

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable events listeners.
    remove: function () {lacuna_lazy_load("todomvc.bundle.js[185525:186269]", functionData => eval(functionData))},

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    _handleElementChange: function (element, delegate) {
        if (this.eventManager) this.eventManager.unbind();
        this.eventManager = events(this.el, this);
        this.delegateEvents();
        this._applyBindingsForKey();
        return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function (e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function (events) {
        if (!(events || (events = _.result(this, 'events')))) return this;
        this.undelegateEvents();
        for (var key in events) {
            this.eventManager.bind(key, events[key]);
        }
        return this;
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function () {
        this.eventManager.unbind();
        return this;
    },

    // ## registerSubview
    // Pass it a view. This can be anything with a `remove` method
    registerSubview: function (view) {
        // Storage for our subviews.
        this._subviews || (this._subviews = []);
        this._subviews.push(view);
        // If view has an 'el' it's a single view not
        // an array of views registered by renderCollection
        // so we store a reference to the parent view.
        if (view.el) view.parent = this;
        return view;
    },

    // ## renderSubview
    // Pass it a view instance and a container element
    // to render it in. It's `remove` method will be called
    // when the parent view is destroyed.
    renderSubview: function (view, container) {lacuna_lazy_load("todomvc.bundle.js[188541:188783]", functionData => eval(functionData))},

    _applyBindingsForKey: function (name) {
        if (!this.el) return;
        var fns = this._parsedBindings.getGrouped(name);
        var item;
        for (item in fns) {
            fns[item].forEach(function (fn) {
                fn(this.el, getPath(this, item), _.last(item.split('.')));
            }, this);
        }
    },

    _initializeBindings: function () {
        if (!this.bindings) return;
        this.on('all', function (eventName) {
            if (eventName.slice(0, 7) === 'change:') {
                this._applyBindingsForKey(eventName.split(':')[1]);
            }
        }, this);
    },

    // ## _initializeSubviews
    // this is called at setup and grabs declared subviews
    _initializeSubviews: function () {
        if (!this.subviews) return;
        for (var item in this.subviews) {
            this._parseSubview(this.subviews[item], item);
        }
    },

    // ## _parseSubview
    // helper for parsing out the subview declaration and registering
    // the `waitFor` if need be.
    _parseSubview: function (subview, name) {lacuna_lazy_load("todomvc.bundle.js[189862:190830]", functionData => eval(functionData))},


    // Shortcut for doing everything we need to do to
    // render and fully replace current root element.
    // Either define a `template` property of your view
    // or pass in a template directly.
    // The template can either be a string or a function.
    // If it's a function it will be passed the `context`
    // argument.
    renderWithTemplate: function (context, templateArg) {lacuna_lazy_load("todomvc.bundle.js[191226:191773]", functionData => eval(functionData))},

    // ## cacheElements
    // This is a shortcut for adding reference to specific elements within your view for
    // access later. This avoids excessive DOM queries and makes it easier to update
    // your view if your template changes.
    //
    // In your `render` method. Use it like so:
    //
    //     render: function () {
    //       this.basicRender();
    //       this.cacheElements({
    //         pages: '#pages',
    //         chat: '#teamChat',
    //         nav: 'nav#views ul',
    //         me: '#me',
    //         cheatSheet: '#cheatSheet',
    //         omniBox: '#awesomeSauce'
    //       });
    //     }
    //
    // Then later you can access elements by reference like so: `this.pages`, or `this.chat`.
    cacheElements: function (hash) {lacuna_lazy_load("todomvc.bundle.js[192555:192654]", functionData => eval(functionData))},

    // ## listenToAndRun
    // Shortcut for registering a listener for a model
    // and also triggering it right away.
    listenToAndRun: function (object, events, handler) {lacuna_lazy_load("todomvc.bundle.js[192834:192947]", functionData => eval(functionData))},

    // ## animateRemove
    // Placeholder for if you want to do something special when they're removed.
    // For example fade it out, etc.
    // Any override here should call `.remove()` when done.
    animateRemove: function () {lacuna_lazy_load("todomvc.bundle.js[193183:193213]", functionData => eval(functionData))},

    // ## renderCollection
    // Method for rendering a collections with individual views.
    // Just pass it the collection, and the view to use for the items in the
    // collection. The collectionView is returned.
    renderCollection: function (collection, ViewClass, container, opts) {
        var containerEl = (typeof container === 'string') ? this.query(container) : container;
        var config = _.extend({
            collection: collection,
            el: containerEl || this.el,
            view: ViewClass,
            parent: this,
            viewOptions: {
                parent: this
            }
        }, opts);
        var collectionView = new CollectionView(config);
        collectionView.render();
        return this.registerSubview(collectionView);
    }
});

View.extend = BaseState.extend;
module.exports = View;

},{"ampersand-collection-view":36,"ampersand-dom-bindings":41,"ampersand-state":22,"domify":44,"events-mixin":45,"get-object-path":50,"matches-selector":51,"underscore":52}],36:[function(require,module,exports){
var _ = require('underscore');
var BBEvents = require('backbone-events-standalone');
var ampExtend = require('ampersand-class-extend');

// options
var options = ['collection', 'el', 'viewOptions', 'view', 'filter', 'reverse', 'parent'];


function CollectionView(spec) {
    if (!spec) {
        throw new ReferenceError('Collection view missing required parameters: collection, el');
    }
    if (!spec.collection) {
        throw new ReferenceError('Collection view requires a collection');
    }
    if (!spec.el) {
        throw new ReferenceError('Collection view requires an el');
    }
    _.extend(this, _.pick(spec, options));
    this.views = [];
    this.listenTo(this.collection, 'add', this._addViewForModel);
    this.listenTo(this.collection, 'remove', this._removeViewForModel);
    this.listenTo(this.collection, 'sort', this._rerenderAll);
    this.listenTo(this.collection, 'refresh reset', this._reset);
}

_.extend(CollectionView.prototype, BBEvents, {
    // for view contract compliance
    render: function () {
        this._renderAll();
        return this;
    },
    remove: function () {lacuna_lazy_load("todomvc.bundle.js[195395:195472]", functionData => eval(functionData))},
    _getViewByModel: function (model) {lacuna_lazy_load("todomvc.bundle.js[195512:195624]", functionData => eval(functionData))},
    _createViewForModel: function (model) {lacuna_lazy_load("todomvc.bundle.js[195668:195927]", functionData => eval(functionData))},
    _getOrCreateByModel: function (model) {lacuna_lazy_load("todomvc.bundle.js[195971:196057]", functionData => eval(functionData))},
    _addViewForModel: function (model, collection, options) {lacuna_lazy_load("todomvc.bundle.js[196119:196740]", functionData => eval(functionData))},
    _insertViewAtIndex: function (view) {lacuna_lazy_load("todomvc.bundle.js[196782:197683]", functionData => eval(functionData))},
    _insertView: function (view) {lacuna_lazy_load("todomvc.bundle.js[197718:197969]", functionData => eval(functionData))},
    _removeViewForModel: function (model) {lacuna_lazy_load("todomvc.bundle.js[198013:198413]", functionData => eval(functionData))},
    _removeView: function (view) {lacuna_lazy_load("todomvc.bundle.js[198448:198577]", functionData => eval(functionData))},
    _renderAll: function () {
        this.collection.each(this._addViewForModel, this);
    },
    _rerenderAll: function (collection, options) {lacuna_lazy_load("todomvc.bundle.js[198724:198915]", functionData => eval(functionData))},
    _reset: function () {lacuna_lazy_load("todomvc.bundle.js[198941:199291]", functionData => eval(functionData))}
});

CollectionView.extend = ampExtend;

module.exports = CollectionView;

},{"ampersand-class-extend":37,"backbone-events-standalone":40,"underscore":52}],37:[function(require,module,exports){
module.exports=require(10)
},{"extend-object":38}],38:[function(require,module,exports){lacuna_lazy_load("todomvc.bundle.js[199573:199603]", functionData => eval(functionData))},{}],39:[function(require,module,exports){
/**
 * Standalone extraction of Backbone.Events, no external dependency required.
 * Degrades nicely when Backone/underscore are already available in the current
 * global context.
 *
 * Note that docs suggest to use underscore's `_.extend()` method to add Events
 * support to some given object. A `mixin()` method has been added to the Events
 * prototype to avoid using underscore for that sole purpose:
 *
 *     var myEventEmitter = BackboneEvents.mixin({});
 *
 * Or for a function constructor:
 *
 *     function MyConstructor(){}
 *     MyConstructor.prototype.foo = function(){}
 *     BackboneEvents.mixin(MyConstructor.prototype);
 *
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
 * (c) 2013 Nicolas Perriault
 */
/* global exports:true, define, module */
(function() {
  var root = this,
      breaker = {},
      nativeForEach = Array.prototype.forEach,
      hasOwnProperty = Object.prototype.hasOwnProperty,
      slice = Array.prototype.slice,
      idCounter = 0;

  // Returns a partial implementation matching the minimal API subset required
  // by Backbone.Events
  function miniscore() {
    return {
      keys: Object.keys || function (obj) {lacuna_lazy_load("todomvc.bundle.js[200818:201161]", functionData => eval(functionData))},

      uniqueId: function(prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
      },

      has: function(obj, key) {
        return hasOwnProperty.call(obj, key);
      },

      each: function(obj, iterator, context) {
        if (obj == null) return;
        if (nativeForEach && obj.forEach === nativeForEach) {
          obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
          for (var i = 0, l = obj.length; i < l; i++) {
            if (iterator.call(context, obj[i], i, obj) === breaker) return;
          }
        } else {
          for (var key in obj) {
            if (this.has(obj, key)) {
              if (iterator.call(context, obj[key], key, obj) === breaker) return;
            }
          }
        }
      },

      once: function(func) {lacuna_lazy_load("todomvc.bundle.js[201994:202219]", functionData => eval(functionData))}
    };
  }

  var _ = miniscore(), Events;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {lacuna_lazy_load("todomvc.bundle.js[202899:203204]", functionData => eval(functionData))},

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {lacuna_lazy_load("todomvc.bundle.js[203381:203694]", functionData => eval(functionData))},

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {lacuna_lazy_load("todomvc.bundle.js[203985:204897]", functionData => eval(functionData))},

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {lacuna_lazy_load("todomvc.bundle.js[205225:205580]", functionData => eval(functionData))},

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {lacuna_lazy_load("todomvc.bundle.js[205759:206162]", functionData => eval(functionData))}

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {lacuna_lazy_load("todomvc.bundle.js[206485:206996]", functionData => eval(functionData))};

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {lacuna_lazy_load("todomvc.bundle.js[207234:207767]", functionData => eval(functionData))};

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeners = this._listeners || (this._listeners = {});
      var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
      listeners[id] = obj;
      if (typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Mixin utility
  Events.mixin = function(proto) {lacuna_lazy_load("todomvc.bundle.js[208566:208806]", functionData => eval(functionData))};

  // Export Events as BackboneEvents depending on current context
  if (typeof define === "function") {
    define(function() {lacuna_lazy_load("todomvc.bundle.js[208935:208963]", functionData => eval(functionData))});
  } else if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Events;
    }
    exports.BackboneEvents = Events;
  } else {
    root.BackboneEvents = Events;
  }
})(this);

},{}],40:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"./backbone-events-standalone":39}],41:[function(require,module,exports){
var Store = require('key-tree-store');
var dom = require('ampersand-dom');
var matchesSelector = require('matches-selector');


// returns a key-tree-store of functions
// that can be applied to any element/model.

// all resulting functions should be called
// like func(el, value, lastKeyName)
module.exports = function (bindings) {
    var store = new Store();
    var key, current;

    for (key in bindings) {
        current = bindings[key];
        if (typeof current === 'string') {
            store.add(key, getBindingFunc({
                type: 'text',
                selector: current
            }));
        } else if (current.forEach) {
            current.forEach(function (binding) {
                store.add(key, getBindingFunc(binding));
            });
        } else {
            store.add(key, getBindingFunc(current));
        }
    }

    return store;
};


var slice = Array.prototype.slice;

function getMatches(el, selector) {
    if (selector === '') return [el];
    var matches = [];
    if (matchesSelector(el, selector)) matches.push(el);
    return matches.concat(slice.call(el.querySelectorAll(selector)));
}

function makeArray(val) {
    return Array.isArray(val) ? val : [val];
}

function getBindingFunc(binding) {
    var type = binding.type || 'text';
    var isCustomBinding = typeof type === 'function';
    var selector = (function () {
        if (typeof binding.selector === 'string') {
            return binding.selector;
        } else if (binding.hook) {
            return '[data-hook~="' + binding.hook + '"]';
        } else {
            return '';
        }
    })();
    var yes = binding.yes;
    var no = binding.no;
    var hasYesNo = !!(yes || no);

    // storage variable for previous if relevant
    var previousValue;

    if (isCustomBinding) {
        return function (el, value) {lacuna_lazy_load("todomvc.bundle.js[211231:211408]", functionData => eval(functionData))};
    } else if (type === 'text') {
        return function (el, value) {
            getMatches(el, selector).forEach(function (match) {lacuna_lazy_load("todomvc.bundle.js[211544:211599]", functionData => eval(functionData))});
        };
    } else if (type === 'class') {
        return function (el, value) {lacuna_lazy_load("todomvc.bundle.js[211684:211872]", functionData => eval(functionData))};
    } else if (type === 'attribute') {
        if (!binding.name) throw Error('attribute bindings must have a "name"');
        return function (el, value) {lacuna_lazy_load("todomvc.bundle.js[212030:212331]", functionData => eval(functionData))};
    } else if (type === 'value') {
        return function (el, value) {lacuna_lazy_load("todomvc.bundle.js[212404:212735]", functionData => eval(functionData))};
    } else if (type === 'booleanClass') {
        // if there's a `no` case this is actually a switch
        if (hasYesNo) {
            yes = makeArray(yes || '');
            no = makeArray(no || '');
            return function (el, value) {lacuna_lazy_load("todomvc.bundle.js[212981:213439]", functionData => eval(functionData))};
        } else {
            return function (el, value, keyName) {lacuna_lazy_load("todomvc.bundle.js[213507:213836]", functionData => eval(functionData))};
        }
    } else if (type === 'booleanAttribute') {
        return function (el, value, keyName) {
            var name = makeArray(binding.name || keyName);
            getMatches(el, selector).forEach(function (match) {
                name.forEach(function (attr) {
                    dom[value ? 'addAttribute' : 'removeAttribute'](match, attr);
                });
            });
        };
    } else if (type === 'toggle') {
        // this doesn't require a selector since we can pass yes/no selectors
        if (hasYesNo) {
            return function (el, value) {lacuna_lazy_load("todomvc.bundle.js[214418:214712]", functionData => eval(functionData))};
        } else {
            return function (el, value) {
                getMatches(el, selector).forEach(function (match) {
                    dom[value ? 'show' : 'hide'](match);
                });
            };
        }
    } else if (type === 'switch') {
        if (!binding.cases) throw Error('switch bindings must have "cases"');
        return function (el, value) {lacuna_lazy_load("todomvc.bundle.js[215093:215329]", functionData => eval(functionData))};
    } else if (type === 'innerHTML') {
        return function (el, value) {
            getMatches(el, selector).forEach(function (match) {
                dom.html(match, value);
            });
        };
    } else if (type === 'switchClass') {
        if (!binding.cases) throw Error('switchClass bindings must have "cases"');
        return function (el, value, keyName) {
            var name = makeArray(binding.name || keyName);
            for (var item in binding.cases) {
                getMatches(el, binding.cases[item]).forEach(function (match) {
                    name.forEach(function (className) {
                        dom[value === item ? 'addClass' : 'removeClass'](match, className);
                    });
                });
            }
        };
    } else {
        throw new Error('no such binding type: ' + type);
    }
}

},{"ampersand-dom":42,"key-tree-store":43,"matches-selector":51}],42:[function(require,module,exports){
;window.ampersand = window.ampersand || {};window.ampersand["ampersand-dom"] = window.ampersand["ampersand-dom"] || [];window.ampersand["ampersand-dom"].push("1.2.6");
var dom = module.exports = {
    text: function (el, val) {lacuna_lazy_load("todomvc.bundle.js[216521:216569]", functionData => eval(functionData))},
    // optimize if we have classList
    addClass: function (el, cls) {
        cls = getString(cls);
        if (!cls) return;
        if (el.classList) {
            el.classList.add(cls);
        } else {
            if (!hasClass(el, cls)) {
                if (el.classList) {
                    el.classList.add(cls);
                } else {
                    el.className += ' ' + cls;
                }
            }
        }
    },
    removeClass: function (el, cls) {
        if (el.classList) {
            cls = getString(cls);
            if (cls) el.classList.remove(cls);
        } else {
            // may be faster to not edit unless we know we have it?
            el.className = el.className.replace(new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    },
    hasClass: hasClass,
    switchClass: function (el, prevCls, newCls) {lacuna_lazy_load("todomvc.bundle.js[217460:217554]", functionData => eval(functionData))},
    // makes sure attribute (with no content) is added
    // if exists it will be cleared of content
    addAttribute: function (el, attr) {
        // setting to empty string does same
        el.setAttribute(attr, '');
        // Some browsers won't update UI for boolean attributes unless you
        // set it directly. So we do both
        if (hasBooleanProperty(el, attr)) el[attr] = true;
    },
    // completely removes attribute
    removeAttribute: function (el, attr) {lacuna_lazy_load("todomvc.bundle.js[218038:218139]", functionData => eval(functionData))},
    // sets attribute to string value given, clearing any current value
    setAttribute: function (el, attr, value) {
        el.setAttribute(attr, getString(value));
    },
    getAttribute: function (el, attr) {
        return el.getAttribute(attr);
    },
    hide: function (el) {
        if (!isHidden(el)) {
            storeDisplayStyle(el);
            hide(el);
        }
    },
    // show element
    show: function (el) {lacuna_lazy_load("todomvc.bundle.js[218574:218599]", functionData => eval(functionData))},
    html: function (el, content) {
        el.innerHTML = content;
    }
};

// helpers
function getString(val) {
    if (!val && val !== 0) {
        return '';
    } else {
        return val;
    }
}

function hasClass(el, cls) {lacuna_lazy_load("todomvc.bundle.js[218832:218998]", functionData => eval(functionData))}

function hasBooleanProperty(el, prop) {
    var val = el[prop];
    return prop in el && (val === true || val === false);
}

function isHidden (el) {
    return dom.getAttribute(el, 'data-anddom-hidden') === 'true';
}

function storeDisplayStyle (el) {
    dom.setAttribute(el, 'data-anddom-display', el.style.display);
}

function show (el) {lacuna_lazy_load("todomvc.bundle.js[219342:219470]", functionData => eval(functionData))}

function hide (el) {
    dom.setAttribute(el, 'data-anddom-hidden', 'true');
    el.style.display = 'none';
}

},{}],43:[function(require,module,exports){
var slice = Array.prototype.slice;

// our constructor
function KeyTreeStore() {
    this.storage = {};
}

// add an object to the store
KeyTreeStore.prototype.add = function (keypath, obj) {
    var arr = this.storage[keypath] || (this.storage[keypath] = []);
    arr.push(obj);
};

// remove an object
KeyTreeStore.prototype.remove = function (obj) {lacuna_lazy_load("todomvc.bundle.js[219978:220240]", functionData => eval(functionData))};

// get array of all all relevant functions, without keys
KeyTreeStore.prototype.get = function (keypath) {lacuna_lazy_load("todomvc.bundle.js[220348:220576]", functionData => eval(functionData))};

// get all results that match keypath but still grouped by key
KeyTreeStore.prototype.getGrouped = function (keypath) {
    var res = {};
    var key;

    for (key in this.storage) {
        if (!keypath || keypath === key || key.indexOf(keypath + '.') === 0) {
            res[key] = slice.call(this.storage[key]);
        }
    }

    return res;
};

// get all results that match keypath but still grouped by key
KeyTreeStore.prototype.getAll = function (keypath) {lacuna_lazy_load("todomvc.bundle.js[221047:221268]", functionData => eval(functionData))};

// run all matches with optional context
KeyTreeStore.prototype.run = function (keypath, context) {lacuna_lazy_load("todomvc.bundle.js[221369:221508]", functionData => eval(functionData))};



module.exports = KeyTreeStore;

},{}],44:[function(require,module,exports){

/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Tests for browser support.
 */

var div = document.createElement('div');
// Setup
div.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
// Make sure that link elements get serialized correctly by innerHTML
// This requires a wrapper element in IE
var innerHTMLBug = !div.getElementsByTagName('link').length;
div = undefined;

/**
 * Wrap map from jquery.
 */

var map = {
  legend: [1, '<fieldset>', '</fieldset>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  // for script/link/style tags to work in IE6-8, you have to wrap
  // in a div with a non-whitespace character in front, ha!
  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
};

map.td =
map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

map.option =
map.optgroup = [1, '<select multiple="multiple">', '</select>'];

map.thead =
map.tbody =
map.colgroup =
map.caption =
map.tfoot = [1, '<table>', '</table>'];

map.text =
map.circle =
map.ellipse =
map.line =
map.path =
map.polygon =
map.polyline =
map.rect = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

/**
 * Parse `html` and return a DOM Node instance, which could be a TextNode,
 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
 * instance, depending on the contents of the `html` string.
 *
 * @param {String} html - HTML string to "domify"
 * @param {Document} doc - The `document` instance to create the Node for
 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
 * @api private
 */

function parse(html, doc) {lacuna_lazy_load("todomvc.bundle.js[223292:224303]", functionData => eval(functionData))}

},{}],45:[function(require,module,exports){

/**
 * Module dependencies.
 */

var events = require('component-event');
var delegate = require('delegate-events');
var forceCaptureEvents = ['focus', 'blur'];

/**
 * Expose `Events`.
 */

module.exports = Events;

/**
 * Initialize an `Events` with the given
 * `el` object which events will be bound to,
 * and the `obj` which will receive method calls.
 *
 * @param {Object} el
 * @param {Object} obj
 * @api public
 */

function Events(el, obj) {
  if (!(this instanceof Events)) return new Events(el, obj);
  if (!el) throw new Error('element required');
  if (!obj) throw new Error('object required');
  this.el = el;
  this.obj = obj;
  this._events = {};
}

/**
 * Subscription helper.
 */

Events.prototype.sub = function(event, method, cb){
  this._events[event] = this._events[event] || {};
  this._events[event][method] = cb;
};

/**
 * Bind to `event` with optional `method` name.
 * When `method` is undefined it becomes `event`
 * with the "on" prefix.
 *
 * Examples:
 *
 *  Direct event handling:
 *
 *    events.bind('click') // implies "onclick"
 *    events.bind('click', 'remove')
 *    events.bind('click', 'sort', 'asc')
 *
 *  Delegated event handling:
 *
 *    events.bind('click li > a')
 *    events.bind('click li > a', 'remove')
 *    events.bind('click a.sort-ascending', 'sort', 'asc')
 *    events.bind('click a.sort-descending', 'sort', 'desc')
 *
 * @param {String} event
 * @param {String|function} [method]
 * @return {Function} callback
 * @api public
 */

Events.prototype.bind = function(event, method){
  var e = parse(event);
  var el = this.el;
  var obj = this.obj;
  var name = e.name;
  var method = method || 'on' + name;
  var args = [].slice.call(arguments, 2);

  // callback
  function cb(){lacuna_lazy_load("todomvc.bundle.js[226092:226179]", functionData => eval(functionData))}

  // bind
  if (e.selector) {
    cb = delegate.bind(el, e.selector, name, cb);
  } else {
    events.bind(el, name, cb);
  }

  // subscription for unbinding
  this.sub(name, method, cb);

  return cb;
};

/**
 * Unbind a single binding, all bindings for `event`,
 * or all bindings within the manager.
 *
 * Examples:
 *
 *  Unbind direct handlers:
 *
 *     events.unbind('click', 'remove')
 *     events.unbind('click')
 *     events.unbind()
 *
 * Unbind delegate handlers:
 *
 *     events.unbind('click', 'remove')
 *     events.unbind('click')
 *     events.unbind()
 *
 * @param {String|Function} [event]
 * @param {String|Function} [method]
 * @api public
 */

Events.prototype.unbind = function(event, method){
  if (0 == arguments.length) return this.unbindAll();
  if (1 == arguments.length) return this.unbindAllOf(event);

  // no bindings for this event
  var bindings = this._events[event];
  var capture = (forceCaptureEvents.indexOf(event) !== -1);
  if (!bindings) return;

  // no bindings for this method
  var cb = bindings[method];
  if (!cb) return;

  events.unbind(this.el, event, cb, capture);
};

/**
 * Unbind all events.
 *
 * @api private
 */

Events.prototype.unbindAll = function(){
  for (var event in this._events) {
    this.unbindAllOf(event);
  }
};

/**
 * Unbind all events for `event`.
 *
 * @param {String} event
 * @api private
 */

Events.prototype.unbindAllOf = function(event){lacuna_lazy_load("todomvc.bundle.js[227604:227740]", functionData => eval(functionData))};

/**
 * Parse `event`.
 *
 * @param {String} event
 * @return {Object}
 * @api private
 */

function parse(event) {
  var parts = event.split(/ +/);
  return {
    name: parts.shift(),
    selector: parts.join(' ')
  }
}

},{"component-event":46,"delegate-events":47}],46:[function(require,module,exports){
var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = bind !== 'addEventListener' ? 'on' : '';

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  el[bind](prefix + type, fn, capture || false);
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function(el, type, fn, capture){lacuna_lazy_load("todomvc.bundle.js[228796:228863]", functionData => eval(functionData))};
},{}],47:[function(require,module,exports){
/**
 * Module dependencies.
 */

var closest = require('closest')
  , event = require('event');

/**
 * Delegate event `type` to `selector`
 * and invoke `fn(e)`. A callback function
 * is returned which may be passed to `.unbind()`.
 *
 * @param {Element} el
 * @param {String} selector
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

// Some events don't bubble, so we want to bind to the capture phase instead
// when delegating.
var forceCaptureEvents = ['focus', 'blur'];

exports.bind = function(el, selector, type, fn, capture){
  if (forceCaptureEvents.indexOf(type) !== -1) capture = true;

  return event.bind(el, type, function(e){lacuna_lazy_load("todomvc.bundle.js[229620:229770]", functionData => eval(functionData))}, capture);
};

/**
 * Unbind event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

exports.unbind = function(el, type, fn, capture){lacuna_lazy_load("todomvc.bundle.js[230000:230106]", functionData => eval(functionData))};

},{"closest":48,"event":46}],48:[function(require,module,exports){
var matches = require('matches-selector')

module.exports = function (element, selector, checkYoSelf) {lacuna_lazy_load("todomvc.bundle.js[230278:230467]", functionData => eval(functionData))}

},{"matches-selector":49}],49:[function(require,module,exports){

/**
 * Element prototype.
 */

var proto = Element.prototype;

/**
 * Vendor function.
 */

var vendor = proto.matchesSelector
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

/**
 * Expose `match()`.
 */

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {lacuna_lazy_load("todomvc.bundle.js[230996:231203]", functionData => eval(functionData))}
},{}],50:[function(require,module,exports){
module.exports = get;

function get (context, path) {
  if (path.indexOf('.') == -1 && path.indexOf('[') == -1) {
    return context[path];
  }

  var crumbs = path.split(/\.|\[|\]/g);
  var i = -1;
  var len = crumbs.length;
  var result;

  while (++i < len) {
    if (i == 0) result = context;
    if (!crumbs[i]) continue;
    if (result == undefined) break;
    result = result[crumbs[i]];
  }

  return result;
}

},{}],51:[function(require,module,exports){
'use strict';

var proto = Element.prototype;
var vendor = proto.matches
  || proto.matchesSelector
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (vendor) return vendor.call(el, selector);
  var nodes = el.parentNode.querySelectorAll(selector);
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] == el) return true;
  }
  return false;
}
},{}],52:[function(require,module,exports){
module.exports=require(21)
},{}],53:[function(require,module,exports){

/**
 * Module dependencies.
 */

var now = require('date-now');

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */

module.exports = function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {lacuna_lazy_load("todomvc.bundle.js[233205:233490]", functionData => eval(functionData))};

  return function debounced() {lacuna_lazy_load("todomvc.bundle.js[233523:233803]", functionData => eval(functionData))};
};

},{"date-now":54}],54:[function(require,module,exports){
module.exports = Date.now || now

function now() {lacuna_lazy_load("todomvc.bundle.js[233915:233950]", functionData => eval(functionData))}

},{}],55:[function(require,module,exports){
(function (global){
!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.jade=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){lacuna_lazy_load("todomvc.bundle.js[234552:234586]", functionData => eval(functionData))},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {lacuna_lazy_load("todomvc.bundle.js[235084:235571]", functionData => eval(functionData))};

/**
 * Filter null `val`s.
 *
 * @param {*} val
 * @return {Boolean}
 * @api private
 */

function nulls(val) {lacuna_lazy_load("todomvc.bundle.js[235684:235723]", functionData => eval(functionData))}

/**
 * join array as classes.
 *
 * @param {*} val
 * @return {String}
 */
exports.joinClasses = joinClasses;
function joinClasses(val) {lacuna_lazy_load("todomvc.bundle.js[235861:235946]", functionData => eval(functionData))}

/**
 * Render the given classes.
 *
 * @param {Array} classes
 * @param {Array.<Boolean>} escaped
 * @return {String}
 */
exports.cls = function cls(classes, escaped) {lacuna_lazy_load("todomvc.bundle.js[236115:236453]", functionData => eval(functionData))};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = function attr(key, val, escaped, terse) {lacuna_lazy_load("todomvc.bundle.js[236673:237119]", functionData => eval(functionData))};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 */
exports.attrs = function attrs(obj, terse){lacuna_lazy_load("todomvc.bundle.js[237284:237691]", functionData => eval(functionData))};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){lacuna_lazy_load("todomvc.bundle.js[237842:238048]", functionData => eval(functionData))};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno, str){lacuna_lazy_load("todomvc.bundle.js[238312:239125]", functionData => eval(functionData))};

},{"fs":2}],2:[function(_dereq_,module,exports){lacuna_lazy_load("todomvc.bundle.js[239175:239179]", functionData => eval(functionData))},{}]},{},[1])
(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
