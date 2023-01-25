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
var input = require('./uis/input');
var list = require('./uis/list');
var controls = require('./uis/controls');

var LocalStore = require('olives').LocalStore;
var Store = require('emily').Store;

// The tasks Store is told to init on an array
// so tasks are indexed by a number
// This store is shared among several UIs of this application
// that's why it's created here
var tasks = new LocalStore([]);

// Also create a shared stats store
var stats = new Store({
	nbItems: 0,
	nbLeft: 0,
	nbCompleted: 0,
	plural: 'items'
});

// Synchronize the store on 'todos-olives' localStorage
tasks.sync('todos-olives');

// Initialize Input UI by giving it a view and a model.
input(document.querySelector('#header input'), tasks);

// Init the List UI the same way, pass it the stats store too
list(document.querySelector('#main'), tasks, stats);

// Same goes for the control UI
controls(document.querySelector('#footer'), tasks, stats);

},{"./uis/controls":6,"./uis/input":7,"./uis/list":8,"emily":13,"olives":35}],2:[function(require,module,exports){
'use strict';

var tools = require('./tools');

var routes = {
    '#/': 'show-all',
    '#/completed': 'show-completed',
    '#/active': 'show-active'
};

/**
 * A quick plugin to interface with a url-highway router.
 * @param {url highway} the router's instance
 * @constructor
 */
module.exports = function RouterPlugin(router) {
    var currentRoute = router.getLastRoute();

    /**
     * Set a given className to a dom element if its hash matches with the url's hash
     * @param link
     * @param className
     */
    this.isLinkActive = function isLinkActive(link, className) {
        if (router.getLastRoute() === link.hash) {
            link.classList.add(className);
        }

        router.watch(function (route) {lacuna_lazy_load("olives-todo.js[2279:2364]", functionData => eval(functionData))});
    };

    this.toggleClassOnRouteChange = function toggleClassOnRouteChange(list) {
        router.watch(function (route) {
            list.classList.remove(routes[currentRoute]);
            list.classList.add(routes[route]);
            currentRoute = route;
        });
    };

    router.start('#/');
};

},{"./tools":5}],3:[function(require,module,exports){
'use strict';

var UrlHighway = require('url-highway');

var urlHighway = new UrlHighway();

urlHighway.parse = function (hash) {lacuna_lazy_load("olives-todo.js[2861:2885]", functionData => eval(functionData))};

module.exports = urlHighway;

},{"url-highway":54}],4:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"./tools":5,"dup":2}],5:[function(require,module,exports){
'use strict';

/*
 * A set of commonly used functions.
 * They're useful for several UIs in the app.
 * They could also be reused in other projects
 */
module.exports = {
	// className is set to the 'this' dom node according to the value's truthiness
	toggleClass: function (value, className) {
		if (value) {
			this.classList.add(className);
		} else {
			this.classList.remove(className);
		}
	}
};

},{}],6:[function(require,module,exports){
'use strict';
var OObject = require('olives').OObject;
var EventPlugin = require('olives')['Event.plugin'];
var BindPlugin = require('olives')['Bind.plugin'];
var tools = require('../lib/tools');
var router = require('../lib/router');
var RouterPlugin = require('../lib/RouterPlugin');

module.exports = function controlsInit(view, model, stats) {
	// The OObject (the controller) inits with a default model which is a simple store
	// But it can be init'ed with any other store, like the LocalStore
	var controls = new OObject(model);

	// A function to get the completed tasks
	function getCompleted() {
		var completed = [];
		model.loop(function (value, id) {lacuna_lazy_load("olives-todo.js[4191:4251]", functionData => eval(functionData))});
		return completed;
	}

	// Update all stats
	function updateStats() {
		var nbCompleted = getCompleted().length;

		stats.set('nbItems', model.count());
		stats.set('nbLeft', stats.get('nbItems') - nbCompleted);
		stats.set('nbCompleted', nbCompleted);
		stats.set('plural', stats.get('nbLeft') === 1 ? 'item' : 'items');
	}

	// Add plugins to the UI.
	controls.seam.addAll({
		event: new EventPlugin(controls),
		router: new RouterPlugin(router),
		stats: new BindPlugin(stats, {
			toggleClass: tools.toggleClass
		})
	});

	// Alive applies the plugins to the HTML view
	controls.alive(view);

	// Delete all tasks
	controls.delAll = function delAll() {lacuna_lazy_load("olives-todo.js[4911:4947]", functionData => eval(functionData))};

	// Update stats when the tasks list is modified
	model.watch('added', updateStats);
	model.watch('deleted', updateStats);
	model.watch('updated', updateStats);

	// I could either update stats at init or save them in a localStore
	updateStats();
};

},{"../lib/RouterPlugin":2,"../lib/router":3,"../lib/tools":5,"olives":35}],7:[function(require,module,exports){
'use strict';
var OObject = require('olives').OObject;
var EventPlugin = require('olives')['Event.plugin'];

// It returns an init function
module.exports = function inputInit(view, model) {
	// The OObject (the controller) inits with a default model which is a simple store
	// But it can be init'ed with any other store, like the LocalStore
	var input = new OObject(model);
	var ENTER_KEY = 13;

	// The event plugin that is added to the OObject
	// We have to tell it where to find the methods
	input.seam.add('event', new EventPlugin(input));

	// The method to add a new taks
	input.addTask = function addTask(event, node) {lacuna_lazy_load("olives-todo.js[5942:6111]", functionData => eval(functionData))};

	// Alive applies the plugins to the HTML view
	input.alive(view);
};

},{"olives":35}],8:[function(require,module,exports){
'use strict';
var OObject = require('olives').OObject;
var EventPlugin = require('olives')['Event.plugin'];
var BindPlugin = require('olives')['Bind.plugin'];
var tools = require('../lib/tools');
var router = require('../lib/router');
var RouterPlugin = require('../lib/routerPlugin');

module.exports = function listInit(view, model, stats) {
	// The OObject (the controller) initializes with a default model which is a simple store
	// But it can be initialized with any other store, like the LocalStore
	var list = new OObject(model);
	var modelPlugin = new BindPlugin(model, {
		toggleClass: tools.toggleClass
	});
	var ENTER_KEY = 13;
	var ESC_KEY = 27;

	// The plugins
	list.seam.addAll({
		event: new EventPlugin(list),
		model: modelPlugin,
		router: new RouterPlugin(router),
		stats: new BindPlugin(stats, {
			toggleClass: tools.toggleClass,
			toggleCheck: function (value) {
				this.checked = model.count() === value ? 'on' : '';
			}
		})
	});

	// Remove the completed task
	list.remove = function remove(event, node) {lacuna_lazy_load("olives-todo.js[7274:7327]", functionData => eval(functionData))};

	// Un/check all tasks
	list.toggleAll = function toggleAll(event, node) {lacuna_lazy_load("olives-todo.js[7403:7533]", functionData => eval(functionData))};

	// Enter edit mode
	list.startEdit = function startEdit(event, node) {lacuna_lazy_load("olives-todo.js[7606:7742]", functionData => eval(functionData))};

	// Leave edit mode
	list.stopEdit = function stopEdit(event, node) {lacuna_lazy_load("olives-todo.js[7813:8494]", functionData => eval(functionData))};

	// Alive applies the plugins to the HTML view
	list.alive(view);

	function toggleEditing(taskId, bool) {lacuna_lazy_load("olives-todo.js[8602:8699]", functionData => eval(functionData))}

	function getElementByModelId(selector, taskId) {lacuna_lazy_load("olives-todo.js[8749:8829]", functionData => eval(functionData))}
};

},{"../lib/router":3,"../lib/routerPlugin":4,"../lib/tools":5,"olives":35}],9:[function(require,module,exports){
// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// when used in node, this will actually load the util module we depend on
// versus loading the builtin util module as happens otherwise
// this is a bug in node module loading as far as I am concerned
var util = require('util/');

var pSlice = Array.prototype.slice;
var hasOwn = Object.prototype.hasOwnProperty;

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

assert.AssertionError = function AssertionError(options) {lacuna_lazy_load("olives-todo.js[10996:12016]", functionData => eval(functionData))};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function replacer(key, value) {lacuna_lazy_load("olives-todo.js[12137:12388]", functionData => eval(functionData))}

function truncate(s, n) {lacuna_lazy_load("olives-todo.js[12414:12517]", functionData => eval(functionData))}

function getMessage(self) {lacuna_lazy_load("olives-todo.js[12545:12714]", functionData => eval(functionData))}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {lacuna_lazy_load("olives-todo.js[13283:13461]", functionData => eval(functionData))}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {lacuna_lazy_load("olives-todo.js[14126:14208]", functionData => eval(functionData))};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {lacuna_lazy_load("olives-todo.js[14411:14506]", functionData => eval(functionData))};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {lacuna_lazy_load("olives-todo.js[14691:14805]", functionData => eval(functionData))};

function _deepEqual(actual, expected) {lacuna_lazy_load("olives-todo.js[14846:16697]", functionData => eval(functionData))}

function isArguments(object) {lacuna_lazy_load("olives-todo.js[16728:16804]", functionData => eval(functionData))}

function objEquiv(a, b) {lacuna_lazy_load("olives-todo.js[16830:17989]", functionData => eval(functionData))}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {lacuna_lazy_load("olives-todo.js[18185:18304]", functionData => eval(functionData))};

// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {lacuna_lazy_load("olives-todo.js[18512:18612]", functionData => eval(functionData))};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {lacuna_lazy_load("olives-todo.js[18841:18944]", functionData => eval(functionData))};

function expectedException(actual, expected) {lacuna_lazy_load("olives-todo.js[18992:19302]", functionData => eval(functionData))}

function _throws(shouldThrow, block, expected, message) {lacuna_lazy_load("olives-todo.js[19360:20019]", functionData => eval(functionData))}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {lacuna_lazy_load("olives-todo.js[20178:20243]", functionData => eval(functionData))};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/message) {lacuna_lazy_load("olives-todo.js[20366:20432]", functionData => eval(functionData))};

assert.ifError = function(err) {lacuna_lazy_load("olives-todo.js[20466:20490]", functionData => eval(functionData))};

var objectKeys = Object.keys || function (obj) {lacuna_lazy_load("olives-todo.js[20540:20651]", functionData => eval(functionData))};

},{"util/":57}],10:[function(require,module,exports){
/**
* @license compare-numbers https://github.com/cosmosio/compare-numbers
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
 */
"use strict";

/**
 * Compares two numbers and tells if the first one is bigger (1), smaller (-1) or equal (0)
 * @param {Number} number1 the first number
 * @param {Number} number2 the second number
 * @returns 1 if number1>number2, -1 if number2>number1, 0 if equal
 */
function compareNumbers(number1, number2) {lacuna_lazy_load("olives-todo.js[21191:21342]", functionData => eval(functionData))}

module.exports = {

  /**
   * Compares two numbers and tells if the first one is bigger (1), smaller (-1) or equal (0)
   * @param {Number} number1 the first number
   * @param {Number} number2 the second number
   * @returns 1 if number1 > number2, -1 if number2 > number1, 0 if equal
   */
    "asc": compareNumbers,

    /**
     * Compares two numbers and tells if the first one is bigger (1), smaller (-1) or equal (0)
     * @param {Number} number1 the first number
     * @param {Number} number2 the second number
     * @returns 1 if number2 > number1, -1 if number1 > number2, 0 if equal
     */
    "desc": function desc(number1, number2) {lacuna_lazy_load("olives-todo.js[21994:22048]", functionData => eval(functionData))}
};

},{}],11:[function(require,module,exports){
/**
* @license data-binding-plugin https://github.com/flams/data-binding-plugin
*
* The MIT License (MIT)
*
* Copyright (c) 2014-2015 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

var Observable = require("watch-notify"),
    compareNumbers = require("compare-numbers"),
    simpleLoop = require("simple-loop"),
    toArray = require("to-array"),
    getClosest = require("get-closest"),
    nestedProperty = require("nested-property"),
    getNodes = require("get-nodes"),
    getDataset =  require("get-dataset");

function setAttribute(node, property, value) {
    if ('ownerSVGElement' in node) {
        node.setAttribute(property, value);
        return true;
    } else if ('ownerDocument' in node) {
        node[property] = value;
        return true;
    } else {
        throw new Error("invalid element type");
    }
}

/**
 * @class
 * This plugin links dom nodes to a model
 */
module.exports = function BindPluginConstructor($model, $bindings) {

    /**
     * The model to watch
     * @private
     */
    var _model = null,

    /**
     * The list of custom bindings
     * @private
     */
    _bindings = {},

    /**
     * The list of itemRenderers
     * each foreach has its itemRenderer
     * @private
     */
    _itemRenderers = {},

    /**
     * The observers handlers
     * @private
     */
    _observers = {};

    /**
     * Exposed for debugging purpose
     * @private
     */
    this.observers = _observers;

    function _removeObserversForId(id) {lacuna_lazy_load("olives-todo.js[23596:23796]", functionData => eval(functionData))}

    /**
     * Define the model to watch for
     * @param {Store} model the model to watch for changes
     * @returns {Boolean} true if the model was set
     */
    this.setModel = function setModel(model) {
        _model = model;
    };

    /**
     * Get the store that is watched for
     * for debugging only
     * @private
     * @returns the Store
     */
    this.getModel = function getModel() {lacuna_lazy_load("olives-todo.js[24206:24236]", functionData => eval(functionData))};

    /**
     * The item renderer defines a dom node that can be duplicated
     * It is made available for debugging purpose, don't use it
     * @private
     */
    this.ItemRenderer = function ItemRenderer($plugins, $rootNode) {

        /**
         * The node that will be cloned
         * @private
         */
        var _node = null,

        /**
         * The object that contains plugins.name and plugins.apply
         * @private
         */
        _plugins = null,

        /**
         * The _rootNode where to append the created items
         * @private
         */
        _rootNode = null,

        /**
         * The lower boundary
         * @private
         */
        _start = null,

        /**
         * The number of item to display
         * @private
         */
        _nb = null;

        /**
         * Set the duplicated node
         * @private
         */
        this.setRenderer = function setRenderer(node) {
            _node = node;
            return true;
        };

        /**
         * Returns the node that is going to be used for rendering
         * @private
         * @returns the node that is duplicated
         */
        this.getRenderer = function getRenderer() {lacuna_lazy_load("olives-todo.js[25461:25498]", functionData => eval(functionData))};

        /**
         * Sets the rootNode and gets the node to copy
         * @private
         * @param {HTMLElement|SVGElement} rootNode
         * @returns
         */
        this.setRootNode = function setRootNode(rootNode) {
            var renderer;
            _rootNode = rootNode;
            renderer = _rootNode.querySelector("*");
            this.setRenderer(renderer);
            if (renderer) {
                _rootNode.removeChild(renderer);
            }
        };

        /**
         * Gets the rootNode
         * @private
         * @returns _rootNode
         */
        this.getRootNode = function getRootNode() {lacuna_lazy_load("olives-todo.js[26141:26182]", functionData => eval(functionData))};

        /**
         * Set the plugins objet that contains the name and the apply function
         * @private
         * @param plugins
         * @returns true
         */
        this.setPlugins = function setPlugins(plugins) {
            _plugins = plugins;
            return true;
        };

        /**
         * Get the plugins object
         * @private
         * @returns the plugins object
         */
        this.getPlugins = function getPlugins() {lacuna_lazy_load("olives-todo.js[26650:26690]", functionData => eval(functionData))};

        /**
         * The nodes created from the items are stored here
         * @private
         */
        this.items = {};

        /**
         * Set the start limit
         * @private
         * @param {Number} start the value to start rendering the items from
         * @returns the value
         */
        this.setStart = function setStart(start) {
            _start = parseInt(start, 10);
            return _start;
        };

        /**
         * Get the start value
         * @private
         * @returns the start value
         */
        this.getStart = function getStart() {lacuna_lazy_load("olives-todo.js[27292:27330]", functionData => eval(functionData))};

        /**
         * Set the number of item to display
         * @private
         * @param {Number/String} nb the number of item to display or "*" for all
         * @returns the value
         */
        this.setNb = function setNb(nb) {
            _nb = nb == "*" ? nb : parseInt(nb, 10);
            return _nb;
        };

        /**
         * Get the number of item to display
         * @private
         * @returns the value
         */
        this.getNb = function getNb() {lacuna_lazy_load("olives-todo.js[27822:27857]", functionData => eval(functionData))};

        /**
         * Adds a new item and adds it in the items list
         * @private
         * @param {Number} id the id of the item
         * @returns
         */
        this.addItem = function addItem(id) {lacuna_lazy_load("olives-todo.js[28074:28799]", functionData => eval(functionData))};

        /**
         * Get the next item in the item store given an id.
         * @private
         * @param {Number} id the id to start from
         * @returns
         */
        this.getNextItem = function getNextItem(id) {lacuna_lazy_load("olives-todo.js[29029:29460]", functionData => eval(functionData))};

        /**
         * Remove an item from the dom and the items list
         * @private
         * @param {Number} id the id of the item to remove
         * @returns
         */
        this.removeItem = function removeItem(id) {lacuna_lazy_load("olives-todo.js[29694:29989]", functionData => eval(functionData))};

        /**
         * create a new node. Actually makes a clone of the initial one
         * and adds pluginname_id to each node, then calls plugins.apply to apply all plugins
         * @private
         * @param id
         * @param pluginName
         * @returns the associated node
         */
        this.create = function create(id) {lacuna_lazy_load("olives-todo.js[30334:30759]", functionData => eval(functionData))};

        /**
         * Renders the dom tree, adds nodes that are in the boundaries
         * and removes the others
         * @private
         * @returns true boundaries are set
         */
        this.render = function render() {
            // If the number of items to render is all (*)
            // Then get the number of items
            var _tmpNb = _nb == "*" ? _model.count() : _nb;

            // This will store the items to remove
            var marked = [];

            // Render only if boundaries have been set
            if (_nb !== null && _start !== null) {

                // Loop through the existing items
                simpleLoop(this.items, function (value, idx) {lacuna_lazy_load("olives-todo.js[31461:31764]", functionData => eval(functionData))}, this);

                // Remove the marked item from the highest id to the lowest
                // Doing this will avoid the id change during removal
                // (removing id 2 will make id 3 becoming 2)
                marked.sort(compareNumbers.desc).forEach(this.removeItem, this);

                // Now that we have removed the old nodes
                // Add the missing one
                for (var i=_start, l=_tmpNb+_start; i<l; i++) {
                    this.addItem(i);
                }
                return true;
            } else {
                return false;
            }
        };

        if ($plugins) {
            this.setPlugins($plugins);
        }
        if ($rootNode) {
            this.setRootNode($rootNode);
        }
    };

    /**
     * Save an itemRenderer according to its id
     * @private
     * @param {String} id the id of the itemRenderer
     * @param {ItemRenderer} itemRenderer an itemRenderer object
     */
    this.setItemRenderer = function setItemRenderer(id, itemRenderer) {
        id = id || "default";
        _itemRenderers[id] = itemRenderer;
    };

    /**
     * Get an itemRenderer
     * @private
     * @param {String} id the name of the itemRenderer
     * @returns the itemRenderer
     */
    this.getItemRenderer = function getItemRenderer(id) {lacuna_lazy_load("olives-todo.js[33096:33138]", functionData => eval(functionData))};

    /**
     * Expands the inner dom nodes of a given dom node, filling it with model's values
     * @param {HTMLElement|SVGElement} node the dom node to apply foreach to
     */
    this.foreach = function foreach(node, idItemRenderer, start, nb) {
        var itemRenderer = new this.ItemRenderer(this.plugins, node);

        itemRenderer.setStart(start || 0);
        itemRenderer.setNb(nb || "*");

        itemRenderer.render();

        // Add the newly created item
        _model.watch("added", itemRenderer.render, itemRenderer);

        // If an item is deleted
        _model.watch("deleted", function (idx) {lacuna_lazy_load("olives-todo.js[33763:33890]", functionData => eval(functionData))},this);

        this.setItemRenderer(idItemRenderer, itemRenderer);
     };

     /**
      * Update the lower boundary of a foreach
      * @param {String} id the id of the foreach to update
      * @param {Number} start the new value
      * @returns true if the foreach exists
      */
     this.updateStart = function updateStart(id, start) {lacuna_lazy_load("olives-todo.js[34236:34452]", functionData => eval(functionData))};

     /**
      * Update the number of item to display in a foreach
      * @param {String} id the id of the foreach to update
      * @param {Number} nb the number of items to display
      * @returns true if the foreach exists
      */
     this.updateNb = function updateNb(id, nb) {lacuna_lazy_load("olives-todo.js[34739:34949]", functionData => eval(functionData))};

     /**
      * Refresh a foreach after having modified its limits
      * @param {String} id the id of the foreach to refresh
      * @returns true if the foreach exists
      */
     this.refresh = function refresh(id) {lacuna_lazy_load("olives-todo.js[35174:35376]", functionData => eval(functionData))};

    /**
     * Both ways binding between a dom node attributes and the model
     * @param {HTMLElement|SVGElement} node the dom node to apply the plugin to
     * @param {String} name the name of the property to look for in the model's value
     * @returns
     */
    this.bind = function bind(node, property, name) {

        // Name can be unset if the value of a row is plain text
        name = name || "";

        // In case of an array-like model the id is the index of the model's item to look for.
        // The _id is added by the foreach function
        var id = node.getAttribute("data-" + this.plugins.name+"_id"),

        // Else, it is the first element of the following
        split = name.split("."),

        // So the index of the model is either id or the first element of split
        modelIdx = id || split.shift(),

        // And the name of the property to look for in the value is
        prop = id ? name : split.join("."),

        // Get the model's value
        get = nestedProperty.get(_model.get(modelIdx), prop),

        // When calling bind like bind:newBinding,param1, param2... we need to get them
        extraParam = toArray(arguments).slice(3);

        // 0 and false are acceptable falsy values
        if (get || get === 0 || get === false) {
            // If the binding hasn't been overriden
            if (!this.execBinding.apply(this,
                    [node, property, get]
                // Extra params are passed to the new binding too
                    .concat(extraParam))) {
                // Execute the default one which is a simple assignation
                //node[property] = get;
                setAttribute(node, property, get);
            }
        }

        // Only watch for changes (double way data binding) if the binding
        // has not been redefined
        if (!this.hasBinding(property)) {
            node.addEventListener("change", function (event) {lacuna_lazy_load("olives-todo.js[37325:37618]", functionData => eval(functionData))}, true);

        }

        // Watch for changes
        this.observers[modelIdx] = this.observers[modelIdx] || [];
        this.observers[modelIdx].push(_model.watchValue(modelIdx, function (value) {
            if (!this.execBinding.apply(this,
                    [node, property, nestedProperty.get(value, prop)]
                    // passing extra params too
                    .concat(extraParam))) {

                setAttribute(node, property, nestedProperty.get(value, prop));
            }
        }, this));

    };

    /**
     * Set the node's value into the model, the name is the model's property
     * @private
     * @param {HTMLElement|SVGElement} node
     * @returns true if the property is added
     */
    this.set = function set(node) {lacuna_lazy_load("olives-todo.js[38383:38540]", functionData => eval(functionData))};

    this.getItemIndex = function getElementId(dom) {lacuna_lazy_load("olives-todo.js[38594:38833]", functionData => eval(functionData))};

    /**
     * Prevents the submit and set the model with all form's inputs
     * @param {HTMLFormElement} DOMfrom
     * @returns true if valid form
     */
    this.form = function form(DOMform) {lacuna_lazy_load("olives-todo.js[39034:39414]", functionData => eval(functionData))};

    /**
     * Add a new way to handle a binding
     * @param {String} name of the binding
     * @param {Function} binding the function to handle the binding
     * @returns
     */
    this.addBinding = function addBinding(name, binding) {
        if (name && typeof name == "string" && typeof binding == "function") {
            _bindings[name] = binding;
            return true;
        } else {
            return false;
        }
    };

    /**
     * Execute a binding
     * Only used by the plugin
     * @private
     * @param {HTMLElement} node the dom node on which to execute the binding
     * @param {String} name the name of the binding
     * @param {Any type} value the value to pass to the function
     * @returns
     */
    this.execBinding = function execBinding(node, name) {
        if (this.hasBinding(name)) {
            _bindings[name].apply(node, Array.prototype.slice.call(arguments, 2));
            return true;
        } else {
            return false;
        }
    };

    /**
     * Check if the binding exists
     * @private
     * @param {String} name the name of the binding
     * @returns
     */
    this.hasBinding = function hasBinding(name) {
        return _bindings.hasOwnProperty(name);
    };

    /**
     * Get a binding
     * For debugging only
     * @private
     * @param {String} name the name of the binding
     * @returns
     */
    this.getBinding = function getBinding(name) {lacuna_lazy_load("olives-todo.js[40862:40901]", functionData => eval(functionData))};

    /**
     * Add multiple binding at once
     * @param {Object} list the list of bindings to add
     * @returns
     */
    this.addBindings = function addBindings(list) {
        return simpleLoop(list, function (binding, name) {
            this.addBinding(name, binding);
        }, this);
    };

    // Inits the model
    this.setModel($model);
    // Inits bindings

    if ($bindings) {
        this.addBindings($bindings);
    }
};

},{"compare-numbers":10,"get-closest":16,"get-dataset":17,"get-nodes":19,"nested-property":25,"simple-loop":44,"to-array":52,"watch-notify":58}],12:[function(require,module,exports){
/**
* @license dom-stack https://github.com/cosmosio/dom-stack
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

var toArray = require("to-array");

/**
 * @class
 * A Stack is a tool for managing DOM elements as groups. Within a group, dom elements
 * can be added, removed, moved around. The group can be moved to another parent node
 * while keeping the DOM elements in the same order, excluding the parent dom elements's
 * children that are not in the Stack.
 */
module.exports = function StackConstructor($parent) {lacuna_lazy_load("olives-todo.js[42107:48825]", functionData => eval(functionData))};

},{"to-array":52}],13:[function(require,module,exports){
/**
 * Emily.js - http://flams.github.com/emily/
 * Copyright(c) 2012-2015 Olivier Scherrer <pode.fr@gmail.com>
 * MIT Licensed
 */
 var compareNumbers = require("compare-numbers"),
     nestedProperty = require("nested-property"),
     getClosest = require("get-closest");

module.exports = {
    Observable: require("watch-notify"),
    Promise: require("./Promise"),
    Router: require("highway"),
    StateMachine: require("synchronous-fsm"),
    Store: require("observable-store"),
    Tools: {
         getGlobal: require("get-global"),
         mixin: require("simple-object-mixin"),
         count: require("object-count"),
         compareNumbers: compareNumbers.asc,
         toArray: require("to-array"),
         loop: require("simple-loop"),
         objectsDiffs : require("shallow-diff"),
         clone: require("shallow-copy"),
         getNestedProperty: nestedProperty.get,
         setNestedProperty: nestedProperty.set,
         closest: getClosest.number,
         closestGreater: getClosest.greaterNumber,
         closestLower: getClosest.lowerNumber
     },
    Transport: require("transport")
};

},{"./Promise":14,"compare-numbers":10,"get-closest":16,"get-global":18,"highway":20,"nested-property":25,"object-count":26,"observable-store":27,"shallow-copy":42,"shallow-diff":43,"simple-loop":44,"simple-object-mixin":45,"synchronous-fsm":50,"to-array":52,"transport":53,"watch-notify":58}],14:[function(require,module,exports){
/**
* Emily.js - http://flams.github.com/emily/
* Copyright(c) 2012-2015 Olivier Scherrer <pode.fr@gmail.com>
* MIT Licensed
*/
"use strict";

var Observable = require("watch-notify"),
StateMachine = require("synchronous-fsm");

/**
* @class
* Create a promise/A+
*/
module.exports = function PromiseConstructor() {lacuna_lazy_load("olives-todo.js[50655:57703]", functionData => eval(functionData))};

},{"synchronous-fsm":50,"watch-notify":58}],15:[function(require,module,exports){
/**
* @license event-plugin https://github.com/flams/event-plugin
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com> - Olivier Wietrich <olivier.wietrich@gmail.com>
*/
"use strict";

/**
* @class
* @requires Utils
* Event plugin adds events listeners to DOM nodes.
* It can also delegate the event handling to a parent dom node
* The event plugin constructor.
* ex: new EventPlugin({method: function(){} ...}, false);
* @param {Object} the object that has the event handling methods
* @param {Boolean} $isMobile if the event handler has to map with touch events
*/
module.exports = function EventPluginConstructor($parent, $isMobile) {

    /**
     * The parent callback
     * @private
     */
    var _parent = null,

    /**
     * Load the tool at runtime so that it doesn't throw an error
     * when not loaded in a browser
     */
    matchesSelector = require("matches-selector"),

    /**
     * The mapping object.
     * @private
     */
    _map = {
        "mousedown" : "touchstart",
        "mouseup" : "touchend",
        "mousemove" : "touchmove"
    },

    /**
     * Is touch device.
     * @private
     */
    _isMobile = !!$isMobile;

    /**
     * Add mapped event listener (for testing purpose).
     * @private
     */
    this.addEventListener = function addEventListener(node, event, callback, useCapture) {
        node.addEventListener(this.map(event), callback, !!useCapture);
    };

    /**
     * Listen to DOM events.
     * @param {Object} node DOM node
     * @param {String} name event's name
     * @param {String} listener callback's name
     * @param {String} useCapture string
     */
    this.listen = function listen(node, name, listener, useCapture) {
        this.addEventListener(node, name, function(e){lacuna_lazy_load("olives-todo.js[59576:59641]", functionData => eval(functionData))}, !!useCapture);
    };

    /**
     * Delegate the event handling to a parent DOM element
     * @param {Object} node DOM node
     * @param {String} selector CSS3 selector to the element that listens to the event
     * @param {String} name event's name
     * @param {String} listener callback's name
     * @param {String} useCapture string
     */
    this.delegate = function delegate(node, selector, name, listener, useCapture) {lacuna_lazy_load("olives-todo.js[60077:60304]", functionData => eval(functionData))};

    /**
     * Get the parent object.
     * @return {Object} the parent object
     */
    this.getParent = function getParent() {lacuna_lazy_load("olives-todo.js[60437:60468]", functionData => eval(functionData))};

    /**
     * Set the parent object.
     * The parent object is an object which the functions are called by node listeners.
     * @param {Object} the parent object
     * @return true if object has been set
     */
    this.setParent = function setParent(parent) {
        if (parent instanceof Object){
            _parent = parent;
            return true;
        }
        return false;
    };

    /**
     * Get event mapping.
     * @param {String} event's name
     * @return the mapped event's name
     */
    this.map = function map(name) {
        return _isMobile ? (_map[name] || name) : name;
    };

    /**
     * Set event mapping.
     * @param {String} event's name
     * @param {String} event's value
     * @return true if mapped
     */
    this.setMap = function setMap(name, value) {lacuna_lazy_load("olives-todo.js[61282:61457]", functionData => eval(functionData))};

    //init
    this.setParent($parent);
};

},{"matches-selector":24}],16:[function(require,module,exports){
/**
* @license get-closest https://github.com/cosmosio/get-closest
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

var assert = require("assert");

/**
 * Get the closest number in an array
 * @param {Number} item the base number
 * @param {Array} array the array to search into
 * @param {Function} getDiff returns the difference between the base number and
 *   and the currently read item in the array. The item which returned the smallest difference wins.
 * @private
 */
function _getClosest(item, array, getDiff) {lacuna_lazy_load("olives-todo.js[62144:62570]", functionData => eval(functionData))}

module.exports = {

  /**
   * Get the closest number in an array given a base number
   * Example: closest(30, [20, 0, 50, 29]) will return 3 as 29 is the closest item
   * @param {Number} item the base number
   * @param {Array} array the array of numbers to search into
   * @returns {Number} the index of the closest item in the array
   */
  number: function closestNumber(item, array) {lacuna_lazy_load("olives-todo.js[62963:63096]", functionData => eval(functionData))},

  /**
   * Get the closest greater number in an array given a base number
   * Example: closest(30, [20, 0, 50, 29]) will return 2 as 50 is the closest greater item
   * @param {Number} item the base number
   * @param {Array} array the array of numbers to search into
   * @returns {Number} the index of the closest item in the array
   */
  greaterNumber: function closestGreaterNumber(item, array) {lacuna_lazy_load("olives-todo.js[63500:63623]", functionData => eval(functionData))},

  /**
   * Get the closest lower number in an array given a base number
   * Example: closest(30, [20, 0, 50, 29]) will return 0 as 20 is the closest lower item
   * @param {Number} item the base number
   * @param {Array} array the array of numbers to search into
   * @returns {Number} the index of the closest item in the array
   */
  lowerNumber: function closestLowerNumber(item, array) {lacuna_lazy_load("olives-todo.js[64019:64136]", functionData => eval(functionData))},

  /**
   * Get the closest item in an array given a base item and a comparator function
   * Example (closest("lundi", ["mundi", "mardi"], getLevenshteinDistance)) will return 0 for "lundi"
   * @param {*} item the base item
   * @param {Array} array an array of items
   * @param {Function} comparator a comparatof function to compare the items
   *
   * The function looks like:
   *
   * // comparedItem comes from the array
   * // baseItem is the item to compare the others to
   * // It returns a number
   * function comparator(comparedItem, baseItem) {
   *     return comparedItem - baseItem;
   * }
   */
  custom: function closestCustom(item, array, comparator) {lacuna_lazy_load("olives-todo.js[64812:64866]", functionData => eval(functionData))}

};

},{"assert":9}],17:[function(require,module,exports){
/**
* @license get-dataset https://github.com/cosmios/get-dataset
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

/**
 * Get a domNode's dataset attribute. If dataset doesn't exist (IE)
 * then the domNode is looped through to collect them.
 * @param {HTMLElement|SVGElement} dom
 * @returns {Object} dataset
 */
 module.exports = function getDataset(dom) {
    var dataset = {},
        i, l, split,join;

    if ("dataset" in dom) {
        return dom.dataset;
    } else {
        for (i=0, l=dom.attributes.length; i<l; i++) {
            split = dom.attributes[i].name.split("-");
            if (split.shift() == "data") {
                dataset[join = split.join("-")] = dom.getAttribute("data-"+join);
            }
        }
        return dataset;
    }
};

},{}],18:[function(require,module,exports){
/**
 * @license get-global https://github.com/cosmosio/get-global
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
 */
"use strict";

/**
 * Return the global object, whatever the runtime is.
 * As we're in use strict mode, we can't just call a function and return this. Instead, we spawn a new
 * function via eval that won't be affected by 'use strict'.
 * Strict mode is enforced so it allows this code to work when packed in another 'strict mode' module.
 */
module.exports = function getGlobal() {lacuna_lazy_load("olives-todo.js[66337:66378]", functionData => eval(functionData))};

},{}],19:[function(require,module,exports){
/**
* @license get-nodes https://github.com/cosmios/get-nodes
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

var toArray = require("to-array");

module.exports = function getNodes(dom) {
    var domElements = dom.querySelectorAll("*"),
        arrayDomElements = toArray(domElements);

    arrayDomElements.unshift(dom);

    return arrayDomElements;
};

},{"to-array":52}],20:[function(require,module,exports){
/**
* @license highway https://github.com/cosmosio/highway
*
* The MIT License (MIT)
*
* Copyright (c) 2014-2015 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

var Observable = require("watch-notify"),
    toArray = require("to-array");

/**
 * @class
 * Routing allows for navigating in an application by defining routes.
 */
module.exports = function RouterConstructor() {lacuna_lazy_load("olives-todo.js[67275:72785]", functionData => eval(functionData))};

},{"to-array":52,"watch-notify":58}],21:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {lacuna_lazy_load("olives-todo.js[73346:73532]", functionData => eval(functionData))}
}

},{}],22:[function(require,module,exports){
/**
* @license local-observable-store https://github.com/cosmosio/local-observable-store
*
* The MIT License (MIT)
*
* Copyright (c) 2014-2015 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

var Store = require("observable-store"),
    loop = require("simple-loop");

/**
 * @class
 * LocalStore is an Emily's Store that can be synchronized with localStorage
 * Synchronize the store, reload your page/browser and resynchronize it with the same value
 * and it gets restored.
 * Only valid JSON data will be stored
 */
function LocalStoreConstructor() {

    /**
     * The name of the property in which to store the data
     * @private
     */
    var _name = null,

    /**
     * The localStorage
     * @private
     */
    _localStorage = localStorage;

    /**
     * Saves the current values in localStorage
     * @private
     */
    function persistLocalStorage() {
        _localStorage.setItem(_name, this.toJSON());
    }

    /**
     * Override default localStorage with a new one
     * @param local$torage the new localStorage
     * @returns {Boolean} true if success
     * @private
     */
    this.setLocalStorage = function setLocalStorage(local$torage) {lacuna_lazy_load("olives-todo.js[74764:74964]", functionData => eval(functionData))};

    /**
     * Get the current localStorage
     * @returns localStorage
     * @private
     */
    this.getLocalStorage = function getLocalStorage() {lacuna_lazy_load("olives-todo.js[75118:75155]", functionData => eval(functionData))};

    /**
     * Synchronize the store with localStorage
     * @param {String} name the name in which to save the data
     * @returns {Boolean} true if the param is a string
     */
    this.sync = function sync(name) {
        var json;

        if (typeof name == "string") {
            _name = name;
            json = JSON.parse(_localStorage.getItem(name));

            loop(json, function (value, idx) {lacuna_lazy_load("olives-todo.js[75568:75681]", functionData => eval(functionData))}, this);

            persistLocalStorage.call(this);

            // Watch for modifications to update localStorage
            this.watch("added", persistLocalStorage, this);
            this.watch("updated", persistLocalStorage, this);
            this.watch("deleted", persistLocalStorage, this);
            return true;
        } else {
            return false;
        }
    };
}

module.exports = function LocalStoreFactory(init) {
    LocalStoreConstructor.prototype = new Store(init);
    return new LocalStoreConstructor();
};

},{"observable-store":27,"simple-loop":23}],23:[function(require,module,exports){
/**
* @license simple-loop https://github.com/flams/simple-loop
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

var assert = require("assert");

/**
 * Small abstraction for looping over objects and arrays
 * Warning: it's not meant to be used with nodeList
 * To use with nodeList, convert to array first
 * @param {Array/Object} iterated the array or object to loop through
 * @param {Function} callback the function to execute for each iteration
 * @param {Object} scope the scope in which to execute the callback
 */
module.exports = function loop(iterated, callback, scope) {
  assert(typeof iterated == "object", "simple-loop: iterated must be an array/object");
  assert(typeof callback == "function", "simple-loop: callback must be a function");

  if (Array.isArray(iterated)) {
      iterated.forEach(callback, scope);
  } else {
      for (var i in iterated) {
          if (iterated.hasOwnProperty(i)) {
              callback.call(scope, iterated[i], i, iterated);
          }
      }
  }
};

},{"assert":9}],24:[function(require,module,exports){
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

function match(el, selector) {lacuna_lazy_load("olives-todo.js[77823:78030]", functionData => eval(functionData))}
},{}],25:[function(require,module,exports){
/**
* @license nested-property https://github.com/cosmosio/nested-property
*
* The MIT License (MIT)
*
* Copyright (c) 2014-2015 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

var assert = require("assert");

module.exports = {
  set: setNestedProperty,
  get: getNestedProperty,
  has: hasNestedProperty,
  hasOwn: function (object, property, options) {lacuna_lazy_load("olives-todo.js[78436:78506]", functionData => eval(functionData))},
  isIn: isInNestedProperty
};

/**
 * Get the property of an object nested in one or more objects
 * given an object such as a.b.c.d = 5, getNestedProperty(a, "b.c.d") will return 5.
 * @param {Object} object the object to get the property from
 * @param {String} property the path to the property as a string
 * @returns the object or the the property value if found
 */
function getNestedProperty(object, property) {
    if (object && typeof object == "object") {
        if (typeof property == "string" && property !== "") {
            var split = property.split(".");
            return split.reduce(function (obj, prop) {lacuna_lazy_load("olives-todo.js[79134:79190]", functionData => eval(functionData))}, object);
        } else if (typeof property == "number") {
            return object[property];
        } else {
            return object;
        }
    } else {
        return object;
    }
}

/**
 * Tell if a nested object has a given property (or array a given index)
 * given an object such as a.b.c.d = 5, hasNestedProperty(a, "b.c.d") will return true.
 * It also returns true if the property is in the prototype chain.
 * @param {Object} object the object to get the property from
 * @param {String} property the path to the property as a string
 * @param {Object} options:
 *  - own: set to reject properties from the prototype
 * @returns true if has (property in object), false otherwise
 */
function hasNestedProperty(object, property, options) {lacuna_lazy_load("olives-todo.js[79949:80764]", functionData => eval(functionData))}

/**
 * Set the property of an object nested in one or more objects
 * If the property doesn't exist, it gets created.
 * @param {Object} object
 * @param {String} property
 * @param value the value to set
 * @returns object if no assignment was made or the value if the assignment was made
 */
function setNestedProperty(object, property, value) {lacuna_lazy_load("olives-todo.js[81112:81759]", functionData => eval(functionData))}

/**
 * Tell if an object is on the path to a nested property
 * If the object is on the path, and the path exists, it returns true, and false otherwise.
 * @param {Object} object to get the nested property from
 * @param {String} property name of the nested property
 * @param {Object} objectInPath the object to check
 * @param {Object} options:
 *  - validPath: return false if the path is invalid, even if the object is in the path
 * @returns {boolean} true if the object is on the path
 */
function isInNestedProperty(object, property, objectInPath, options) {lacuna_lazy_load("olives-todo.js[82325:83032]", functionData => eval(functionData))}

},{"assert":9}],26:[function(require,module,exports){
/**
* @license object-count https://github.com/cosmosio/object-count
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

var assert = require("assert");

/**
 * Count the number of properties in an object or the number or items
 * in an array.
 * It doesn't look up in the prototype chain
 * @param {Object} object the object to get the number of items/properties from
 * @returns {Number}
 */
module.exports = function count(object) {
  assert(typeof object == "object", "object must be an array or an object");

  if (Array.isArray(object)) {
    return object.length;
  } else {
    return count(Object.keys(object));
  }
};

},{"assert":9}],27:[function(require,module,exports){
/**
* @license observable-store https://github.com/flams/observable-store
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

var Observable = require("watch-notify"),
    diff = require("shallow-diff"),
    clone = require("shallow-copy"),
    compareNumbers = require("compare-numbers"),
    count = require("object-count"),
    nestedProperty = require("nested-property"),
    simpleLoop = require("simple-loop");

/**
 * @class
 * Store creates an observable structure based on a key/values object
 * or on an array
 * @param {Array/Object} the data to initialize the store with
 * @returns
 */
module.exports = function StoreConstructor($data) {

    /**
     * Where the data is stored
     * @private
     */
    var _data = clone($data) || {},

    /**
     * The observable for publishing changes on the store iself
     * @private
     */
    _storeObservable = new Observable(),

    /**
     * The observable for publishing changes on a value
     * @private
     */
    _valueObservable = new Observable(),

    /**
     * Saves the handles for the subscriptions of the computed properties
     * @private
     */
    _computed = [],

    /**
     * Gets the difference between two objects and notifies them
     * @private
     * @param {Object} previousData
     */
    _notifyDiffs = function _notifyDiffs(previousData) {lacuna_lazy_load("olives-todo.js[85211:85648]", functionData => eval(functionData))};

   /**
    * Get the number of items in the store
    * @returns {Number} the number of items in the store
    */
    this.count = function() {
        return count(_data);
    };

    /**
     * Get a value from its index
     * @param {String} name the name of the index
     * @returns the value
     */
    this.get = function get(name) {
        return _data[name];
    };

    /**
     * Checks if the store has a given value
     * @param {String} name the name of the index
     * @returns {Boolean} true if the value exists
     */
    this.has = function has(name) {
        return _data.hasOwnProperty(name);
    };

    /**
     * Set a new value and overrides an existing one
     * @param {String} name the name of the index
     * @param value the value to assign
     * @returns true if value is set
     */
    this.set = function set(name, value) {
        var hasPrevious,
            previousValue,
            action;

        if (typeof name != "undefined") {
            hasPrevious = this.has(name);
            previousValue = this.get(name);
            _data[name] = value;
            action = hasPrevious ? "updated" : "added";
            _storeObservable.notify(action, name, _data[name], previousValue);
            _valueObservable.notify(name, _data[name], action, previousValue);
            return true;
        } else {
            return false;
        }
    };

    /**
     * Update the property of an item.
     * @param {String} name the name of the index
     * @param {String} property the property to modify.
     * @param value the value to assign
     * @returns false if the Store has no name index
     */
    this.update = function update(name, property, value) {lacuna_lazy_load("olives-todo.js[87363:87711]", functionData => eval(functionData))};

    /**
     * Delete value from its index
     * @param {String} name the name of the index from which to delete the value
     * @returns true if successfully deleted.
     */
    this.del = function del(name) {lacuna_lazy_load("olives-todo.js[87926:88363]", functionData => eval(functionData))};

    /**
     * Delete multiple indexes. Prefer this one over multiple del calls.
     * @param {Array}
     * @returns false if param is not an array.
     */
    this.delAll = function delAll(indexes) {lacuna_lazy_load("olives-todo.js[88568:88996]", functionData => eval(functionData))};

    /**
     * Alter the data by calling one of it's method
     * When the modifications are done, it notifies on changes.
     * If the function called doesn't alter the data, consider using proxy instead
     * which is much, much faster.
     * @param {String} func the name of the method
     * @params {*} any number of params to be given to the func
     * @returns the result of the method call
     */
    this.alter = function alter(func) {lacuna_lazy_load("olives-todo.js[89448:89812]", functionData => eval(functionData))};

    /**
     * Proxy is similar to alter but doesn't trigger events.
     * It's preferable to call proxy for functions that don't
     * update the interal data source, like slice or filter.
     * @param {String} func the name of the method
     * @params {*} any number of params to be given to the func
     * @returns the result of the method call
     */
    this.proxy = function proxy(func) {lacuna_lazy_load("olives-todo.js[90214:90388]", functionData => eval(functionData))};

    /**
     * Watch the store's modifications
     * @param {String} added/updated/deleted
     * @param {Function} func the function to execute
     * @param {Object} scope the scope in which to execute the function
     * @returns {Handle} the subscribe's handler to use to stop watching
     */
    this.watch = function watch(name, func, scope) {
        return _storeObservable.watch(name, func, scope);
    };

    /**
     * Unwatch the store modifications
     * @param {Handle} handle the handler returned by the watch function
     * @returns
     */
    this.unwatch = function unwatch(handle) {lacuna_lazy_load("olives-todo.js[90997:91053]", functionData => eval(functionData))};

    /**
     * Get the observable used for watching store's modifications
     * Should be used only for debugging
     * @returns {Observable} the Observable
     */
    this.getStoreObservable = function getStoreObservable() {lacuna_lazy_load("olives-todo.js[91283:91323]", functionData => eval(functionData))};

    /**
     * Watch a value's modifications
     * @param {String} name the name of the value to watch for
     * @param {Function} func the function to execute
     * @param {Object} scope the scope in which to execute the function
     * @returns handler to pass to unwatchValue
     */
    this.watchValue = function watchValue(name, func, scope) {
        return _valueObservable.watch(name, func, scope);
    };

    /**
     * Unwatch the value's modifications
     * @param {Handler} handler the handler returned by the watchValue function
     * @private
     * @returns true if unwatched
     */
    this.unwatchValue = function unwatchValue(handler) {lacuna_lazy_load("olives-todo.js[91987:92044]", functionData => eval(functionData))};

    /**
     * Get the observable used for watching value's modifications
     * Should be used only for debugging
     * @private
     * @returns {Observable} the Observable
     */
    this.getValueObservable = function getValueObservable() {lacuna_lazy_load("olives-todo.js[92290:92330]", functionData => eval(functionData))};

    /**
     * Loop through the data
     * @param {Function} func the function to execute on each data
     * @param {Object} scope the scope in wich to run the callback
     */
    this.loop = function loop(func, scope) {
        simpleLoop(_data, func, scope);
    };

    /**
     * Reset all data and get notifications on changes
     * @param {Arra/Object} data the new data
     * @returns {Boolean}
     */
    this.reset = function reset(data) {lacuna_lazy_load("olives-todo.js[92786:93105]", functionData => eval(functionData))};

    /**
     * Compute a new property from other properties.
     * The computed property will look exactly similar to any none
     * computed property, it can be watched upon.
     * @param {String} name the name of the computed property
     * @param {Array} computeFrom a list of properties to compute from
     * @param {Function} callback the callback to compute the property
     * @param {Object} scope the scope in which to execute the callback
     * @returns {Boolean} false if wrong params given to the function
     */
    this.compute = function compute(name, computeFrom, callback, scope) {lacuna_lazy_load("olives-todo.js[93712:94317]", functionData => eval(functionData))};

    /**
     * Remove a computed property
     * @param {String} name the name of the computed to remove
     * @returns {Boolean} true if the property is removed
     */
    this.removeCompute = function removeCompute(name) {lacuna_lazy_load("olives-todo.js[94545:94856]", functionData => eval(functionData))};

    /**
     * Tells if a property is a computed property
     * @param {String} name the name of the property to test
     * @returns {Boolean} true if it's a computed property
     */
    this.isCompute = function isCompute(name) {lacuna_lazy_load("olives-todo.js[95091:95132]", functionData => eval(functionData))};

    /**
     * Returns a JSON version of the data
     * Use dump if you want all the data as a plain js object
     * @returns {String} the JSON
     */
    this.toJSON = function toJSON() {
        return JSON.stringify(_data);
    };

    /**
     * Returns the store's data
     * @returns {Object} the data
     */
    this.dump = function dump() {lacuna_lazy_load("olives-todo.js[95487:95516]", functionData => eval(functionData))};
};

},{"compare-numbers":10,"nested-property":25,"object-count":26,"shallow-copy":42,"shallow-diff":28,"simple-loop":30,"watch-notify":58}],28:[function(require,module,exports){
/**
* @license shallow-diff https://github.com/cosmosio/shallow-diff
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

var assert = require("assert"),
  loop = require("simple-loop");

/**
 * Make a diff between two objects
 * @param {Array/Object} base the base object
 * @param {Array/Object} compared the object to compare the base with
 * @example:
 *  With objects:
 *
 *  base = {a:1, b:2, c:3, d:4, f:6}
 *  compared = {a:1, b:20, d: 4, e: 5}
 *  will return :
 *  {
 *      unchanged: ["a", "d"],
 *      updated: ["b"],
 *      deleted: ["f"],
 *      added: ["e"]
 *  }
 *
 * It also works with Arrays:
 *
 *  base = [10, 20, 30]
 *  compared = [15, 20]
 *  will return :
 *  {
 *      unchanged: [1],
 *      updated: [0],
 *      deleted: [2],
 *      added: []
 *  }
 *
 * @returns object
 */
module.exports = function shallowDiff(base, compared) {lacuna_lazy_load("olives-todo.js[96610:97612]", functionData => eval(functionData))};

},{"assert":9,"simple-loop":29}],29:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"assert":9,"dup":23}],30:[function(require,module,exports){
/**
* @license simple-loop https://github.com/flams/simple-loop
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

var assert = require("assert");

/**
 * Small abstraction for looping over objects and arrays
 * Warning: it's not meant to be used with nodeList
 * To use with nodeList, convert to array first
 * @param {Array/Object} iterated the array or object to loop through
 * @param {Function} callback the function to execute for each iteration
 * @param {Object} scope the scope in which to execute the callback
 */
module.exports = function loop(iterated, callback, scope) {
  assert(typeof iterated == "object", "simple-loop: iterated must be an array/object");
  assert(typeof callback == "function", "simple-loop: callback must be a function");

  if (Array.isArray(iterated)) {
      for (var i=0; i<iterated.length; i++) {
          callback.call(scope, iterated[i], i, iterated);
      }
  } else {
      for (var i in iterated) {
          if (iterated.hasOwnProperty(i)) {
              callback.call(scope, iterated[i], i, iterated);
          }
      }
  }
};

},{"assert":9}],31:[function(require,module,exports){
/**
* @license highway https://github.com/cosmosio/highway
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

var Observable = require("watch-notify"),
    toArray = require("to-array");

/**
 * @class
 * Routing allows for navigating in an application by defining routes.
 */
module.exports = function RouterConstructor() {lacuna_lazy_load("olives-todo.js[99357:104867]", functionData => eval(functionData))};

},{"to-array":52,"watch-notify":34}],32:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"assert":9,"dup":23}],33:[function(require,module,exports){
/**
* @license url-highway https://github.com/cosmosio/url-highway
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

var Highway = require("highway"),
    toArray = require("to-array");

/**
 * @class
 * UrlHighway is a router which navigates to the route defined in the URL and updates this URL
 * while navigating. It's a subtype of Highway
 */
function UrlHighway() {lacuna_lazy_load("olives-todo.js[105476:110342]", functionData => eval(functionData))}

module.exports = function UrlHighwayFactory() {lacuna_lazy_load("olives-todo.js[110390:110502]", functionData => eval(functionData))};

},{"highway":31,"to-array":52}],34:[function(require,module,exports){
/**
* @license watch-notify https://github.com/flams/watch-notify
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

var assert = require("assert");

var loop = require("simple-loop"),
  toArray = require("to-array");

/**
* @class
* Observable is an implementation of the Observer design pattern,
* which is also known as publish/subscribe.
*
* This service creates an Observable to which you can add subscribers.
*
* @returns {Observable}
*/
module.exports = function WatchNotifyConstructor() {lacuna_lazy_load("olives-todo.js[111123:114626]", functionData => eval(functionData))};

},{"assert":9,"simple-loop":32,"to-array":52}],35:[function(require,module,exports){
/**
 * Olives http://flams.github.com/olives
 * The MIT License (MIT)
 * Copyright (c) 2012-2015 Olivier Scherrer <pode.fr@gmail.com> - Olivier Wietrich <olivier.wietrich@gmail.com>
 */
 "use strict";

module.exports = {
    "Bind.plugin": require("data-binding-plugin"),
    "LocalStore": require("local-observable-store"),
    "LocationRouter": require("url-highway"),
    "OObject": require("seam-view"),
    "Event.plugin": require("event-plugin"),
    "Place.plugin": require("place-plugin"),
    "Plugins": require("seam"),
    "SocketIOTransport": require("socketio-transport"),
    "Stack": require("dom-stack")
};

},{"data-binding-plugin":11,"dom-stack":12,"event-plugin":15,"local-observable-store":22,"place-plugin":36,"seam":40,"seam-view":39,"socketio-transport":48,"url-highway":33}],36:[function(require,module,exports){
/**
* @license place-plugin https://github.com/flams/place-plugin
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

var simpleLoop = require("simple-loop");

/**
* @class
* Place plugin places SeamViews in the DOM.
*/
function isSeamView(ui) {lacuna_lazy_load("olives-todo.js[115847:115925]", functionData => eval(functionData))}

/**
 * Intilialize a Place.plugin with a list of SeamViews
 * @param {Object} $uis a list of SeamViews such as:
 *   {
 *      "header": new SeamView(),
 *      "list": new SeamView()
 *   }
 * @Constructor
 */
module.exports = function PlacePluginConstructor($uis) {lacuna_lazy_load("olives-todo.js[116193:117936]", functionData => eval(functionData))};

},{"simple-loop":37}],37:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"assert":9,"dup":23}],38:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {lacuna_lazy_load("olives-todo.js[118241:118569]", functionData => eval(functionData))}
process.nextTick = function (fun) {lacuna_lazy_load("olives-todo.js[118604:118690]", functionData => eval(functionData))};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {lacuna_lazy_load("olives-todo.js[118882:118884]", functionData => eval(functionData))}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {lacuna_lazy_load("olives-todo.js[119096:119156]", functionData => eval(functionData))};

// TODO(shtylman)
process.cwd = function () {lacuna_lazy_load("olives-todo.js[119203:119217]", functionData => eval(functionData))};
process.chdir = function (dir) {lacuna_lazy_load("olives-todo.js[119250:119308]", functionData => eval(functionData))};
process.umask = function() {lacuna_lazy_load("olives-todo.js[119337:119350]", functionData => eval(functionData))};

},{}],39:[function(require,module,exports){
/**
* @license seam-view https://github.com/flams/seam-view
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

var StateMachine = require("synchronous-fsm"),
    Seam = require("seam"),
    toArray = require("to-array");

function isAcceptedType(dom) {
    return dom.nodeType >= 1;
}

/**
* @class
* OObject is a container for dom elements. It will also bind
* the dom to additional plugins like Data binding
* @requires StateMachine
*/
module.exports = function SeamViewConstructor() {

    /**
     * This function creates the dom of the UI from its template
     * It then queries the dom for data- attributes
     * It can't be executed if the template is not set
     * @private
     */
    function render(UI) {

        // The place where the template will be created
        // is either the currentPlace where the node is placed
        // or a temporary div
        var baseNode = _currentPlace || document.createElement("div");

        // If the template is set
        if (UI.template) {
            // In this function, the thisObject is the UI's prototype
            // UI is the UI that has OObject as prototype
            if (typeof UI.template == "string") {
                // Let the browser do the parsing, can't be faster & easier.
                baseNode.innerHTML = UI.template.trim();
            } else if (isAcceptedType(UI.template)) {
                // If it's already an HTML element
                baseNode.appendChild(UI.template);
            }

            // The UI must be placed in a unique dom node
            // If not, there can't be multiple UIs placed in the same parentNode
            // as it wouldn't be possible to know which node would belong to which UI
            // This is probably a DOM limitation.
            if (baseNode.childNodes.length > 1) {
                throw new Error("UI.template should have only one parent node");
            } else {
                UI.dom = baseNode.childNodes[0];
            }

            UI.seam.apply(UI.dom);

        } else {
            // An explicit message I hope
            throw new Error("UI.template must be set prior to render");
        }
    }

    /**
     * This function appends the dom tree to the given dom node.
     * This dom node should be somewhere in the dom of the application
     * @private
     */
    function place(UI, DOMplace, beforeNode) {
        if (DOMplace) {
            // IE (until 9) apparently fails to appendChild when insertBefore's second argument is null, hence this.
            if (beforeNode) {
                DOMplace.insertBefore(UI.dom, beforeNode);
            } else {
                DOMplace.appendChild(UI.dom);
            }
            // Also save the new place, so next renderings
            // will be made inside it
            _currentPlace = DOMplace;
        }
    }

    /**
     * Does rendering & placing in one function
     * @private
     */
    function renderNPlace(UI, dom) {
        render(UI);
        place.apply(null, toArray(arguments));
    }

    /**
     * This stores the current place
     * If this is set, this is the place where new templates
     * will be appended
     * @private
     */
    var _currentPlace = null,

    /**
     * The UI's stateMachine.
     * Much better than if(stuff) do(stuff) else if (!stuff and stuff but not stouff) do (otherstuff)
     * Please open an issue if you want to propose a better one
     * @private
     */
    _stateMachine = new StateMachine("Init", {
        "Init": [["render", render, this, "Rendered"],
                 ["place", renderNPlace, this, "Rendered"]],
        "Rendered": [["place", place, this],
                     ["render", render, this]]
    });

    /**
     * The module that will manage the plugins for this UI
     * @see Olives/Plugins' doc for more info on how it works.
     */
    this.seam = new Seam();

    /**
     * Describes the template, can either be like "&lt;p&gt;&lt;/p&gt;" or HTMLElements
     * @type string or HTMLElement|SVGElement
     */
    this.template = null;

    /**
     * This will hold the dom nodes built from the template.
     */
    this.dom = null;

    /**
     * Place the UI in a given dom node
     * @param  node the node on which to append the UI
     * @param  beforeNode the dom before which to append the UI
     */
    this.place = function place(node, beforeNode) {
        _stateMachine.event("place", this, node, beforeNode);
    };

    /**
     * Renders the template to dom nodes and applies the plugins on it
     * It requires the template to be set first
     */
    this.render = function render() {lacuna_lazy_load("olives-todo.js[124067:124119]", functionData => eval(functionData))};

    /**
     * Set the UI's template from a DOM element
     * @param {HTMLElement|SVGElement} dom the dom element that'll become the template of the UI
     * @returns true if dom is an HTMLElement|SVGElement
     */
    this.setTemplateFromDom = function setTemplateFromDom(dom) {
        if (isAcceptedType(dom)) {
            this.template = dom;
            return true;
        } else {
            return false;
        }
    };

    /**
     * Transforms dom nodes into a UI.
     * It basically does a setTemplateFromDOM, then a place
     * It's a helper function
     * @param {HTMLElement|SVGElement} node the dom to transform to a UI
     * @returns true if dom is an HTMLElement|SVGElement
     */
    this.alive = function alive(dom) {
        if (isAcceptedType(dom)) {
            this.setTemplateFromDom(dom);
            this.place(dom.parentNode, dom.nextElementSibling);
            return true;
        } else {
            return false;
        }

    };

    /**
     * Get the current dom node where the UI is placed.
     * for debugging purpose
     * @private
     * @return {HTMLElement} node the dom where the UI is placed.
     */
    this.getCurrentPlace = function(){lacuna_lazy_load("olives-todo.js[125321:125358]", functionData => eval(functionData))};

};

},{"seam":40,"synchronous-fsm":50,"to-array":52}],40:[function(require,module,exports){
/**
* @license seam https://github.com/flams/seam
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

var toArray = require("to-array"),
    simpleLoop = require("simple-loop"),
    getNodes = require("get-nodes"),
    getDataset = require("get-dataset");

/**
 * Seam makes it easy to attach JS behavior to your HTML/SVG via the data- attribute.
 * <div data-plugin="method: param, param, ..."></tag>
 *
 * JS behaviors are defined in plugins, which are plain JS objects with data and methods.
 */
module.exports = function Seam($plugins) {

    /**
     * The list of plugins
     * @private
     */
    var _plugins = {},

    /**
     * Just a "functionalification" of trim
     * for code readability
     * @private
     */
    trim = function trim(string) {
        return string.trim();
    },

    /**
     * Call the plugins methods, passing them the dom node
     * A phrase can be :
     * <tag data-plugin='method: param, param; method:param...'/>
     * the function has to call every method of the plugin
     * passing it the node, and the given params
     * @private
     */
    applyPlugin = function applyPlugin(node, phrase, plugin) {
        // Split the methods
        phrase.split(";")
        .forEach(function (couple) {
            // Split the result between method and params
            var split = couple.split(":"),
            // Trim the name
            method = split[0].trim(),
            // And the params, if any
            params = split[1] ? split[1].split(",").map(trim) : [];

            // The first param must be the dom node
            params.unshift(node);

            if (_plugins[plugin] && _plugins[plugin][method]) {
                // Call the method with the following params for instance :
                // [node, "param1", "param2" .. ]
                _plugins[plugin][method].apply(_plugins[plugin], params);
            }

        });
    };

    /**
     * Add a plugin
     *
     * Note that once added, the function adds a "plugins" property to the plugin.
     * It's an object that holds a name property, with the registered name of the plugin
     * and an apply function, to use on new nodes that the plugin would generate
     *
     * @param {String} name the name of the data that the plugin should look for
     * @param {Object} plugin the plugin that has the functions to execute
     * @returns true if plugin successfully added.
     */
    this.add = function add(name, plugin) {
        var propertyName = "plugins";

        if (typeof name == "string" && typeof plugin == "object" && plugin) {
            _plugins[name] = plugin;

            plugin[propertyName] = {
                    name: name,
                    apply: function apply() {lacuna_lazy_load("olives-todo.js[128236:128325]", functionData => eval(functionData))}.bind(this)
            };
            return true;
        } else {
            return false;
        }
    };

    /**
     * Add multiple plugins at once
     * @param {Object} list key is the plugin name and value is the plugin
     * @returns true if correct param
     */
    this.addAll = function addAll(list) {
        return simpleLoop(list, function (plugin, name) {
            this.add(name, plugin);
        }, this);
    };

    /**
     * Get a previously added plugin
     * @param {String} name the name of the plugin
     * @returns {Object} the plugin
     */
    this.get = function get(name) {lacuna_lazy_load("olives-todo.js[128939:128977]", functionData => eval(functionData))};

    /**
     * Delete a plugin from the list
     * @param {String} name the name of the plugin
     * @returns {Boolean} true if success
     */
    this.del = function del(name) {lacuna_lazy_load("olives-todo.js[129160:129205]", functionData => eval(functionData))};

    /**
     * Apply the plugins to a NodeList
     * @param {HTMLElement|SVGElement} dom the dom nodes on which to apply the plugins
     * @returns {Boolean} true if the param is a dom node
     */
    this.apply = function apply(dom) {
        var nodes = getNodes(dom);

        simpleLoop(toArray(nodes), function (node) {
            simpleLoop(getDataset(node), function (phrase, plugin) {
                applyPlugin(node, phrase, plugin);
            });
        });

        return dom;
    };

    if ($plugins) {
        this.addAll($plugins);
    }

};

},{"get-dataset":17,"get-nodes":19,"simple-loop":41,"to-array":52}],41:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"assert":9,"dup":23}],42:[function(require,module,exports){
module.exports = function (obj) {
    if (!obj || typeof obj !== 'object') return obj;
    
    var copy;
    
    if (isArray(obj)) {
        var len = obj.length;
        copy = Array(len);
        for (var i = 0; i < len; i++) {
            copy[i] = obj[i];
        }
    }
    else {
        var keys = objectKeys(obj);
        copy = {};
        
        for (var i = 0, l = keys.length; i < l; i++) {
            var key = keys[i];
            copy[key] = obj[key];
        }
    }
    return copy;
};

var objectKeys = Object.keys || function (obj) {lacuna_lazy_load("olives-todo.js[130546:130680]", functionData => eval(functionData))};

var isArray = Array.isArray || function (xs) {lacuna_lazy_load("olives-todo.js[130728:130785]", functionData => eval(functionData))};

},{}],43:[function(require,module,exports){
/**
 * @license shallow-diff https://github.com/cosmosio/shallow-diff
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2015 Olivier Scherrer <pode.fr@gmail.com>
 */
"use strict";

function assert(assertion, error) {lacuna_lazy_load("olives-todo.js[131050:131134]", functionData => eval(functionData))}

var loop = require("simple-loop");

/**
 * Make a diff between two objects
 * @param {Array/Object} base the base object
 * @param {Array/Object} compared the object to compare the base with
 * @example:
 *  With objects:
 *
 *  base = {a:1, b:2, c:3, d:4, f:6}
 *  compared = {a:1, b:20, d: 4, e: 5}
 *  will return :
 *  {
 *      unchanged: ["a", "d"],
 *      updated: ["b"],
 *      deleted: ["f"],
 *      added: ["e"]
 *  }
 *
 * It also works with Arrays:
 *
 *  base = [10, 20, 30]
 *  compared = [15, 20]
 *  will return :
 *  {
 *      unchanged: [1],
 *      updated: [0],
 *      deleted: [2],
 *      added: []
 *  }
 *
 * @returns object
 */
module.exports = function shallowDiff(base, compared) {lacuna_lazy_load("olives-todo.js[131847:132880]", functionData => eval(functionData))};

},{"simple-loop":44}],44:[function(require,module,exports){
/**
 * @license simple-loop https://github.com/flams/simple-loop
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2015 Olivier Scherrer <pode.fr@gmail.com>
 */
"use strict";

function assert(assertion, error) {
    if (assertion) {
        throw new TypeError("simple-loop: " + error);
    }
}

/**
 * Small abstraction for looping over objects and arrays
 * Warning: it's not meant to be used with nodeList
 * To use with nodeList, convert to array first
 * @param {Array/Object} iterated the array or object to loop through
 * @param {Function} callback the function to execute for each iteration
 * @param {Object} scope the scope in which to execute the callback
 */
module.exports = function loop(iterated, callback, scope) {
    assert(typeof iterated != "object", "iterated must be an array/object");
    assert(typeof callback != "function", "callback must be a function");

    var i;

    if (Array.isArray(iterated)) {
        for (i = 0; i < iterated.length; i++) {
            callback.call(scope, iterated[i], i, iterated);
        }
    } else {
        for (i in iterated) {
            if (iterated.hasOwnProperty(i)) {
                callback.call(scope, iterated[i], i, iterated);
            }
        }
    }
};

},{}],45:[function(require,module,exports){
/**
* @license simple-mixin https://github.com/flams/simple-object-mixin
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

var loop = require("simple-loop");

/**
 * Mixes an object into another
 * @param {Object} source object to get values from
 * @param {Object} destination object to mix values into
 * @param {Boolean} optional, set to true to prevent overriding
 * @returns {Object} the destination object
 */
module.exports = function mixin(source, destination, dontOverride) {lacuna_lazy_load("olives-todo.js[134763:134943]", functionData => eval(functionData))};

},{"simple-loop":46}],46:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"assert":9,"dup":23}],47:[function(require,module,exports){
/**
* @license socketio-transport https://github.com/cosmosio/socketio-transport
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

/**
 * Defines the SocketIOTransport
 * @private
 * @param {Object} $io socket.io's object
 * @returns
 */
module.exports = function SocketIOTransportConstructor($socket) {lacuna_lazy_load("olives-todo.js[135470:139026]", functionData => eval(functionData))};

},{}],48:[function(require,module,exports){
/**
* @license socketio-transport https://github.com/cosmosio/socketio-transport
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

module.exports = {
    Client: require("./client/index"),
    Server: require("./server/index")
};

},{"./client/index":47,"./server/index":49}],49:[function(require,module,exports){
/**
* @license socketio-transport https://github.com/cosmosio/socketio-transport
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
 */
var isConnected = false;

module.exports = function registerSocketIO(io, handlers) {lacuna_lazy_load("olives-todo.js[139695:141312]", functionData => eval(functionData))};

},{}],50:[function(require,module,exports){
/**
* @license synchronous-fsm https://github.com/flams/synchronous-fsm
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

var toArray = require("to-array"),
    simpleLoop = require("simple-loop");

/**
 * @class
 * Creates a stateMachine
 *
 * @param initState {String} the initial state
 * @param diagram {Object} the diagram that describes the state machine
 * @example
 *
 *      diagram = {
 *              "State1" : [
 *                      [ message1, action, nextState], // Same as the state's add function
 *                      [ message2, action2, nextState]
 *              ],
 *
 *              "State2" :
 *                       [ message3, action3, scope3, nextState]
 *                      ... and so on ....
 *
 *   }
 *
 * @return the stateMachine object
 */
module.exports = function StateMachineConstructor($initState, $diagram) {

    /**
     * The list of states
     * @private
     */
    var _states = {},

    /**
     * The current state
     * @private
     */
    _currentState = "";

    /**
     * Set the initialization state
     * @param {String} name the name of the init state
     * @returns {Boolean}
     */
    this.init = function init(name) {
            if (_states[name]) {
                _currentState = name;
                return true;
            } else {
                return false;
            }
    };

    /**
     * Add a new state
     * @private
     * @param {String} name the name of the state
     * @returns {State} a new state
     */
    this.add = function add(name) {
        if (!_states[name]) {
            var transition = _states[name] = new Transition();
            return transition;
        } else {
            return _states[name];
        }
    };

    /**
     * Get an existing state
     * @private
     * @param {String} name the name of the state
     * @returns {State} the state
     */
    this.get = function get(name) {lacuna_lazy_load("olives-todo.js[143326:143363]", functionData => eval(functionData))};

    /**
     * Get the current state
     * @returns {String}
     */
    this.getCurrent = function getCurrent() {lacuna_lazy_load("olives-todo.js[143480:143517]", functionData => eval(functionData))};

    /**
     * Tell if the state machine has the given state
     * @param {String} state the name of the state
     * @returns {Boolean} true if it has the given state
     */
    this.has = function has(state) {lacuna_lazy_load("olives-todo.js[143732:143785]", functionData => eval(functionData))};

    /**
     * Advances the state machine to a given state
     * @param {String} state the name of the state to advance the state machine to
     * @returns {Boolean} true if it has the given state
     */
    this.advance = function advance(state) {lacuna_lazy_load("olives-todo.js[144038:144189]", functionData => eval(functionData))};

    /**
     * Pass an event to the state machine
     * @param {String} name the name of the event
     * @returns {Boolean} true if the event exists in the current state
     */
    this.event = function event(name) {
        var nextState;

        nextState = _states[_currentState].event.apply(_states[_currentState].event, toArray(arguments));
        // False means that there's no such event
        // But undefined means that the state doesn't change
        if (nextState === false) {
            return false;
        } else {
            // There could be no next state, so the current one remains
            if (nextState) {
                // Call the exit action if any
                _states[_currentState].event("exit");
                _currentState = nextState;
                // Call the new state's entry action if any
                _states[_currentState].event("entry");
            }
            return true;
        }
    };

    /**
     * Initializes the StateMachine with the given diagram
     */
    if ($diagram) {
        simpleLoop($diagram, function (transition, state) {
            var myState = this.add(state);
            transition.forEach(function (params){
                myState.add.apply(null, params);
            });
        }, this);
    }

    /**
     * Sets its initial state
     */
    this.init($initState);
};

/**
 * Each state has associated transitions
 * @constructor
 */
function Transition() {

    /**
     * The list of transitions associated to a state
     * @private
     */
    var _transitions = {};

    /**
     * Add a new transition
     * @private
     * @param {String} event the event that will trigger the transition
     * @param {Function} action the function that is executed
     * @param {Object} scope [optional] the scope in which to execute the action
     * @param {String} next [optional] the name of the state to transit to.
     * @returns {Boolean} true if success, false if the transition already exists
     */
    this.add = function add(event, action, scope, next) {

        var arr = [];

        if (_transitions[event]) {
            return false;
        }

        if (typeof event == "string" &&
            typeof action == "function") {

                arr[0] = action;

                if (typeof scope == "object") {
                    arr[1] = scope;
                }

                if (typeof scope == "string") {
                    arr[2] = scope;
                }

                if (typeof next == "string") {
                    arr[2] = next;
                }

                _transitions[event] = arr;
                return true;
        }

        return false;
    };

    /**
     * Check if a transition can be triggered with given event
     * @private
     * @param {String} event the name of the event
     * @returns {Boolean} true if exists
     */
    this.has = function has(event) {lacuna_lazy_load("olives-todo.js[147113:147158]", functionData => eval(functionData))};

    /**
     * Get a transition from it's event
     * @private
     * @param {String} event the name of the event
     * @return the transition
     */
    this.get = function get(event) {lacuna_lazy_load("olives-todo.js[147349:147401]", functionData => eval(functionData))};

    /**
     * Execute the action associated to the given event
     * @param {String} event the name of the event
     * @param {params} params to pass to the action
     * @private
     * @returns false if error, the next state or undefined if success (that sounds weird)
     */
    this.event = function event(newEvent) {
        var _transition = _transitions[newEvent];
        if (_transition) {
            _transition[0].apply(_transition[1], toArray(arguments).slice(1));
            return _transition[2];
        } else {
            return false;
        }
    };
}

},{"simple-loop":51,"to-array":52}],51:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"assert":9,"dup":23}],52:[function(require,module,exports){
module.exports = toArray

function toArray(list, index) {
    var array = []

    index = index || 0

    for (var i = index || 0; i < list.length; i++) {
        array[i - index] = list[i]
    }

    return array
}

},{}],53:[function(require,module,exports){
/**
* @license transport https://github.com/cosmosio/transport
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

/**
 * @class
 * Transport hides and centralizes the logic behind requests.
 * It can issue requests to request handlers, which in turn can issue requests
 * to anything your node.js server has access to (HTTP, FileSystem, SIP...)
 * @param {Emily Store} [optionanl] $reqHandlers an object containing the request handlers
 * @returns
 */
module.exports = function TransportConstructor($reqHandlers) {lacuna_lazy_load("olives-todo.js[148993:151844]", functionData => eval(functionData))};

},{}],54:[function(require,module,exports){
/**
* @license url-highway https://github.com/cosmosio/url-highway
*
* The MIT License (MIT)
*
* Copyright (c) 2014-2016 Olivier Scherrer <pode.fr@gmail.com>
*/
var Highway = require("highway"),
    toArray = require("to-array");

/**
 * @class
 * UrlHighway is a router which navigates to the route defined in the URL and updates this URL
 * while navigating. It's a subtype of Highway
 */
function UrlHighway() {
    "use strict";

    /**
     * The handle on the watch
     * @private
     */
    var _watchHandle,

    /**
     * The default route to navigate to when nothing is supplied in the url
     * @private
     */
    _defaultRoute = "",

    /**
     * The last route that was navigated to
     * @private
     */
    _lastRoute;

    /**
     * Navigates to the current hash or to the default route if none is supplied in the url
     * @private
     */
     /*jshint validthis:true*/
    function doNavigate() {
        if (!hashIsEmpty()) {
            var parsedHash = this.parse(window.location.hash);
            this.navigate.apply(this, parsedHash);
        } else {
            this.navigate(_defaultRoute);
        }
    }

    /**
     * An empty string or # are both empty hashes
     */
    function hashIsEmpty() {
        return !window.location.hash || window.location.hash == "#";
    }

    /**
     * Set the default route to navigate to when nothing is defined in the url
     * @param {String} defaultRoute the defaultRoute to navigate to
     * @returns {Boolean} true if it's not an empty string
     */
    this.setDefaultRoute = function setDefaultRoute(defaultRoute) {
        if (defaultRoute && typeof defaultRoute == "string") {
            _defaultRoute = defaultRoute;
            return true;
        } else {
            return false;
        }
    };

    /**
     * Get the currently set default route
     * @returns {String} the default route
     */
    this.getDefaultRoute = function getDefaultRoute() {lacuna_lazy_load("olives-todo.js[153848:153885]", functionData => eval(functionData))};

    /**
     * The function that parses the url to determine the route to navigate to.
     * It has a default behavior explained below, but can be overriden as long as
     * it has the same contract.
     * @param {String} hash the hash coming from window.location.has
     * @returns {Array} has to return an array with the list of arguments to call
     *    navigate with. The first item of the array must be the name of the route.
     *
     * Example: #album/holiday/2013
     *      will navigate to the route "album" and give two arguments "holiday" and "2013"
     */
    this.parse = function parse(hash) {lacuna_lazy_load("olives-todo.js[154505:154561]", functionData => eval(functionData))};

    /**
     * The function that converts, or serialises the route and its arguments to a valid URL.
     * It has a default behavior below, but can be overriden as long as it has the same contract.
     * @param {Array} args the list of arguments to serialize
     * @returns {String} the serialized arguments to add to the url hashmark
     *
     * Example:
     *      ["album", "holiday", "2013"];
     *      will give "album/holiday/2013"
     *
     */
    this.toUrl = function toUrl(args) {
        return args.join("/");
    };

    /**
     * When all the routes and handlers have been defined, start the location router
     * so it parses the URL and navigates to the corresponding route.
     * It will also start listening to route changes and hashmark changes to navigate.
     * While navigating, the hashmark itself will also change to reflect the current route state
     */
    this.start = function start(defaultRoute) {
        this.setDefaultRoute(defaultRoute);
        doNavigate.call(this);
        this.bindOnHashChange();
        this.bindOnRouteChange();
    };

    /**
     * Remove the events handler for cleaning.
     */
    this.stop = function stop() {lacuna_lazy_load("olives-todo.js[155752:155875]", functionData => eval(functionData))};

    /**
     * Parse the hash and navigate to the corresponding url
     * @private
     */
    this.onHashChange  = function onHashChange() {
        if (window.location.hash != _lastRoute) {
            doNavigate.call(this);
        }
    };

    /**
     * The bound version of onHashChange for add/removeEventListener
     * @private
     */
    this.boundOnHashChange = this.onHashChange.bind(this);

    /**
     * Add an event listener to hashchange to navigate to the corresponding route
     * when it changes
     * @private
     */
    this.bindOnHashChange = function bindOnHashChange() {
        window.addEventListener("hashchange", this.boundOnHashChange, true);
    };

    /**
     * Watch route change events from the router to update the location
     * @private
     */
    this.bindOnRouteChange = function bindOnRouteChange() {
        _watchHandle = this.watch(this.onRouteChange, this);
    };

    /**
     * The handler for when the route changes
     * It updates the location
     * @private
     */
    this.onRouteChange = function onRouteChange() {
        window.location.hash = this.toUrl(toArray(arguments));
        _lastRoute = window.location.hash;
    };

    /**
     * Get the last, or current, route we've navigated to
     * @returns {string}
     */
    this.getLastRoute = function getLastRoute() {
        return _lastRoute;
    };
}

module.exports = function UrlHighwayFactory() {
    UrlHighway.prototype = new Highway();
    UrlHighway.constructor = Highway;
    return new UrlHighway();
};

},{"highway":55,"to-array":52}],55:[function(require,module,exports){
/**
 * @license highway https://github.com/cosmosio/highway
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2016 Olivier Scherrer <pode.fr@gmail.com>
 */
"use strict";

var Observable = require("watch-notify"),
    toArray = require("to-array");

/**
 * @class
 * Routing allows for navigating in an application by defining routes.
 */
module.exports = function HighwayConstructor() {

    /**
     * The routes observable (the applications use it)
     * @private
     */
    var _routes = new Observable(),

        /**
         * The events observable (used by Routing)
         * @private
         */
        _events = new Observable(),

        /**
         * The routing history
         * @private
         */
        _history = [],

        /**
         * For navigating through the history, remembers the current position
         * @private
         */
        _currentPos = -1,

        /**
         * The max history depth
         * @private
         */
        _maxHistory = 10;

    /**
     * Set a new route
     * @param {String} route the name of the route
     * @param {Function} func the function to be execute when navigating to the route
     * @param {Object} scope the scope in which to execute the function
     * @returns a handle to remove the route
     */
    this.set = function set() {lacuna_lazy_load("olives-todo.js[158812:158875]", functionData => eval(functionData))};

    /**
     * Remove a route
     * @param {Object} handle the handle provided by the set method
     * @returns true if successfully removed
     */
    this.unset = function unset(handle) {lacuna_lazy_load("olives-todo.js[159069:159116]", functionData => eval(functionData))};

    /**
     * Navigate to a route
     * @param {String} route the route to navigate to
     * @param {*} as many params as necessary
     * @returns
     */
    this.navigate = function navigate(route) {
        clearForwardHistory();
        _history.push(toArray(arguments));
        ensureMaxHistory();
        _currentPos = _history.length - 1;
        load.apply(this, arguments);
    };

    /**
     * Go back and forth in the history
     * @param {Number} nb the number of jumps in the history. Use negative number to go back.
     * @returns true if history exists
     */
    this.go = function go(nb) {lacuna_lazy_load("olives-todo.js[159734:159962]", functionData => eval(functionData))};

    /**
     * Go back in the history, short for go(-1)
     * @returns true if it was able to go back
     */
    this.back = function back() {lacuna_lazy_load("olives-todo.js[160108:160143]", functionData => eval(functionData))};

    /**
     * Go forward in the history, short for go(1)
     * @returns true if it was able to go forward
     */
    this.forward = function forward() {lacuna_lazy_load("olives-todo.js[160300:160334]", functionData => eval(functionData))};

    /**
     * Watch for route changes
     * @param {Function} func the func to execute when the route changes
     * @param {Object} scope the scope in which to execute the function
     * @returns {Object} the handle to unwatch for route changes
     */
    this.watch = function watch(func, scope) {
        return _events.watch("route", func, scope);
    };

    /**
     * Unwatch routes changes
     * @param {Object} handle the handle was returned by the watch function
     * @returns true if unwatch
     */
    this.unwatch = function unwatch(handle) {lacuna_lazy_load("olives-todo.js[160899:160946]", functionData => eval(functionData))};

    /**
     * Set the maximum length of history
     * As the user navigates through the application, the
     * router keeps track of the history. Set the depth of the history
     * depending on your need and the amount of memory that you can allocate it
     * @param {Number} maxHistory the depth of history
     * @returns {Boolean} true if maxHistory is equal or greater than 0
     */
    this.setMaxHistory = function setMaxHistory(maxHistory) {lacuna_lazy_load("olives-todo.js[161402:161588]", functionData => eval(functionData))};

    /**
     * Get the current max history setting
     * @returns {Number} the depth of history
     */
    this.getMaxHistory = getMaxHistory;

    /**
     * Get the current length of history
     * @returns {Number} the length of history
     */
    this.getHistoryCount = function getHistoryCount() {lacuna_lazy_load("olives-todo.js[161895:161934]", functionData => eval(functionData))};

    /**
     * Flush the entire history
     */
    this.clearHistory = function clearHistory() {lacuna_lazy_load("olives-todo.js[162033:162069]", functionData => eval(functionData))};

    /**
     * Get a route from the history or the entire historic
     * @param index
     * @returns {*}
     */
    this.getHistory = function getHistory(index) {lacuna_lazy_load("olives-todo.js[162236:162400]", functionData => eval(functionData))};

    function load() {
        var copy = toArray(arguments);

        _routes.notify.apply(_routes, copy);
        copy.unshift("route");
        _events.notify.apply(_events, copy);
    }

    function getMaxHistory() {
        return _maxHistory;
    }

    function ensureMaxHistory() {
        var count = _history.length,
            max = getMaxHistory(),
            excess = count - max;

        if (excess > 0) {
            _history.splice(0, excess);
        }
    }

    function clearForwardHistory() {
        _history.splice(_currentPos + 1, _history.length);
    }
};

},{"to-array":52,"watch-notify":58}],56:[function(require,module,exports){
module.exports = function isBuffer(arg) {lacuna_lazy_load("olives-todo.js[163104:163267]", functionData => eval(functionData))}
},{}],57:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {lacuna_lazy_load("olives-todo.js[164534:165357]", functionData => eval(functionData))};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {lacuna_lazy_load("olives-todo.js[165552:166167]", functionData => eval(functionData))};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {lacuna_lazy_load("olives-todo.js[166239:166702]", functionData => eval(functionData))};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {lacuna_lazy_load("olives-todo.js[167023:167728]", functionData => eval(functionData))}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {lacuna_lazy_load("olives-todo.js[168439:168647]", functionData => eval(functionData))}


function stylizeNoColor(str, styleType) {lacuna_lazy_load("olives-todo.js[168690:168707]", functionData => eval(functionData))}


function arrayToHash(array) {lacuna_lazy_load("olives-todo.js[168738:168840]", functionData => eval(functionData))}


function formatValue(ctx, value, recurseTimes) {lacuna_lazy_load("olives-todo.js[168890:171959]", functionData => eval(functionData))}


function formatPrimitive(ctx, value) {lacuna_lazy_load("olives-todo.js[171999:172628]", functionData => eval(functionData))}


function formatError(value) {lacuna_lazy_load("olives-todo.js[172659:172721]", functionData => eval(functionData))}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {lacuna_lazy_load("olives-todo.js[172790:173239]", functionData => eval(functionData))}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {lacuna_lazy_load("olives-todo.js[173317:174859]", functionData => eval(functionData))}


function reduceToSingleString(output, base, braces) {lacuna_lazy_load("olives-todo.js[174914:175389]", functionData => eval(functionData))}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {lacuna_lazy_load("olives-todo.js[175562:175593]", functionData => eval(functionData))}
exports.isArray = isArray;

function isBoolean(arg) {lacuna_lazy_load("olives-todo.js[175646:175684]", functionData => eval(functionData))}
exports.isBoolean = isBoolean;

function isNull(arg) {lacuna_lazy_load("olives-todo.js[175738:175764]", functionData => eval(functionData))}
exports.isNull = isNull;

function isNullOrUndefined(arg) {lacuna_lazy_load("olives-todo.js[175823:175848]", functionData => eval(functionData))}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {lacuna_lazy_load("olives-todo.js[175920:175957]", functionData => eval(functionData))}
exports.isNumber = isNumber;

function isString(arg) {lacuna_lazy_load("olives-todo.js[176011:176048]", functionData => eval(functionData))}
exports.isString = isString;

function isSymbol(arg) {lacuna_lazy_load("olives-todo.js[176102:176139]", functionData => eval(functionData))}
exports.isSymbol = isSymbol;

function isUndefined(arg) {lacuna_lazy_load("olives-todo.js[176196:176224]", functionData => eval(functionData))}
exports.isUndefined = isUndefined;

function isRegExp(re) {lacuna_lazy_load("olives-todo.js[176283:176353]", functionData => eval(functionData))}
exports.isRegExp = isRegExp;

function isObject(arg) {lacuna_lazy_load("olives-todo.js[176407:176460]", functionData => eval(functionData))}
exports.isObject = isObject;

function isDate(d) {lacuna_lazy_load("olives-todo.js[176510:176576]", functionData => eval(functionData))}
exports.isDate = isDate;

function isError(e) {lacuna_lazy_load("olives-todo.js[176623:176720]", functionData => eval(functionData))}
exports.isError = isError;

function isFunction(arg) {lacuna_lazy_load("olives-todo.js[176774:176813]", functionData => eval(functionData))}
exports.isFunction = isFunction;

function isPrimitive(arg) {lacuna_lazy_load("olives-todo.js[176874:177099]", functionData => eval(functionData))}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {lacuna_lazy_load("olives-todo.js[177214:177261]", functionData => eval(functionData))}


function pad(n) {lacuna_lazy_load("olives-todo.js[177280:177340]", functionData => eval(functionData))}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {lacuna_lazy_load("olives-todo.js[177497:177698]", functionData => eval(functionData))}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {lacuna_lazy_load("olives-todo.js[177797:177881]", functionData => eval(functionData))};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {lacuna_lazy_load("olives-todo.js[178581:178803]", functionData => eval(functionData))};

function hasOwnProperty(obj, prop) {lacuna_lazy_load("olives-todo.js[178841:178902]", functionData => eval(functionData))}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":56,"_process":38,"inherits":21}],58:[function(require,module,exports){
/**
* @license watch-notify https://github.com/flams/watch-notify
*
* The MIT License (MIT)
*
* Copyright (c) 2014-2015 Olivier Scherrer <pode.fr@gmail.com>
*/
"use strict";

var assert = require("assert");

var loop = require("simple-loop"),
  toArray = require("to-array");

/**
* @class
* Observable is an implementation of the Observer design pattern,
* which is also known as publish/subscribe.
*
* This service creates an Observable to which you can add subscribers.
*
* @returns {Observable}
*/
module.exports = function WatchNotifyConstructor() {

    /**
     * The list of topics
     * @private
     */
    var _topics = {};

    /**
     * Add an observer
     * @param {String} topic the topic to observe
     * @param {Function} callback the callback to execute
     * @param {Object} scope the scope in which to execute the callback
     * @returns handle
     */
    this.watch = function watch(topic, callback, scope) {
        if (typeof callback == "function") {
            var observers = _topics[topic] = _topics[topic] || [],
            observer = [callback, scope];

            observers.push(observer);
            return [topic, observers.indexOf(observer)];
        } else {
            return false;
        }
    };

    /**
     * Listen to an event just once before removing the handler
     * @param {String} topic the topic to observe
     * @param {Function} callback the callback to execute
     * @param {Object} scope the scope in which to execute the callback
     * @returns handle
     */
    this.once = function once(topic, callback, scope) {lacuna_lazy_load("olives-todo.js[180740:180921]", functionData => eval(functionData))};

    /**
     * Remove an observer
     * @param {Handle} handle returned by the watch method
     * @returns {Boolean} true if there were subscribers
     */
    this.unwatch = function unwatch(handle) {lacuna_lazy_load("olives-todo.js[181126:181635]", functionData => eval(functionData))};

    /**
     * Notifies observers that a topic has a new message
     * @param {String} topic the name of the topic to publish to
     * @param subject
     * @returns {Boolean} true if there was subscribers
     */
    this.notify = function notify(topic) {
        var observers = _topics[topic],
            args = toArray(arguments).slice(1);

        if (observers) {
            loop(observers, function (value) {
                try {
                    if (value) {
                        value[0].apply(value[1] || null, args);
                    }
                } catch (err) {
                    console.error("[Watch-notify] publishing on '" + topic + "'' threw an error: " + err);
                }
            });
            return true;
        } else {
            return false;
        }
    };

    /**
     * Check if topic has the described observer
     * @param {Handle}
     * @returns {Boolean} true if exists
     */
    this.hasObserver = function hasObserver(handle) {lacuna_lazy_load("olives-todo.js[182639:182729]", functionData => eval(functionData))};

    /**
     * Check if a topic has observers
     * @param {String} topic the name of the topic
     * @returns {Boolean} true if topic is listened
     */
    this.hasTopic = function hasTopic(topic) {lacuna_lazy_load("olives-todo.js[182934:182974]", functionData => eval(functionData))};

    /**
     * Unwatch all or unwatch all from topic
     * @param {String} topic optional unwatch all from topic
     * @returns {Boolean} true if ok
     */
    this.unwatchAll = function unwatchAll(topic) {lacuna_lazy_load("olives-todo.js[183185:183331]", functionData => eval(functionData))};
};

},{"assert":9,"simple-loop":59,"to-array":52}],59:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"assert":9,"dup":23}]},{},[1]);
