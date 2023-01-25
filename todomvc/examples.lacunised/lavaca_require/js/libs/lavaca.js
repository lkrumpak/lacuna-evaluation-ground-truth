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
(function() {
//just a shim for cordova, because the actual dependency will differ between
//Android and iOS
define('cordova',[],function() {
  return window.cordova;
});

define('lavaca/util/extend',[],function() {
  /**
   * Establishes inheritance between types. After a type is extended, it receives its own static
   * convenience method, extend(TSub, overrides).
   * @class lavaca.util.extend
   */
   /**
   * Establishes inheritance between types. After a type is extended, it receives its own static
   * convenience method, extend(TSub, overrides).
   * @method extend
   * @static
   *
   */
   /**
   * Establishes inheritance between types. After a type is extended, it receives its own static
   * convenience method, extend(TSub, overrides).
   * @method extend
   * @static
   * @param {Function} TSub  The child type which will inherit from superType
   * @param {Object} overrides  A hash of key-value pairs that will be added to the subType
   * @return {Function}  The subtype
   *
   */
   /**
   * Establishes inheritance between types. After a type is extended, it receives its own static
   * convenience method, extend(TSub, overrides).
   * @method extend
   * @static
   * @param {Function} TSuper  The base type to extend
   * @param {Function} TSub  The child type which will inherit from superType
   * @param {Object} overrides  A hash of key-value pairs that will be added to the subType
   * @return {Function}  The subtype
   */
  var extend = function(TSuper, TSub, overrides) {
    if (typeof TSuper === 'object') {
      overrides = TSuper;
      TSuper = Object;
      TSub = function() {
        // Empty
      };
    } else if (typeof TSub === 'object') {
      overrides = TSub;
      TSub = TSuper;
      TSuper = Object;
    }
    function ctor() {
      // Empty
    }
    ctor.prototype = TSuper.prototype;
    TSub.prototype = new ctor;
    TSub.prototype.constructor = TSub;
    if (overrides) {
      for (var name in overrides) {
        TSub.prototype[name] = overrides[name];
      }
    }
    TSub.extend = function(T, overrides) {
      if (typeof T === 'object') {
        overrides = T;
        T = function() {
          TSub.apply(this, arguments);
        };
      }
      extend(TSub, T, overrides);
      return T;
    };
    return TSub;
  };

  return extend;

});

define('lavaca/util/Promise',['require','./extend'],function(require) {

  var extend = require('./extend');

  /**
   * Utility type for asynchronous programming
   * @class lavaca.util.Promise
   *
   * @constructor
   *
   * @param {Object} thisp  What the "this" keyword resolves to in callbacks
   */
  var Promise = extend(function(thisp) {
    /**
     * What the "this" keyword resolves to in callbacks
     * @property {Object} thisp
     * @default null
     */
    this.thisp = thisp;
    /**
     * Pending handlers for the success event
     * @property {Array} resolvedQueue
     * @default []
     */
    this.resolvedQueue = [];
    /**
     * Pending handlers for the error event
     * @property {Array} rejectedQueue
     * @default []
     */
    this.rejectedQueue = [];
  }, {
    /**
     * Flag indicating that the promise completed successfully
     * @property {Boolean} succeeded
     * @default false
     */
    succeeded: false,
    /**
     * Flag indicating that the promise failed to complete
     * @property {Boolean} failed
     * @default false
     */
    failed: false,
    /**
     * Queues a callback to be executed when the promise succeeds
     * @method success
     *
     * @param {Function} callback  The callback to execute
     * @return {Lavaca.util.Promise}  This promise (for chaining)
     */
    success: function(callback) {
      if (callback) {
        if (this.succeeded) {
          callback.apply(this.thisp, this.resolveArgs);
        } else {
          this.resolvedQueue.push(callback);
        }
      }
      return this;
    },
    /**
     * Queues a callback to be executed when the promise fails
     * @method error
     *
     * @param {Function} callback  The callback to execute
     * @return {Lavaca.util.Promise}  This promise (for chaining)
     */
    error: function(callback) {
      if (callback) {
        if (this.failed) {
          callback.apply(this.thisp, this.rejectArgs);
        } else {
          this.rejectedQueue.push(callback);
        }
      }
      return this;
    },
    /**
     * Queues a callback to be executed when the promise is either rejected or resolved
     * @method always
     *
     * @param {Function} callback  The callback to execute
     * @return {Lavaca.util.Promise}  This promise (for chaining)
     */
    always: function(callback) {
      return this.then(callback, callback);
    },
    /**
     * Queues up callbacks after the promise is completed
     * @method then
     *
     * @param {Function} resolved  A callback to execute when the operation succeeds
     * @param {Function} rejected  A callback to execute when the operation fails
     * @return {Lavaca.util.Promise}  This promise (for chaining)
     */
    then: function(resolved, rejected) {
      return this
        .success(resolved)
        .error(rejected);
    },
    /**
     * Resolves the promise successfully
     * @method resolve
     *
     * @params {Object} value  Values to pass to the queued success callbacks
     * @return {Lavaca.util.Promise}  This promise (for chaining)
     */
    resolve: function(/* value1, value2, valueN */) {
      if (!this.succeeded && !this.failed) {
        this.succeeded = true;
        this.resolveArgs = [].slice.call(arguments, 0);
        var i = -1,
            callback;
        while (!!(callback = this.resolvedQueue[++i])) {
          callback.apply(this.thisp, this.resolveArgs);
        }
      }
      return this;
    },
    /**
     * Resolves the promise as a failure
     * @method reject
     *
     * @params {String} err  Failure messages
     * @return {Lavaca.util.Promise}  This promise (for chaining)
     */
    reject: function(/* err1, err2, errN */) {lacuna_lazy_load("js/libs/lavaca.js[6051:6377]", functionData => eval(functionData))},
    /**
     * Queues this promise to be resolved only after several other promises
     *   have been successfully resolved, or immediately rejected when one
     *   of those promises is rejected
     * @method when
     *
     * @params {Lavaca.util.Promise}  promise  One or more other promises
     * @return {Lavaca.util.Promise}  This promise (for chaining)
     */
    when: function(/* promise1, promise2, promiseN */) {
      var self = this,
          values = [],
          i = -1,
          pendingPromiseCount = arguments.length,
          promise;
      while (!!(promise = arguments[++i])) {
        (function(index) {
          promise
            .success(function(v) {
              values[index] = v;
              if (--pendingPromiseCount < 1) {
                self.resolve.apply(self, values);
              }
            })
            .error(function() {lacuna_lazy_load("js/libs/lavaca.js[7258:7323]", functionData => eval(functionData))});
        })(i);
      }
      promise = null;
      return this;
    },
    /**
     * Produces a callback that resolves the promise with any number of arguments
     * @method resolver
     * @return {Function}  The callback
     */
    resolver: function() {
      var self = this;
      return function() {
        self.resolve.apply(self, arguments);
      };
    },
    /**
     * Produces a callback that rejects the promise with any number of arguments
     * @method rejector
     *
     * @return {Function}  The callback
     */
    rejector: function() {
      var self = this;
      return function() {lacuna_lazy_load("js/libs/lavaca.js[7938:7991]", functionData => eval(functionData))};
    }
  });
  /**
   *
   * Creates a promise to be resolved only after several other promises
   *   have been successfully resolved, or immediately rejected when one
   *   of those promises is rejected
   * @method when
   * @static
   * @params {Lavaca.util.Promise}  promise  One or more other promises
   * @return {Lavaca.util.Promise}  The new promise
   */
   /**
   * Creates a promise to be resolved only after several other promises
   *   have been successfully resolved, or immediately rejected when one
   *   of those promises is rejected
   * @method when
   * @static
   * @param {Object} thisp  The execution context of the promise
   * @params {Lavaca.util.Promise}  promise  One or more other promises
   * @return {Lavaca.util.Promise}  The new promise
   */
  Promise.when = function(thisp/*, promise1, promise2, promiseN */) {
    var thispIsPromise = thisp instanceof Promise,
        promise = new Promise(thispIsPromise ? window : thisp),
        args = [].slice.call(arguments, thispIsPromise ? 0 : 1);
    return promise.when.apply(promise, args);
  };

  return Promise;

});

define('lavaca/env/Device',['require','$','cordova','lavaca/util/Promise'],function(require) {

  var $ = require('$'),
      Cordova = require('cordova'),
      Promise = require('lavaca/util/Promise');

  /**
   * Static utility type for working with Cordova (aka PhoneGap) and other non-standard native functionality
   * @class lavaca.env.Device
   */

  var _initHasRun = false,
      _onInit = [];

  var Device = {};

  /**
   * Indicates whether or not the app is being run through Cordova
   * @method isCordova
   * @static
   *
   * @return {Boolean}  True if app is being run through Cordova
   */
  Device.isCordova = function() {lacuna_lazy_load("js/libs/lavaca.js[9742:9769]", functionData => eval(functionData))};
  /**
   * Registers a plugin to be initialized when the device is ready
   * @method register
   * @static
   *
   * @param {String} name
   * @param {Function} TPlugin  The plugin to register. The plugin should be a constructor function
   */
  Device.register = function(name, TPlugin) {
    function install() {
      if (!window.plugins) {
        window.plugins = {};
      }
      window.plugins[name] = new TPlugin();
    }
    if (_initHasRun) {
      install();
    } else {
      _onInit.push(install);
    }
  };

  /**
   * Executes a Cordova command, if Cordova is available
   * @method exec
   * @static
   *
   * @param {String} className  The name of the native class
   * @param {String} methodName  The name of the class method to call
   * @param {Array} args  Arguments to pass the method
   * @return {Lavaca.util.Promise}  A promise
   */
  Device.exec = function(className, methodName, args) {lacuna_lazy_load("js/libs/lavaca.js[10688:10903]", functionData => eval(functionData))};

  /**
   * Executes a callback when the device is ready to be used
   * @method init
   * @static
   *
   * @param {Function} callback  The handler to execute when the device is ready
   */
  Device.init = function(callback) {
    if (!Cordova) {
      $(document).ready(callback);
    }
    else if (document.addEventListener) {
      // Android fix
      document.addEventListener('deviceready', callback, false);
    } else {
      $(document).on('deviceready', callback);
    }
  };

  $(document).ready(function() {
    var i = -1,
        installPlugin;
    while (!!(installPlugin = _onInit[++i])) {
      installPlugin();
    }
    _initHasRun = true;
  });

  return Device;

});

define('lavaca/util/Disposable',['require','./extend'],function(require) {

  var extend = require('./extend');

  function _disposeOf(obj) {
    var n,
        o,
        i;
    for (n in obj) {
      if (obj.hasOwnProperty(n)) {
        o = obj[n];
          if (o) {
            if (typeof o === 'object' && typeof o.dispose === 'function') {
              o.dispose();
            } else if (o instanceof Array) {
              for (i = o.length - 1; i > -1; i--) {
                  if (o[i] && typeof o[i].dispose === 'function') {
                    o[i].dispose();
                  } else {
                    _disposeOf(o[i]);
                  }
                }
            }
          }
        }
    }
  }

  /**
   * Abstract type for types that need to ready themselves for GC
   * @class lavaca.util.Disposable
   * @constructor
   *
   */
  var Disposable = extend({
    /**
     * Readies the object to be garbage collected
     * @method dispose
     *
     */
    dispose: function() {
        _disposeOf(this);
    }
  });

  return Disposable;

});
define('mout/object/hasOwn',[],function () {

    /**
     * Safer Object.hasOwnProperty
     */
     function hasOwn(obj, prop){
         return Object.prototype.hasOwnProperty.call(obj, prop);
     }

     return hasOwn;

});

define('mout/object/forIn',[],function () {

    var _hasDontEnumBug,
        _dontEnums;

    function checkDontEnum(){
        _dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ];

        _hasDontEnumBug = true;

        for (var key in {'toString': null}) {
            _hasDontEnumBug = false;
        }
    }

    /**
     * Similar to Array/forEach but works over object properties and fixes Don't
     * Enum bug on IE.
     * based on: http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
     */
    function forIn(obj, fn, thisObj){
        var key, i = 0;
        // no need to check if argument is a real object that way we can use
        // it for arrays, functions, date, etc.

        //post-pone check till needed
        if (_hasDontEnumBug == null) checkDontEnum();

        for (key in obj) {
            if (exec(fn, obj, key, thisObj) === false) {
                break;
            }
        }

        if (_hasDontEnumBug) {
            while (key = _dontEnums[i++]) {
                // since we aren't using hasOwn check we need to make sure the
                // property was overwritten
                if (obj[key] !== Object.prototype[key]) {
                    if (exec(fn, obj, key, thisObj) === false) {
                        break;
                    }
                }
            }
        }
    }

    function exec(fn, obj, key, thisObj){
        return fn.call(thisObj, obj[key], key, obj);
    }

    return forIn;

});

define('mout/object/forOwn',['./hasOwn', './forIn'], function (hasOwn, forIn) {

    /**
     * Similar to Array/forEach but works over object properties and fixes Don't
     * Enum bug on IE.
     * based on: http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
     */
    function forOwn(obj, fn, thisObj){
        forIn(obj, function(val, key){
            if (hasOwn(obj, key)) {
                return fn.call(thisObj, obj[key], key, obj);
            }
        });
    }

    return forOwn;

});

define('mout/lang/isPlainObject',[],function () {

    /**
     * Checks if the value is created by the `Object` constructor.
     */
    function isPlainObject(value) {
        return (!!value
            && typeof value === 'object'
            && value.constructor === Object);
    }

    return isPlainObject;

});

define('mout/object/deepMixIn',['./forOwn', '../lang/isPlainObject'], function (forOwn, isPlainObject) {

    /**
     * Mixes objects into the target object, recursively mixing existing child
     * objects.
     */
    function deepMixIn(target, objects) {
        var i = 0,
            n = arguments.length,
            obj;

        while(++i < n){
            obj = arguments[i];
            if (obj) {
                forOwn(obj, copyProp, target);
            }
        }

        return target;
    }

    function copyProp(val, key) {
        var existing = this[key];
        if (isPlainObject(val) && isPlainObject(existing)) {
            deepMixIn(existing, val);
        } else {
            this[key] = val;
        }
    }

    return deepMixIn;

});

define('lavaca/events/EventDispatcher',['require','lavaca/util/Disposable','mout/object/deepMixIn'],function(require) {

  var Disposable = require('lavaca/util/Disposable'),
      deepMixIn = require('mout/object/deepMixIn');

  /**
   * Basic event dispatcher type
   * @class lavaca.events.EventDispatcher
   * @extends lavaca.util.Disposable
   * @constructor
   *
   */
  var EventDispatcher = Disposable.extend({
    /**
     * When true, do not fire events
     * @property suppressEvents
     * @type Boolean
     * @default false
     *
     */
    suppressEvents: false,
    /**
     * Bind an event handler to this object
     * @method on
     *
     * @param {String} type  The name of the event
     * @param {Function} callback  The function to execute when the event occurs
     * @return {Lavaca.events.EventDispatcher}  This event dispatcher (for chaining)
     */
    /**
     * Bind an event handler to this object
     * @method on
     *
     * @param {String} type  The name of the event
     * @param {Function} callback  The function to execute when the event occurs
     * @param {Object} thisp  The context of the handler
     * @return {Lavaca.events.EventDispatcher}  This event dispatcher (for chaining)
     */
    on: function(type, callback, thisp) {
      var calls = this.callbacks || (this.callbacks = {}),
          list = calls[type] || (calls[type] = []);
      list[list.length] = {fn: callback, thisp: thisp};
      return this;
    },
    /**
     * Unbinds all event handler from this object
     * @method off
     *
     * @return {Lavaca.events.EventDispatcher}  This event dispatcher (for chaining)
     */
    /**
     * Unbinds all event handlers for an event
     * @method off
     *
     * @param {String} type  The name of the event
     * @return {Lavaca.events.EventDispatcher}  This event dispatcher (for chaining)
     */
    /**
     * Unbinds a specific event handler
     * @method off
     *
     * @param {String} type  The name of the event
     * @param {Function} callback  The function handling the event
     * @return {Lavaca.events.EventDispatcher}  This event dispatcher (for chaining)
     */
    /**
     * Unbinds a specific event handler
     * @method off
     *
     * @param {String} type  The name of the event
     * @param {Function} callback  The function handling the event
     * @param {Object} thisp  The context of the handler
     * @return {Lavaca.events.EventDispatcher}  This event dispatcher (for chaining)
     */
    off: function(type, callback, thisp) {lacuna_lazy_load("js/libs/lavaca.js[18773:19847]", functionData => eval(functionData))},
    /**
     * Dispatches an event
     * @method trigger
     *
     * @param {String} type  The type of event to dispatch
     * @return {Lavaca.events.EventDispatcher}  This event dispatcher (for chaining)
     */
    /**
     * Dispactches an event with additional parameters
     * @method trigger
     *
     * @param {String} type  The type of event to dispatch
     * @param {Object} params  Additional data points to add to the event
     * @return {Lavaca.events.EventDispatcher}  This event dispatcher (for chaining)
     */
    trigger: function(type, params) {
      if (!this.suppressEvents && this.callbacks) {
        var list = this.callbacks[type],
            event = this.createEvent(type, params),
            i = -1,
            handler;
        if (list) {
          while (!!(handler = list[++i])) {
            handler.fn.apply(handler.thisp || this, [event]);
          }
        }
      }
      return this;
    },
    /**
     * Creates an event object
     * @method createEvent
     *
     * @param {String} type  The type of event to create
     * @return {Object}  The event object
     */
     /**
     * Creates an event object with additional params
     * @method createEvent
     *
     * @param {String} type  The type of event to create
     * @param {Object} params  Additional data points to add to the event
     * @return {Object}  The event object
     */
    createEvent: function(type, params) {
      return deepMixIn({}, params || {}, {
        type: type,
        target: params && params.target ? params.target : this,
        currentTarget: this
      });
    }
  });

  return EventDispatcher;

});

define('lavaca/env/ChildBrowser',['require','lavaca/env/Device','lavaca/events/EventDispatcher','lavaca/util/Promise'],function(require) {

  var Device = require('lavaca/env/Device'),
      EventDispatcher = require('lavaca/events/EventDispatcher'),
      Promise = require('lavaca/util/Promise');

  /**
   * A sub-browser management utility (also accessible via window.plugins.childBrowser)
   * @class lavaca.env.ChildBrowser
   * @extends Lavaca.events.EventDispatcher
   *
   * @event open
   * @event close
   * @event change
   *
   * @constructor
   */
  var ChildBrowser = EventDispatcher.extend({
    /**
     * Opens a web page in the child browser (or navigates to it)
     * @method showWebPage
     *
     * @param {String} loc  The URL to open
     * @return {Lavaca.util.Promise}  A promise
     */
    showWebPage: function(loc) {lacuna_lazy_load("js/libs/lavaca.js[22348:22642]", functionData => eval(functionData))},
    /**
     * Closes the child browser, if it's open
     * @method close
     *
     * @return {Lavaca.util.Promise}  A promise
     */
    close: function() {lacuna_lazy_load("js/libs/lavaca.js[22804:22866]", functionData => eval(functionData))}
  });

  Device.register('childBrowser', ChildBrowser);

  return ChildBrowser;

});

define('lavaca/env/Detection',['require','$'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[23017:25809]", functionData => eval(functionData))});
define('lavaca/env/Device',['require','$','cordova','lavaca/util/Promise'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[25905:28304]", functionData => eval(functionData))});

define('lavaca/events/EventDispatcher',['require','lavaca/util/Disposable','mout/object/deepMixIn'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[28426:33579]", functionData => eval(functionData))});

define('lavaca/fx/Transform',['require','$'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[33646:47599]", functionData => eval(functionData))});

define('lavaca/fx/Animation',['require','$','./Transform'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[47680:56807]", functionData => eval(functionData))});

define('lavaca/fx/Transition',['require','$'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[56875:63597]", functionData => eval(functionData))});

define('lavaca/util/uuid',[],function() {

  var _uuidMap = {};
  /**
   * Produces a app specific unique identifier
   * @class lavaca.util.uuid
   */
   /**
   * Produces a unique identifier
   * @method uuid
   * @static
   * @param {String} namespace  A string served the namespace of a uuid
   *
   * @return {Number}  A number that is unique to this page
   */
  var uuid = function(namespace) {
    namespace = namespace || '__defaultNS';
    if (typeof _uuidMap[namespace] !== 'number') {
      _uuidMap[namespace] = 0;
    }
    return _uuidMap[namespace]++;
  };

  return uuid;

});

define('lavaca/net/History',['require','lavaca/events/EventDispatcher','lavaca/util/uuid'],function(require) {

  var EventDispatcher = require('lavaca/events/EventDispatcher'),
      uuid = require('lavaca/util/uuid');

  var _isAndroid = navigator.userAgent.indexOf('Android') > -1,
      _standardsMode = !_isAndroid && typeof history.pushState === 'function',
      _hasPushed = false,
      _lastHash,
      _hist,
      _currentId,
      _pushCount = 0;

  function _insertState(hist, position, id, state, title, url) {
    hist.position = position;
    var record = {
          id: id,
          state: state,
          title: title,
          url: url
        };
    hist.sequence[position] = record;
    location.hash = _lastHash = url + '#@' + id;
    return record;
  }

  /**
   * HTML5 history abstraction layer
   * @class lavaca.net.History
   * @extends lavaca.events.EventDispatcher
   *
   * @event popstate
   *
   * @constructor
   */
  var History = EventDispatcher.extend(function() {
    EventDispatcher.call(this);
    /**
     * A list containing history states generated by the app (not used for HTML5 history)
     * @property {Array} sequence
     */
    this.sequence = [];
    /**
     * The current index in the history sequence (not used for HTML5 history)
     * @property {Number} position
     */
    this.position = -1;
    this.replace({}, document.title, location.pathname);
    var self = this;
    if (_standardsMode) {
      /**
       * Auto-generated callback executed when a history event occurs
       * @property {Function} onPopState
       */
       var self = this;
      this.onPopState = function(e) {lacuna_lazy_load("js/libs/lavaca.js[65847:66232]", functionData => eval(functionData))};
      window.addEventListener('popstate', this.onPopState, false);
    } else {
      this.onPopState = function() {
        var hash = location.hash,
            code,
            record,
            item,
            previousCode,
            i = -1;
        if (hash) {
          hash = hash.replace(/^#/, '');
        }
        if (hash !== _lastHash) {
          previousCode = _lastHash.split('#@')[1];
          _lastHash = hash;
          if (hash) {
            _pushCount--;
            code = hash.split('#@')[1];
            while (!!(item = self.sequence[++i])) {
              if (item.id === parseInt(code, 10)) {
                record = item;
                self.position = i;
                break;
              }
            }
            if (record) {
              location.hash = record.url + '#@' + record.id;
              document.title = record.title;
              self.trigger('popstate', {
                state: record.state,
                title: record.title,
                url: record.url,
                id: record.id,
                direction: record.id > parseInt(previousCode, 10) ? 'forward' : 'back'
              });
            }
          }
        }
      };
      if (window.attachEvent) {
        window.attachEvent('onhashchange', this.onPopState);
      } else {
        window.addEventListener('hashchange', this.onPopState, false);
      }
    }
  }, {
    /**
     * Retrieve the current history record
     * @method current
     *
     * @return {Object}  The current history record
     */
    current: function() {lacuna_lazy_load("js/libs/lavaca.js[67808:67866]", functionData => eval(functionData))},
    /**
     * Determines whether or not there are history states
     * @method hasHistory
     *
     * @returns {Boolean} True when there is a history state
     */
    hasHistory: function() {lacuna_lazy_load("js/libs/lavaca.js[68063:68099]", functionData => eval(functionData))},
    /**
     * Adds a record to the history
     * @method push
     *
     * @param {Object} state  A data object associated with the page state
     * @param {String} title  The title of the page state
     * @param {String} url  The URL of the page state
     */
    push: function(state, title, url) {
      _pushCount++;
      if (_hasPushed) {
        document.title = title;
        _currentId = uuid('history');
        if (_standardsMode) {
          history.pushState({state: state, title: title, url: url, id: _currentId}, title, url);
        } else {
          _insertState(this, ++this.position, _currentId, state, title, url);
        }
      } else {
        this.replace(state, title, url);
      }
    },
    /**
     * Replaces the current record in the history
     * @method replace
     *
     * @param {Object} state  A data object associated with the page state
     * @param {String} title  The title of the page state
     * @param {String} url  The URL of the page state
     */
    replace: function(state, title, url) {
      _hasPushed = true;
      document.title = title;
      if (_standardsMode) {
        history.replaceState({state: state, title: title, url: url, id: _currentId}, title, url);
      } else {
        if (this.position < 0) {
          this.position = 0;
        }
        _insertState(this, this.position, typeof _currentId !== 'undefined' ? _currentId : uuid('history'), state, title, url);
      }
    },
    /**
     * Unbind the history object and ready it for garbage collection
     * @method dispose
     */
    dispose: function() {lacuna_lazy_load("js/libs/lavaca.js[69693:70100]", functionData => eval(functionData))}
  });
  /**
   * Initialize a singleton history abstraction layer
   * @method init
   * @static
   *
   * @return {Lavaca.mvc.History}  The history instance
   */
   /**
   * Initialize a singleton history abstraction layer
   * @method init
   * @static
   *
   * @param {Boolean} useHash  When true, use the location hash to manage history state instead of HTML5 history
   * @return {Lavaca.mvc.History}  The history instance
   */
  History.init = function(useHash) {
    if (!_hist) {
      if (useHash) {
        History.overrideStandardsMode();
      }
      _hist = new History();
    }
    return _hist;
  };
  /**
   * Adds a record to the history
   * @method push
   * @static
   *
   * @param {Object} state  A data object associated with the page state
   * @param {String} title  The title of the page state
   * @param {String} url  The URL of the page state
   */
  History.push = function() {
    History.init().push.apply(_hist, arguments);
  };
  /**
   * Replaces the current record in the history
   * @method replace
   * @static
   *
   * @param {Object} state  A data object associated with the page state
   * @param {String} title  The title of the page state
   * @param {String} url  The URL of the page state
   */
  History.replace = function() {lacuna_lazy_load("js/libs/lavaca.js[71378:71435]", functionData => eval(functionData))};
  /**
   * Goes to the previous history state
   * @method back
   * @static
   */
  History.back = function() {lacuna_lazy_load("js/libs/lavaca.js[71548:71573]", functionData => eval(functionData))};
  /**
   * Goes to the next history state
   * @method forward
   * @static
   */
  History.forward = function() {lacuna_lazy_load("js/libs/lavaca.js[71688:71716]", functionData => eval(functionData))};
  /**
   * Unbind the history object and ready it for garbage collection
   * @method dispose
   * @static
   */
  History.dispose = function() {lacuna_lazy_load("js/libs/lavaca.js[71862:71933]", functionData => eval(functionData))};
  /**
   * Binds an event handler to the singleton history
   * @method on
   * @static
   *
   * @param {String} type  The type of event
   * @param {Function} callback  The function to execute when the event occurs
   * @return {Lavaca.mvc.History}  The history object (for chaining)
   */
  History.on = function() {
    return History.init().on.apply(_hist, arguments);
  };
  /**
   * Unbinds an event handler from the singleton history
   * @method off
   * @static
   *
   * @param {String} type  The type of event
   * @param {Function} callback  The function to stop executing when the
   *    event occurs
   * @return {Lavaca.mvc.History}  The history object (for chaining)
   */
  History.off = function() {lacuna_lazy_load("js/libs/lavaca.js[72653:72713]", functionData => eval(functionData))};
  /**
   * Sets Histroy to hash mode
   * @method overrideStandardsMode
   * @static
   */
  History.overrideStandardsMode = function() {
    _standardsMode = false;
  };

  /**
   * Stores the page transition animations so that if you route back, it will animate correctly
   * @property {Array} animationBreadcrumb
   */
  History.animationBreadcrumb = [];

  /**
   * Flag to notify when history back is being called
   * @property {Boolean} isRoutingBack
   */
  History.isRoutingBack = false;

  return History;

});

define('lavaca/util/delay',[],function() {
  /**
   * Wraps setTimeout and delays the execution of a function
   * @class lavaca.util.delay
   */
   /**
   * Delays the execution of a function
   * @method delay
   * @static
   *
   * @param {Function} callback  A callback to execute on delay
   */
   /**
   * Delays the execution of a function
   * @method delay
   * @static
   * @param {Function} callback  A callback to execute on delay
   * @param {Object} thisp  The object to use as the "this" keyword
   * @return {Number}  The timeout ID
   */
   /**
   * Delays the execution of a function
   * @method delay
   * @static
   * @param {Function} callback  A callback to execute on delay
   * @param {Object} thisp  The object to use as the "this" keyword
   * @param {Number} ms  The number of milliseconds to delay execution
   * @return {Number}  The timeout ID
   */
  var delay = function(callback, thisp, ms) {
    return setTimeout(function() {
      callback.call(thisp);
    }, ms || 0);
  };

  return delay;

});

define('mout/lang/kindOf',[],function () {

    var _rKind = /^\[object (.*)\]$/,
        _toString = Object.prototype.toString,
        UNDEF;

    /**
     * Gets the "kind" of value. (e.g. "String", "Number", etc)
     */
    function kindOf(val) {
        if (val === null) {
            return 'Null';
        } else if (val === UNDEF) {
            return 'Undefined';
        } else {
            return _rKind.exec( _toString.call(val) )[1];
        }
    }
    return kindOf;
});

define('mout/object/mixIn',['./forOwn'], function(forOwn){

    /**
    * Combine properties from all the objects into first one.
    * - This method affects target object in place, if you want to create a new Object pass an empty object as first param.
    * @param {object} target    Target Object
    * @param {...object} objects    Objects to be combined (0...n objects).
    * @return {object} Target Object.
    */
    function mixIn(target, objects){lacuna_lazy_load("js/libs/lavaca.js[75219:75477]", functionData => eval(functionData))}

    function copyProp(val, key){lacuna_lazy_load("js/libs/lavaca.js[75510:75542]", functionData => eval(functionData))}

    return mixIn;
});

define('mout/lang/clone',['./kindOf', './isPlainObject', '../object/mixIn'], function (kindOf, isPlainObject, mixIn) {

    /**
     * Clone native types.
     */
    function clone(val){
        switch (kindOf(val)) {
            case 'Object':
                return cloneObject(val);
            case 'Array':
                return cloneArray(val);
            case 'RegExp':
                return cloneRegExp(val);
            case 'Date':
                return cloneDate(val);
            default:
                return val;
        }
    }

    function cloneObject(source) {lacuna_lazy_load("js/libs/lavaca.js[76151:76287]", functionData => eval(functionData))}

    function cloneRegExp(r) {lacuna_lazy_load("js/libs/lavaca.js[76317:76513]", functionData => eval(functionData))}

    function cloneDate(date) {lacuna_lazy_load("js/libs/lavaca.js[76544:76583]", functionData => eval(functionData))}

    function cloneArray(arr) {lacuna_lazy_load("js/libs/lavaca.js[76614:76649]", functionData => eval(functionData))}

    return clone;

});

define('mout/lang/deepClone',['./clone', '../object/forOwn', './kindOf', './isPlainObject'], function (clone, forOwn, kindOf, isPlainObject) {

    /**
     * Recursively clone native types.
     */
    function deepClone(val, instanceClone) {
        switch ( kindOf(val) ) {
            case 'Object':
                return cloneObject(val, instanceClone);
            case 'Array':
                return cloneArray(val, instanceClone);
            default:
                return clone(val);
        }
    }

    function cloneObject(source, instanceClone) {
        if (isPlainObject(source)) {
            var out = {};
            forOwn(source, function(val, key) {
                this[key] = deepClone(val, instanceClone);
            }, out);
            return out;
        } else if (instanceClone) {
            return instanceClone(source);
        } else {
            return source;
        }
    }

    function cloneArray(arr, instanceClone) {lacuna_lazy_load("js/libs/lavaca.js[77637:77842]", functionData => eval(functionData))}

    return deepClone;

});


define('mout/lang/isKind',['./kindOf'], function (kindOf) {
    /**
     * Check if value is from a specific "kind".
     */
    function isKind(val, kind){lacuna_lazy_load("js/libs/lavaca.js[78028:78072]", functionData => eval(functionData))}
    return isKind;
});

define('mout/lang/isObject',['./isKind'], function (isKind) {
    /**
     */
    function isObject(val) {lacuna_lazy_load("js/libs/lavaca.js[78202:78247]", functionData => eval(functionData))}
    return isObject;
});

define('mout/object/merge',['./hasOwn', '../lang/deepClone', '../lang/isObject'], function (hasOwn, deepClone, isObject) {

    /**
     * Deep merge objects.
     */
    function merge() {
        var i = 1,
            key, val, obj, target;

        // make sure we don't modify source element and it's properties
        // objects are passed by reference
        target = deepClone( arguments[0] );

        while (obj = arguments[i++]) {
            for (key in obj) {
                if ( ! hasOwn(obj, key) ) {
                    continue;
                }

                val = obj[key];

                if ( isObject(val) && isObject(target[key]) ){
                    // inception, deep merge objects
                    target[key] = merge(target[key], val);
                } else {
                    // make sure arrays, regexp, date, objects are cloned
                    target[key] = deepClone(val);
                }

            }
        }

        return target;
    }

    return merge;

});

define('lavaca/mvc/Route',['require','lavaca/util/Disposable','lavaca/util/delay','mout/lang/deepClone','mout/object/merge'],function(require) {

  var Disposable = require('lavaca/util/Disposable'),
      delay = require('lavaca/util/delay'),
      clone = require('mout/lang/deepClone'),
      merge = require('mout/object/merge');

  function _multivariablePattern() {
    return new RegExp('\\{\\*(.*?)\\}', 'g');
  }

  function _variablePattern() {
    return new RegExp('\\{([^\\/]*?)\\}', 'g');
  }

  function _variableCharacters() {lacuna_lazy_load("js/libs/lavaca.js[79838:79886]", functionData => eval(functionData))}

  function _datePattern() {lacuna_lazy_load("js/libs/lavaca.js[79914:79977]", functionData => eval(functionData))}

  function _patternToRegExp(pattern) {
    if (pattern === '/') {
      return new RegExp('^\\/(\\?.*)?(#.*)?$', 'g');
    }
    if (pattern.charAt(0) === '/') {
      pattern = pattern.slice(1);
    }
    pattern = pattern.split('/');
    var exp = '^',
        i = -1,
        part;
    while (!!(part = pattern[++i])) {
      if (_multivariablePattern().test(part)) {
        exp += '(/([^/?#]+))*?';
      } else if (_variablePattern().test(part)) {
        exp += '/([^/?#]+)';
      } else {
        exp += '/' + part;
      }
    }
    exp += '(\\?.*)?(#\\.*)?$';
    return new RegExp(exp, 'g');
  }

  function _scrubURLValue(value) {lacuna_lazy_load("js/libs/lavaca.js[80621:81042]", functionData => eval(functionData))}

  /**
   * @class lavaca.mvc.Route
   * @extends lavaca.util.Disposable
   * A relationship between a URL pattern and a controller action
   *
   * @constructor
   * @param {String} pattern  The route URL pattern
   *   Route URL patterns should be in the form /path/{foo}/path/{*bar}.
   *   The path variables, along with query string parameters, will be passed
   *   to the controller action as a params object. In this case, when passed
   *   the URL /path/something/path/1/2/3?abc=def, the params object would be
   *   {foo: 'something', bar: [1, 2, 3], abc: 'def'}.
   * @param {Function} TController  The type of controller that performs the action
   *   (Should derive from [[Lavaca.mvc.Controller]])
   * @param {String} action  The name of the controller method to call
   * @param {Object} params  Key-value pairs that will be merged into the params
   *   object that is passed to the controller action
   */
  var Route = Disposable.extend(function(pattern, TController, action, params) {
    Disposable.call(this);
    this.pattern = pattern;
    this.TController = TController;
    this.action = action;
    this.params = params || {};
  }, {
    /**
     * Tests if this route applies to a URL
     * @method matches
     *
     * @param {String} url  The URL to test
     * @return {Boolean}  True when this route matches the URL
     */
    matches: function(url) {
      return _patternToRegExp(this.pattern).test(url);
    },
    /**
     * Converts a URL into a params object according to this route's pattern
     * @method parse
     *
     * @param {String} url  The URL to convert
     * @return {Object}  The params object
     */
    parse: function(url) {
      var result = clone(this.params),
          pattern = this.pattern.slice(1),
          urlParts = url.split('#'),
          i,
          query,
          path,
          pathItem,
          patternItem,
          name;
      result.url = url;
      result.route = this;
      urlParts = urlParts[1] ? urlParts[1].split('?') : urlParts[0].split('?');
      query = urlParts[1];
      if (query) {
        i = -1;
        query = query.split('&');
        while (!!(pathItem = query[++i])) {
          pathItem = pathItem.split('=');
          name = decodeURIComponent(pathItem[0]);
          if (result[name] !== undefined) {
            if (!(result[name] instanceof Array)) {
              result[name] = [result[name]];
            }
            result[name].push(_scrubURLValue(pathItem[1]));
          } else {
            result[name] = _scrubURLValue(pathItem[1]);
          }
        }
      }
      i = 0;
      path = urlParts[0].replace(/(^(http(s?)\:\/\/[^\/]+)?\/?)|(\/$)/, '');
      var breakApartPattern = new RegExp(pattern.replace(_multivariablePattern(), '(.+)').replace(_variablePattern(), '([^/]+)')),
          brokenPath = breakApartPattern.exec(path),
          brokenPattern = breakApartPattern.exec(pattern);
      while (!!(pathItem = brokenPath[++i])) {
        patternItem = brokenPattern[i];
        if (_multivariablePattern().test(patternItem)) {
          pathItem = pathItem.split('/');
        }
        result[patternItem.replace(_variableCharacters(), '')] = pathItem;
      }
      return result;
    },
    /**
     * Executes this route's controller action see if work
     * @method exec
     *
     * @param {String} url  The URL that supplies parameters to this route
     * @param {Lavaca.mvc.Router} router  The router used by the application
     * @param {Lavaca.mvc.ViewManager}  viewManager The view manager used by the application
     * @return {Lavaca.util.Promise}  A promise
     */
    /**
     * Executes this route's controller action see if work
     * @method exec
     *
     * @param {String} url  The URL that supplies parameters to this route
     * @param {Lavaca.mvc.Router} router  The router used by the application
     * @param {Lavaca.mvc.ViewManager}  viewManager The view manager used by the application
     * @param {Object} state  A history record object
     * @return {Lavaca.util.Promise}  A promise
     */
    /**
     * Executes this route's controller action see if work
     * @method exec
     *
     * @param {String} url  The URL that supplies parameters to this route
     * @param {Lavaca.mvc.Router} router  The router used by the application
     * @param {Lavaca.mvc.ViewManager}  viewManager The view manager used by the application
     * @param {Object} state  A history record object
     * @param {Object} params  Additional parameters to pass to the controller action
     * @return {Lavaca.util.Promise}  A promise
     */
    exec: function(url, router, viewManager, state, params) {
      var controller = new this.TController(router, viewManager),
          urlParams = this.parse(url),
          promise = controller.exec(this.action, merge(urlParams, params), state);
      function dispose() {
        delay(controller.dispose, controller);
      }
      promise.then(dispose, dispose);
      return promise;
    }
  });

  return Route;

});

define('lavaca/mvc/Router',['require','./Route','lavaca/net/History','lavaca/util/Disposable','lavaca/util/Promise'],function(require) {

  var Route = require('./Route'),
      History = require('lavaca/net/History'),
      Disposable = require('lavaca/util/Disposable'),
      Promise = require('lavaca/util/Promise');

  /**
   * @class lavaca.mvc.Router
   * @extends lavaca.util.Disposable
   * URL manager
   *
   * @constructor
   * @param {Lavaca.mvc.ViewManager} viewManager  The view manager
   */
  var Router = Disposable.extend(function(viewManager) {
    Disposable.call(this);
    /**
     * @field {Array} routes
     * @default []
     * The [[Lavaca.mvc.Route]]s used by this router
     */
    this.routes = [];
    /**
     * @field {Lavaca.mvc.ViewManager} viewManager
     * @default null
     * The view manager used by this router
     */
    this.viewManager = viewManager;

  }, {
    /**
     * @field {Boolean} locked
     * @default false
     * When true, the router is prevented from executing a route
     */
    locked: false,
    /**
     * @field {Boolean} hasNavigated
     * @default false
     * Whether or not this router has been used to navigate
     */
    hasNavigated: false,

    startHistory: function() {
      this.onpopstate = function(e) {lacuna_lazy_load("js/libs/lavaca.js[87373:87590]", functionData => eval(functionData))};
      History.on('popstate', this.onpopstate, this);
    },
    /**
     * Sets the viewManager property on the instance which is the view manager used by this router
     * @method setEl
     *
     * @param {Lavaca.mvc.ViewManager} viewManager
     * @return {Lavaca.mvc.Router}  This Router instance
     */
    setViewManager: function(viewManager) {
      this.viewManager = viewManager;
      return this;
    },
    /**
     * Adds multiple routes
     * @method add
     *
     * @param {Object} map  A hash in the form {pattern: [TController, action, params]}
     *   or {pattern: {controller: TController, action: action, params: params}
     * @return {Lavaca.mvc.Router}  The router (for chaining)
     */
    /**
     * Adds a route
     * @method add
     *
     * @param {String} pattern  The route URL pattern
     * @param {Function} TController  The type of controller to perform the action (should derive from [[Lavaca.mvc.Controller]])
     * @param {String} action  The name of the controller method to call
     * @return {Lavaca.mvc.Router}  The router (for chaining)
     */
    /**
     * Adds a route
     * @method add
     *
     * @param {String} pattern  The route URL pattern
     * @param {Function} TController  The type of controller to perform the action (should derive from [[Lavaca.mvc.Controller]])
     * @param {String} action  The name of the controller method to call
     * @param {Object} params  Key-value pairs that will be passed to the action
     * @return {Lavaca.mvc.Router}  The router (for chaining)
     */
    add: function(pattern, TController, action, params) {
      if (typeof pattern === 'object') {
        for (var p in pattern) {
          var args = pattern[p];
          if (args instanceof Array) {
            TController = args[0];
            action = args[1];
            params = args[2];
          } else {
            TController = args.controller;
            action = args.action;
            params = args.params;
          }
          this.add(p, TController, action, params);
        }
      } else {
        this.routes.push(new Route(pattern, TController, action, params));
      }
      return this;
    },
    /**
     * Executes the action for a given URL
     * @method exec
     *
     * @param {String} url  The URL
     * @return {Lavaca.util.Promise}  A promise
     */
    /**
     * Executes the action for a given URL
     * @method exec
     *
     * @param {String} url  The URL
     * @param {Object} state  A history record object
     * @return {Lavaca.util.Promise}  A promise
     */
    /**
     * Executes the action for a given URL
     * @method exec
     *
     * @param {String} url  The URL
     * @param {Object} state  A history record object
     * @param {Object} params  Additional parameters to pass to the route
     * @return {Lavaca.util.Promise}  A promise
     */
    exec: function(url, state, params) {
      if (this.locked) {
        return (new Promise(this)).reject('locked');
      } else {
        this.locked = true;
      }
      if (!url) {
        url = '/';
      }
      if (url.indexOf('http') === 0) {
        url = url.replace(/^http(s?):\/\/.+?/, '');
      }
      var i = -1,
          route,
          promise = new Promise(this);
      promise.always(function() {
        this.unlock();
      });
      if (!this.hasNavigated) {
        promise.success(function() {
          this.hasNavigated = true;
        });
      }
      while (!!(route = this.routes[++i])) {
        if (route.matches(url)) {
          return promise.when(route.exec(url, this, this.viewManager, state, params));
        }
      }
      return promise.reject(url, state);
    },
    /**
     * Unlocks the router so that it can be used again
     * @method unlock
     *
     * @return {Lavaca.mvc.Router}  This router (for chaining)
     */
    unlock: function() {
      this.locked = false;
      return this;
    },
    /**
     * Readies the router for garbage collection
     * @method dispose
     */
    dispose: function() {lacuna_lazy_load("js/libs/lavaca.js[91638:91823]", functionData => eval(functionData))}
  });

  return new Router();

});

define('lavaca/util/resolve',[],function() {
  /**
   * Looks up or creates an object, given its global path (ie, 'Lavaca.resolve' resolves to this function,
   * 'no.obj.exists' resolves to null)
   * @class lavaca.util.resolve
   */
   /**
   * Looks up or creates an object, given its global path (ie, 'Lavaca.resolve' resolves to this function,
   * 'no.obj.exists' resolves to null)
   * @method resolve
   * @static
   *
   * @param {String} name  The fully-qualified name of the object to look up
   * @return {Object}  The resolved object
   */
   /**
   * Looks up or creates an object, given its global path (ie, 'Lavaca.resolve' resolves to this function,
   * 'no.obj.exists' resolves to null)
   * @method resolve
   * @static
   *
   * @param {String} name  The fully-qualified name of the object to look up
   * @param {Boolean} createIfNotExists  When true, any part of the name that doesn't already exist will be created
   * as an empty object
   * @return {Object}  The resolved object
   */
  var resolve = function(name, createIfNotExists, root) {lacuna_lazy_load("js/libs/lavaca.js[92927:93331]", functionData => eval(functionData))};

  return resolve;

});

define('lavaca/net/Connectivity',['require','$','lavaca/util/Promise','lavaca/util/resolve'],function(require) {

  var $ = require('$'),
      Promise = require('lavaca/util/Promise'),
      resolve = require('lavaca/util/resolve');

  /**
   * A utility type for working under different network connectivity situatioConnectivity.
   * @class lavaca.net.Connectivity
   */

  var _navigatorOnlineSupported = typeof navigator.onLine === 'boolean',
      _offlineAjaxHandlers = [],
      _offlineErrorCode = 'offline';

  function _onAjaxError(arg) {lacuna_lazy_load("js/libs/lavaca.js[93906:94080]", functionData => eval(functionData))}

  var Connectivity = {};

  /**
   * Attempts to detect whether or not the browser is connected
   * @method isOffline
   * @static
   *
   * @return {Boolean}  True if the browser is offline; false if the browser is online
   *    or if connection status cannot be determined
   */
  Connectivity.isOffline = function() {lacuna_lazy_load("js/libs/lavaca.js[94403:94653]", functionData => eval(functionData))};

  /**
   * Makes an AJAX request if the user is online. If the user is offline, the returned
   * promise will be rejected with the string argument "offline"
   * @method ajax
   * @static
   *
   * @param {Object} opts  jQuery-style AJAX options
   * @return {Lavaca.util.Promise}  A promise
   */
  Connectivity.ajax = function(opts) {lacuna_lazy_load("js/libs/lavaca.js[94992:95590]", functionData => eval(functionData))};

  /**
   * Adds a callback to be executed whenever any Lavaca.net.Connectivity.ajax() call is
   * blocked as a result of a lack of internet connection.
   * @method registerOfflineAjaxHandler
   * @static
   *
   * @param {Function} callback  The callback to execute
   */
  Connectivity.registerOfflineAjaxHandler = function(callback) {lacuna_lazy_load("js/libs/lavaca.js[95930:95976]", functionData => eval(functionData))};

  return Connectivity;

});

define('lavaca/util/ArrayUtils',[],function() {

  /**
   * Utility class for working with arrays
   * @class lavaca.util.ArrayUtils
   */
  var ArrayUtils = {};

  /**
   * Gets the first index of an item in an array
   * @method indexOf
   * @static
   *
   * @param {Array} a  The array
   * @param {Object} o  The object to look for
   * @return {Number}  The first index of the object, or -1 if not found
   */
  ArrayUtils.indexOf = function(a, o) {
    if (!a) {
      return -1;
    } else if (a.indexOf) {
      return a.indexOf(o);
    } else {
      for (var i = 0, j = a.length; i < j; i++) {
        if (a[i] === o) {
          return i;
        }
      }
      return -1;
    }
  };

  /**
   * Determines whether an array contains an object
   * @method contains
   * @static
   *
   * @param {Array} a  The array
   * @param {Object} o  The object to look for
   * @return {Boolean}  True when the array contains the object, false otherwise
   */
  ArrayUtils.contains = function(a, o) {
    return ArrayUtils.indexOf(a, o) > -1;
  };

  /**
   * Removes the first instance of an item from an array, if it exists
   * @method remove
   * @static
   *
   * @param {Array} a  The array
   * @param {Object} o  The object to remove
   * @return {Number}  The former index of the item (or -1 if the item was not
   *   in the array)
   */
  ArrayUtils.remove = function(a, o) {lacuna_lazy_load("js/libs/lavaca.js[97396:97515]", functionData => eval(functionData))};

  /**
   * Adds an item to the end of an array, if it was not already in the array
   * @method pushIfNotExists
   * @static
   *
   * @param {Array} a  The array
   * @param {Object} o  The object to add to the array
   * @return {Number}  The index of the item in the array
   */
  ArrayUtils.pushIfNotExists = function(a, o) {lacuna_lazy_load("js/libs/lavaca.js[97846:97972]", functionData => eval(functionData))};
  /**
   * Determines if object is an array
   * @method isArray
   * @static
   *
   * @param {Object} a  Any value of any type
   * @return {Boolean}  True if a is a true array
   */
  ArrayUtils.isArray = function(a) {lacuna_lazy_load("js/libs/lavaca.js[98194:98316]", functionData => eval(functionData))};

  return ArrayUtils;

});

define('lavaca/util/Cache',['require','lavaca/util/Disposable','lavaca/util/uuid'],function(require) {

  var Disposable = require('lavaca/util/Disposable'),
      uuid = require('lavaca/util/uuid');

  /**
   * Object for storing data
   * @class lavaca.util.Cache
   * @extends lavaca.util.Disposable
   */
  var Cache = Disposable.extend({
    /**
     *
     * Retrieves an item from the cache
     * @method get
     * @param {String} id  The key under which the item is stored
     * @return {Object}  The stored item (or null if no item is stored)
     */
     /**
     * Retrieves an item from the cache
     * @method get
     * @param {String} id  The key under which the item is stored
     * @param {Object} def  A default value that will be added, if there is no item stored
     * @return {Object}  The stored item (or null if no item is stored and no default)
     */
    get: function(id, def) {
      var result = this['@' + id];
      if (result === undefined && def !== undefined) {
        result = this['@' + id] = def;
      }
      return result === undefined ? null : result;
    },
    /**
     * Assigns an item to a key in the cache
     * @method set
     *
     * @param {String} id  The key under which the item will be stored
     * @param {Object} value  The object to store in the cache
     */
    set: function(id, value) {
      this['@' + id] = value;
    },
    /**
     * Adds an item to the cache
     * @method add
     *
     * @param {Object} value  The object to store in the cache
     * @return {String}  The auto-generated ID under which the value was stored
     */
    add: function(value) {lacuna_lazy_load("js/libs/lavaca.js[99985:100059]", functionData => eval(functionData))},
    /**
     * Removes an item from the cache (if it exists)
     * @method remove
     *
     * @param {String} id  The key under which the item is stored
     */
    remove: function(id) {lacuna_lazy_load("js/libs/lavaca.js[100250:100286]", functionData => eval(functionData))},
    /**
     * Executes a callback for each cached item. To stop iteration immediately,
     * return false from the callback.
     * @method each
     * @param {Function} callback  A function to execute for each item, callback(key, item)
     */
     /**
     * Executes a callback for each cached item. To stop iteration immediately,
     * return false from the callback.
     * @method each
     * @param {Function} callback  A function to execute for each item, callback(key, item)
     * @param {Object} thisp  The context of the callback
     */
    each: function(cb, thisp) {
      var prop, returned;
      for (prop in this) {
        if (this.hasOwnProperty(prop) && prop.indexOf('@') === 0) {
          returned = cb.call(thisp || this, prop.slice(1), this[prop]);
          if (returned === false) {
            break;
          }
        }
      }
    },
    /**
     * Serializes the cache to a hash
     * @method toObject
     *
     * @return {Object}  The resulting key-value hash
     */
    toObject: function() {
      var result = {};
      this.each(function(prop, value) {
        result[prop] = (value && typeof value.toObject === 'function') ? value.toObject() : value;
      });
      return result;
    },
    /**
     * Serializes the cache to JSON
     * @method toJSON
     *
     * @return {String}  The JSON string
     */
    toJSON: function() {lacuna_lazy_load("js/libs/lavaca.js[101669:101722]", functionData => eval(functionData))},
     /**
     * Serializes the cache to an array
     * @method toArray
     *
     * @return {Object}  The resulting array with elements being index based and keys stored in an array on the 'ids' property
     */
    toArray: function() {lacuna_lazy_load("js/libs/lavaca.js[101962:102214]", functionData => eval(functionData))},

    /**
     * removes all items from the cache
     * @method clear
     */
    clear: function() {lacuna_lazy_load("js/libs/lavaca.js[102316:102406]", functionData => eval(functionData))},

    /**
     * returns number of items in cache
     * @method count
     */
    count: function() {lacuna_lazy_load("js/libs/lavaca.js[102508:102627]", functionData => eval(functionData))},

    /**
     * Clears all items from the cache on dispose
     * @method dispose
     */
    dispose: function() {lacuna_lazy_load("js/libs/lavaca.js[102743:102829]", functionData => eval(functionData))}
  });

  return Cache;

});

define('lavaca/util/Map',['require','$','./Cache','./Disposable','lavaca/net/Connectivity'],function(require) {

  var $ = require('$'),
      Cache = require('./Cache'),
      Disposable = require('./Disposable'),
      Connectivity = require('lavaca/net/Connectivity');

  function _absolute(url) {
    if (url && url.indexOf('http') !== 0) {
      if (url.charAt(0) === '/') {
        url = location.protocol + '//'
          + location.hostname
          + (location.port ? ':' + location.port : '')
          + (url.indexOf('/') === 0 ? url : '/' + url);
      } else {
        url = location.toString().split('#')[0].split('?')[0].replace(/\w+\.\w+$/, '') + url;
      }
    }
    return url;
  }

  /**
   * Abstract type for lookup tables
   * @class lavaca.util.Map
   * @extends lavaca.util.Disposable
   *
   * @constructor
   * @param {String} name  The name of the map
   * @param {String} src  The URL of the map's data (or null if code is supplied)
   * @param {String} code  The raw string data for the map (or null if src is supplied)
   */
  var Map = Disposable.extend(function(name, src, code) {
    Disposable.call(this);
    /**
     * Whether or not the map has loaded
     * @property {Boolean} hasLoaded
     * @default false
     */
    this.hasLoaded = false;
    /**
     * The name of the map
     * @property {String} name
     * @default null
     */
    this.name = name;
    /**
     * The source URL for the map
     * @property {String} src
     * @default null
     */
    this.src = _absolute(src);
    /**
     * The raw string data for the map
     * @property {String} code
     * @default null
     */
    this.code = code;
    /**
     * The cache in which this map stores data
     * @property {Lavaca.util.Cache} cache
     * @default new Lavaca.util.Cache()
     */
    this.cache = new Cache();
  }, {
    /**
     * Determines whether or not this is the desired lookup
     * @method is
     *
     * @param {String} name  The name of the lookup
     * @return {Boolean}  True if this is the lookup
     */
    is: function(name) {lacuna_lazy_load("js/libs/lavaca.js[104936:104976]", functionData => eval(functionData))},
    /**
     * Gets the value stored under a code
     * @method get
     *
     * @param {String} code  The code
     * @return {Object}  The value (or null)
     */
    get: function(code) {lacuna_lazy_load("js/libs/lavaca.js[105169:105407]", functionData => eval(functionData))},
    /**
     * Adds parameters to this map
     * @method add
     *
     * @param {Object} data  The parameters to add
     */
    add: function(data) {lacuna_lazy_load("js/libs/lavaca.js[105561:105640]", functionData => eval(functionData))},
    /**
     * Processes server data to include in this lookup
     * @method process
     *
     * @param {String} text  The server data string
     */
    process: function(text) {lacuna_lazy_load("js/libs/lavaca.js[105823:105898]", functionData => eval(functionData))},
    /**
     * Adds JSON data to this map (synchronous)
     * @method load
     *
     * @param {String} url  The URL of the data
     */
    load: function(url) {lacuna_lazy_load("js/libs/lavaca.js[106063:106243]", functionData => eval(functionData))}
  });
  /**
   * Sets the application's default config
   * @method setDefault
   * @static
   *
   * @param {Lavaca.util.Cache} cache  The map cache
   * @param {String} name  The name of the config
   */
  Map.setDefault = function(cache, name) {lacuna_lazy_load("js/libs/lavaca.js[106491:106617]", functionData => eval(functionData))};
  /**
   * Finds the most appropriate value for a code
   * @method get
   * @static
   *
   * @param {Lavaca.util.Cache} cache  The maps cache
   * @param {String} name  The name of the map
   * @param {String} code  The name of the parameter
   * @param {String} defaultName  The name of the default map
   * @return {Object}  The value of the parameter
   */
  Map.get = function(cache, name, code, defaultName) {lacuna_lazy_load("js/libs/lavaca.js[107034:107234]", functionData => eval(functionData))};
  /**
   * Scans the document for all maps and prepares them
   * @method init
   * @static
   *
   * @param {Lavaca.util.Cache} cache  The map cache
   * @param {String} mimeType  The MIME type of the scripts
   * @param {Function} construct  A function that returns a new map, in
   *   the form construct(name, src, code)
   * @param {jQuery} scope  The element to which to limit the scan
   */
  Map.init = function(cache, mimeType, construct, scope) {
    $(scope || document.documentElement)
      .find('script[type="' + mimeType + '"]')
      .each(function() {lacuna_lazy_load("js/libs/lavaca.js[107804:108195]", functionData => eval(functionData))});
  };
  /**
   * Disposes of all maps
   * @method dispose
   * @static
   *
   * @param {Lavaca.util.Cache} cache  The map cache
   */
  Map.dispose = function(cache) {lacuna_lazy_load("js/libs/lavaca.js[108365:108391]", functionData => eval(functionData))};

  return Map;

});

define('lavaca/util/Config',['require','./Cache','./Map'],function(require) {

  var Cache = require('./Cache'),
      Map = require('./Map');

  var _cache = new Cache();

  function _construct(name, src, code) {lacuna_lazy_load("js/libs/lavaca.js[108626:108724]", functionData => eval(functionData))}

  /**
   * Configuration management type
   * @class lavaca.util.Config
   * @extends lavaca.util.Map
   */
  var Config = Map.extend({
    // Empty (no overrides)
  });
  /**
   * Sets the application's default config
   * @method setDefault
   * @static
   *
   * @param {String} name  The name of the default config
   */
  Config.setDefault = function(name) {lacuna_lazy_load("js/libs/lavaca.js[109088:109127]", functionData => eval(functionData))};
  /**
   * Gets the application's current config environment name
   * @method currentEnvironment
   * @static
   *
   * @return {String} The name of the current environment
   */
  Config.currentEnvironment = function() {lacuna_lazy_load("js/libs/lavaca.js[109350:109394]", functionData => eval(functionData))};
  /**
   * Retrieves a value from the configuration
   * @method get
   * @static
   * @param {String} code  The name of the parameter
   * @return {Object}  The value of the parameter
   */
   /**
   * Retrieves a value from the configuration
   * @method get
   * @static
   * @param {String} name  The name of the config
   * @param {String} code  The name of the parameter
   * @return {Object}  The value of the parameter
   */
  Config.get = function(name, code) {lacuna_lazy_load("js/libs/lavaca.js[109865:109921]", functionData => eval(functionData))};
  /**
   * Scans the document for all translations and prepares them
   * @method init
   * @static
   */
   /**
   * Scans the document for all translations and prepares them
   * @method init
   * @static
   * @param {jQuery} scope  The element to which to limit the scan
   */
  Config.init = function(scope) {
    Map.init(_cache, 'text/x-config', _construct, scope);
  };
  /**
   * Disposes of all translations
   * @method dispose
   * @static
   */
  Config.dispose = function() {lacuna_lazy_load("js/libs/lavaca.js[110410:110440]", functionData => eval(functionData))};

  Config.init();

  return Config;

});

define('lavaca/mvc/Model',['require','lavaca/events/EventDispatcher','lavaca/net/Connectivity','lavaca/util/ArrayUtils','lavaca/util/Cache','lavaca/util/Promise','mout/lang/deepClone','mout/object/merge','lavaca/util/Config'],function(require) {

  var EventDispatcher = require('lavaca/events/EventDispatcher'),
      Connectivity = require('lavaca/net/Connectivity'),
      ArrayUtils = require('lavaca/util/ArrayUtils'),
      Cache = require('lavaca/util/Cache'),
      Promise = require('lavaca/util/Promise'),
      clone = require('mout/lang/deepClone'),
      merge = require('mout/object/merge'),
      Config = require('lavaca/util/Config');


  var UNDEFINED;

  function _triggerAttributeEvent(model, event, attribute, previous, value, messages) {
    model.trigger(event, {
      attribute: attribute,
      previous: previous === UNDEFINED ? null : previous,
      value: value === UNDEFINED ? model.get(attribute) : value,
      messages: messages || []
    });
  }

  function _setFlagOn(model, name, flag) {lacuna_lazy_load("js/libs/lavaca.js[111507:111679]", functionData => eval(functionData))}

  function _suppressChecked(model, suppress, callback) {
    suppress = !!suppress;
    var props = ['suppressValidation', 'suppressEvents', 'suppressTracking'],
        old = {},
        i = -1,
        prop,
        result;
    while (!!(prop = props[++i])) {
      old[prop] = model[prop];
      model[prop] = suppress || model[prop];
    }
    result = callback.call(model);
    i = -1;
    while (!!(prop = props[++i])) {
      model[prop] = old[prop];
    }
    return result;
  }

  function _isValid(messages){lacuna_lazy_load("js/libs/lavaca.js[112198:112398]", functionData => eval(functionData))}


  // Virtual type
  /**
   * Event type used when an attribute is modified
   * @class lavaca.mvc.AttributeEvent
   * @extends Event
   */
   /**
   * The name of the event-causing attribute
   * @property {String} attribute
   * @default null
   */
   /**
   * The value of the attribute before the event
   * @property {Object} previous
   * @default null
   */
   /**
   * The value of the attribute after the event
   * @property {Object} value
   * @default null
   */
   /**
   * A list of validation messages the change caused
   * @property {Array} messages
   * @default []
   */

  /**
   * Basic model type
   * @class lavaca.mvc.Model
   * @extends lavaca.events.EventDispatcher
   *
   * Place the events where they are triggered in the code, see the yuidoc syntax reference and view.js for rendersuccess trigger
   * @event change
   * @event invalid
   * @event fetchSuccess
   * @event fetchError
   * @event saveSuccess
   * @event saveError
   *
   * @constructor
   * @param {Object} [map]  A parameter hash to apply to the model
   */
  var Model = EventDispatcher.extend(function(map) {
    EventDispatcher.call(this);
    this.attributes = new Cache();
    this.rules = new Cache();
    this.unsavedAttributes = [];
    this.flags = {};
    if (this.defaults) {
      map = merge({}, this.defaults, map);
    }
    if (map) {
      this.suppressEvents
        = this.suppressTracking
        = true;
      this.apply(map);
      this.suppressEvents
        = this.suppressTracking
        = false;
    }
  }, {
    /**
     * When true, attributes are not validated
     * @property suppressValidation
     * @default false
     *
     * @type Boolean
     */

    suppressValidation: false,
    /**
     * When true, changes to attributes are not tracked
     * @property suppressTracking
     * @default false
     *
     * @type Boolean
     */

    suppressTracking: false,
    /**
     * Gets the value of a attribute
     * @method get
     *
     * @param {String} attribute  The name of the attribute
     * @return {Object}  The value of the attribute, or null if there is no value
     */
    get: function(attribute) {lacuna_lazy_load("js/libs/lavaca.js[114551:114836]", functionData => eval(functionData))},
    /**
     * Determines whether or not an attribute can be assigned
     * @method canSet
     *
     * @param {String} attribute  The name of the attribute
     * @return {Boolean}  True if you can assign to the attribute
     */
    canSet: function() {lacuna_lazy_load("js/libs/lavaca.js[115094:115120]", functionData => eval(functionData))},
    /**
     * Sets the value of the attribute, if it passes validation
     * @method set
     *
     * @param {String} attribute  The name of the attribute
     * @param {Object} value  The new value
     * @return {Boolean}  True if attribute was set, false otherwise
     *
     */
    /**
     * Sets the value of the attribute, if it passes validation
     * @method set
     *
     * @param {String} attribute  The name of the attribute
     * @param {Object} value  The new value
     * @param {String} flag  A metadata flag describing the attribute
     * @param {Boolean} suppress  When true, validation, events and tracking are suppressed
     * @return {Boolean}  True if attribute was set, false otherwise
     */
//* @event invalid
//* @event change


    set: function(attribute, value, flag, suppress) {
      return _suppressChecked(this, suppress, function() {
        if (!this.canSet(attribute)) {
          return false;
        }
        var previous = this.attributes.get(attribute),
            messages = this.suppressValidation ? [] : this.validate(attribute, value);
        if (messages.length) {
          _triggerAttributeEvent(this, 'invalid', attribute, previous, value, messages);
          return false;
        } else {
          if (previous !== value) {
            this.attributes.set(attribute, value);
            if (flag) {
              _setFlagOn(this, attribute, flag);
            }
            _triggerAttributeEvent(this, 'change', attribute, previous, value);
            if (!this.suppressTracking
                && !ArrayUtils.contains(this.unsavedAttributes, attribute)) {
              this.unsavedAttributes.push(attribute);
            }
          }
          return true;
        }
      });
    },
    /**
     * Determines whether or not this model has a named attribute
     * @method has
     *
     * @param {String} attribute  The name of the attribute
     * @return {Boolean}  True if the attribute exists and has a value
     */
    has: function(attribute) {lacuna_lazy_load("js/libs/lavaca.js[117146:117196]", functionData => eval(functionData))},
    /**
     * The name of the ID attribute
     * @property id
     * @default 'id'
     *
     * @type String
     */

    idAttribute: 'id',
    /**
     * Gets the ID of the model
     * @method id
     *
     * @return {String}  The ID of the model
     */
    id: function() {lacuna_lazy_load("js/libs/lavaca.js[117479:117527]", functionData => eval(functionData))},
    /**
     * Determines whether or not this model has been saved before
     * @method isNew
     *
     * @return {Boolean}  True when the model has no ID associated with it
     */
    isNew: function() {lacuna_lazy_load("js/libs/lavaca.js[117736:117776]", functionData => eval(functionData))},
    /**
     * Ensures that a map is suitable to be applied to this model
     * @method parse
     *
     * @param {Object} map  The string or key-value hash to parse
     * @return {Object}  The parsed version of the map
     */
    parse: function(map) {
      if (typeof map === 'string') {
        map = JSON.parse(map);
      }
      return map;
    },
    /**
     * Sets each attribute of this model according to the map
     * @method apply
     *
     * @param {Object} map  The string or key-value map to parse and apply
     */
    /**
     * Sets each attribute of this model according to the map
     * @method apply
     *
     * @param {Object} map  The string or key-value map to parse and apply
     * @param {Boolean} suppress  When true, validation, events and tracking are suppressed
     */
    apply: function(map, suppress) {
      _suppressChecked(this, suppress, function() {
        map = this.parse(map);
        for (var n in map) {
          this.set(n, map[n]);
        }
      });
    },
    /**
     * Removes all data from the model or removes selected flag from model.
     * @method clear
     *
     * @sig
     * Removes all flagged data from the model
     * @param {String} flag  The metadata flag describing the data to remove
     */
    clear: function(flag) {lacuna_lazy_load("js/libs/lavaca.js[119080:119638]", functionData => eval(functionData))},
    /**
     * Makes a copy of this model
     * @method clone
     *
     * @return {Lavaca.mvc.Model}  The copy
     */
    clone: function() {lacuna_lazy_load("js/libs/lavaca.js[119784:119854]", functionData => eval(functionData))},
    /**
     * Adds a validation rule to this model
     * @method addRule
     *
     * @param {String} attribute  The name of the attribute to which the rule applies
     * @param {Function} callback  The callback to use to validate the attribute, in the
     *   form callback(attribute, value)
     * @param {String} message  A text message used when a value fails the test
     */
    addRule: function(attribute, callback, message) {lacuna_lazy_load("js/libs/lavaca.js[120294:120379]", functionData => eval(functionData))},
    /**
     * Validates all attributes on the model
     * @method validate
     *
     * @return {Object}  A map of attribute names to validation error messages
     */
    /**
     * Runs validation tests for a specific attribute
     * @method validate
     *
     * @param {String}  The name of the attribute to test
     * @return {Array}  A list of validation error messages
     */
    /**
     * Runs validation against a potential value for a attribute
     * @method validate
     * @param {String} attribute  The name of the attribute
     * @param {Object} value  The potential value for the attribute
     * @return {Array}  A list of validation error messages
     */
    validate: function(attribute, value) {
      var messages,
          rules,
          i = -1,
          rule;
      if (attribute) {
        messages = [];
        value = value === UNDEFINED ? this.get(attribute, value) : value;
        rules = this.rules.get(attribute);
        if (rules) {
          while (!!(rule = rules[++i])) {
            if (!rule.rule(attribute, value)) {
              messages.push(rule.message);
            }
          }
        }
        return messages;
      } else {
        messages = {};
        this.rules.each(function(attributeName) {lacuna_lazy_load("js/libs/lavaca.js[121642:121719]", functionData => eval(functionData))}, this);
        return _isValid(messages);
      }
    },
    /**
     * Processes the data received from a fetch request
     * @method onFetchSuccess
     *
     * @param {Object} response  The response data
     */
    onFetchSuccess: function(response) {lacuna_lazy_load("js/libs/lavaca.js[121977:122251]", functionData => eval(functionData))},
    /**
     * Triggered when the model is unable to fetch data
     * @method onFetchError
     *
     * @param {Object} value  The error value
     */
    onFetchError: function(response) {lacuna_lazy_load("js/libs/lavaca.js[122443:122506]", functionData => eval(functionData))},
    /**
     * Loads the data for this model from the server and only apply to this model attributes (Note: Does not clear the model first)
     * @method fetch
     *
     * @event fetchSuccess
     * @event fetchError
     */
    /**
     * Loads the data for this model from the server and only apply to this model attributes (Note: Does not clear the model first)
     * @method fetch
     *
     * @param {String} url  The URL from which to load the data
     * @return {Lavaca.util.Promise}  A promise
     */
    /**
     * Loads the data for this model from the server and only apply to this model attributes (Note: Does not clear the model first)
     * @method fetch
     *
     * @param {Object} options  jQuery AJAX settings. If url property is missing, fetch() will try to use the url property on this model
     * @return {Lavaca.util.Promise}  A promise
     */
    /**
     * Loads the data for this model from the server and only apply to this model attributes (Note: Does not clear the model first)
     * @method fetch
     *
     * @param {String} url  The URL from which to load the data
     * @param {Object} options  jQuery AJAX settings
     * @return {Lavaca.util.Promise}  A promise
     */
    fetch: function(url, options) {lacuna_lazy_load("js/libs/lavaca.js[123760:124111]", functionData => eval(functionData))},
    /**
     * Converts a relative path to an absolute api url based on environment config 'apiRoot'
     * @method getApiURL
     *
     * @param {String} relPath  A relative path
     * @return {String}  A formated api url or an apparently bad url '/please_set_model_url' if relPath argument is faslsy
     */
    getApiURL: function(relPath) {lacuna_lazy_load("js/libs/lavaca.js[124458:124686]", functionData => eval(functionData))},
    /**
     * Saves the model
     * @method save
     *
     *
     * @param {Function} callback  A function callback(model, changedAttributes, attributes)
     *   that returns either a promise or a truthy value
     *   indicating whether the operation failed or succeeded
     * @return {Lavaca.util.Promise}  A promise
     */
    /**
     * Saves the model
     * @method save
     *
     * @param {Function} callback  A function callback(model, changedAttributes, attributes)
     *   that returns either a promise or a truthy value
     *   indicating whether the operation failed or succeeded
     * @param {Object} thisp  The context for the callback
     * @return {Lavaca.util.Promise}  A promise
     */

//* @event saveSuccess
//* @event saveError

    save: function(callback, thisp) {lacuna_lazy_load("js/libs/lavaca.js[125488:126520]", functionData => eval(functionData))},
    /**
     * Saves the model to the server via POST
     * @method saveToServer
     *
     * @param {String} url  The URL to which to post the data
     * @return {Lavaca.util.Promise}  A promise
     */
    saveToServer: function(url) {lacuna_lazy_load("js/libs/lavaca.js[126761:127264]", functionData => eval(functionData))},
    /**
     * Converts this model to a key-value hash
     * @method toObject
     *
     * @return {Object}  The key-value hash
     */
    toObject: function() {
      var obj = this.attributes.toObject(),
          flags;
      for(var key in obj) {
        if(typeof obj[key] === "function") {
          flags = this.flags[Model.DO_NOT_COMPUTE];
          if (!flags || ArrayUtils.indexOf(flags, key) === -1) {
            obj[key] = obj[key].call(this);
          }
        }
      }
      return obj;
    },
    /**
     * Converts this model to JSON
     * @method toJSON
     *
     * @return {String}  The JSON string representing the model
     */
    toJSON: function() {lacuna_lazy_load("js/libs/lavaca.js[127948:128001]", functionData => eval(functionData))},
    /**
     * Bind an event handler to this object
     * @method on
     *
     *
     * @param {String} type  The name of the event
     * @param {Function} callback  The function to execute when the event occurs
     * @return {Lavaca.events.EventDispatcher}  This event dispatcher (for chaining)
     */
    /**
     * Bind an event handler to this object
     * @method on
     *
     * @param {String} type  The name of the event
     * @param {String} attr  An attribute to which to limit the scope of events
     * @param {Function} callback  The function to execute when the event occurs
     * @return {Lavaca.events.EventDispatcher}  This event dispatcher (for chaining)
     */
    /**
     * Bind an event handler to this object
     * @method on
     * @param {String} type  The name of the event
     * @param {Function} callback  The function to execute when the event occurs
     * @param {Object} thisp  The context of the handler
     * @return {Lavaca.events.EventDispatcher}  This event dispatcher (for chaining)
     */
    /**
     * Bind an event handler to this object
     * @method on
     * @param {String} type  The name of the event
     * @param {String} attr  An attribute to which to limit the scope of events
     * @param {Function} callback  The function to execute when the event occurs
     * @param {Object} thisp  The context of the handler
     * @return {Lavaca.events.EventDispatcher}  This event dispatcher (for chaining)
     */
    on: function(type, attr, callback, thisp) {
      if (typeof attr === 'function') {
        thisp = callback;
        callback = attr;
        attr = null;
      }
      function handler(e) {lacuna_lazy_load("js/libs/lavaca.js[129672:129779]", functionData => eval(functionData))}
      handler.fn = callback;
      handler.thisp = thisp;
      return EventDispatcher.prototype.on.call(this, type, handler, thisp);
    },
    /**
    * Filters the raw response from onFetchSuccess() down to a custom object. (Meant to be overriden)
    * @method responseFilter
    *
    * @param {Object} response  The raw response passed in onFetchSuccess()
    * @return {Object}  An object to be applied to this model instance
    */
    responseFilter: function(response) {lacuna_lazy_load("js/libs/lavaca.js[130259:130289]", functionData => eval(functionData))}
  });
  /**
   * @field {String} SENSITIVE
   * @static
   * @default 'sensitive'
   * Flag indicating that data is sensitive
   */
  Model.SENSITIVE = 'sensitive';
  /**
   * @field {String} DO_NOT_COMPUTE
   * @static
   * @default 'do_not_compute'
   * Flag indicating that the selected attribute should not be executed
   * as a computed property and should instead just return the function.
   */
  Model.DO_NOT_COMPUTE = 'do_not_compute';

  return Model;

});

define('lavaca/ui/Template',['require','lavaca/util/Cache','lavaca/util/Map'],function(require) {

  var Cache = require('lavaca/util/Cache'),
      Map = require('lavaca/util/Map');

  var _cache = new Cache(),
      _types = [];

  /**
   * Abstract type for templates
   * @class lavaca.ui.Template
   * @extends lavaca.util.Map
   */
  var Template = Map.extend({
    /**
     * Compiles the template
     * @method compile
     */
    compile: function() {lacuna_lazy_load("js/libs/lavaca.js[131218:131245]", functionData => eval(functionData))},
    /**
     * Renders the template to a string
     * @method render
     *
     * @param {Object} model  The data model to provide to the template
     * @return {Lavaca.util.Promise}  A promise
     */
    render: function() {lacuna_lazy_load("js/libs/lavaca.js[131475:131506]", functionData => eval(functionData))},
    /**
     * Parses server data to include in this lookup
     * @method process
     *
     * @param {String} text  The server data string
     */
    process: function(text) {lacuna_lazy_load("js/libs/lavaca.js[131686:131717]", functionData => eval(functionData))}
  });
  /**
   * Finds the template with a given name
   * @method get
   * @static
   *
   * @param {String} name  The name of the template
   * @return {Lavaca.ui.Template}  The template (or null if no such template exists)
   */
  Template.get = function(name) {
    return _cache.get(name);
  };
  /**
   * Scans the document for all templates with registered types and
   *   prepares template objects from them
   * @method init
   * @static
   */
   /**
   *
   * Scans the document for all templates with registered types and
   *   prepares template objects from them
   * @method init
   * @static
   * @param {jQuery} scope  The element to which to limit the scan
   */
  Template.init = function(scope) {
    var i = -1,
        type, templates, templateName, template;

    while (!!(type = _types[++i])) {
      var construct = function(name, src, code) {
        return new type.js(name, src, code);
      };

      // Load pre-compiled templates
      if (typeof type.js.getCompiledTemplates === "function") {
        templates = type.js.getCompiledTemplates();
        for (templateName in templates) {
          template = construct(templateName, null, templates[templateName]);
          template.compiled = true;
          _cache.set(templateName, template);
        }
      }

      // Load un-compiled templates
      if (type.mime) {
        Map.init(_cache, type.mime, construct, scope);
      }
    }
  };
  /**
   * Disposes of all templates
   * @method dispose
   * @static
   */
  Template.dispose = function() {lacuna_lazy_load("js/libs/lavaca.js[133258:133288]", functionData => eval(functionData))};
  /**
   * Finds the named template and renders it to a string
   * @method render
   * @static
   *
   * @param {String} name  The name of the template
   * @param {Object} model  The data model to provide to the template
   * @return {Lavaca.util.Promise}  A promise
   */
  Template.render = function(name, model) {lacuna_lazy_load("js/libs/lavaca.js[133607:133776]", functionData => eval(functionData))};
  /**
   * Registers a type of template to look for on intilization.
   * @method register
   * @static
   * @param {String} mimeType  The mime-type associated with the template
   * @param {Function} TTemplate  The JavaScript type used for the template (should derive from [[Lavaca.ui.Template]])
   */
   /**
   * Registers a type of template to look for on intilization.
   * @method register
   * @static
   * @param {Function} TTemplate  The JavaScript type used for the template (should derive from [[Lavaca.ui.Template]])
   */
  Template.register = function(mimeType, TTemplate) {
    if (typeof mimeType === "function") {
      TTemplate = mimeType;
      mimeType = null;
    }
    _types[_types.length] = {mime: mimeType, js: TTemplate};
  };

  return Template;

});

define('lavaca/util/log',[],function() {
  /**
   * Logs to the console (or alerts if no console exists)
   * @class lavaca.util.log
   */
   /**
   * Logs to the console (or alerts if no console exists)
   * @method log
   * @static
   *
   * @params {Object} arg  The content to be logged
   */
  var log = function() {lacuna_lazy_load("js/libs/lavaca.js[134878:135016]", functionData => eval(functionData))};

  return log;

});

define('lavaca/mvc/View',['require','$','lavaca/events/EventDispatcher','lavaca/mvc/Model','lavaca/ui/Template','lavaca/util/Cache','lavaca/util/Promise','lavaca/util/log','lavaca/util/uuid'],function(require) {

  var $ = require('$'),
    EventDispatcher = require('lavaca/events/EventDispatcher'),
    Model = require('lavaca/mvc/Model'),
    Template = require('lavaca/ui/Template'),
    Cache = require('lavaca/util/Cache'),
    Promise = require('lavaca/util/Promise'),
    log = require('lavaca/util/log'),
    uuid = require('lavaca/util/uuid');




  /**
   * Base View Class
   * @class lavaca.mvc.View
   * @extends lavaca.events.EventDispatcher
   * @constructor
   * @param {Object | String} el the selector or Object for the element to attach to the view
   * @param {Object} [model] the model for the view
   * @param {Object} [parentView] the parent view for the view
   *
   *
   */
  var View = EventDispatcher.extend(function(el, model, parentView) {
    EventDispatcher.call(this);

    /**
     * The model used by the view
     * @property model
     * @default null
     * @optional
     * @type lavaca.mvc.Model
     *
     */
    this.model = model || null;

    /**
     * An id is applied to a data property on the views container
     * @property id
     * @default generated from className and unique identifier
     * @type String
     *
     */
    this.id = this.className + '-' + uuid();

    /**
     * If the view is created in the context of a childView, the parent view is assigned to this view
     * @property parentView
     * @default null
     * @type Object
     *
     */
    this.parentView = parentView || null;

    /**
     * The element that is either assigned to the view if in the context of a childView, or is created for the View
     * if it is a PageView
     * @property el
     * @default null
     * @type Object | String
     *
     */
    this.el = typeof el === 'string' ? $(el) : (el || null);

    /**
     * A dictionary of selectors and event types in the form
     * {eventType: {delegate: 'xyz', callback: func}}@property el
     * @property eventMap
     * @default {}
     * @type Object
     */
    this.eventMap = {};
    /**
     * A dictionary of selectors, View types and models in the form
     *   {selector: {TView: TView, model: model}}}
     * @property {Object} childViewMap
     * @default {}
     * @type Object
     *
     */
    this.childViewMap = {};
    /**
     * Interactive elements used by the view
     * @property childViews
     * @default lavaca.util.cache
     * @type lavaca.util.Cache
     */
    this.childViews = new Cache();
    /**
     * A dictionary of selectors and widget types in the form
     *   {selector: widgetType}
     * @property {Object} widgetMap
     * @default {}
     * @type Object
     */
    this.widgetMap = {};
    /**
     * Interactive elements used by the view
     * @property widgets
     * @default lavaca.util.Cache
     * @type lavaca.util.Cache
     */
    this.widgets = new Cache();
    /**
     *  A map of all the events to be applied to child Views in the form of
     *  {type: {TView: TView, callback : callback}}
     * @property childViewEventMap
     * @default Object
     * @type Object
     */
    this.childViewEventMap = {};

    this
      .on('rendersuccess', this.onRenderSuccess)
      .on('rendererror', this.onRenderError);

    if (this.autoRender) {
      this.render();
    }
  }, {
    /**
     * The element associated with the view
     * @property {jQuery} el
     * @default null
     *
     */
    el: null,
    /**
     * The name of the template associated with the view
     * @property {String} template
     * @default null
     *
     */
    template: null,
    /**
     * A class name added to the view container
     * @property String className
     * @default null
     *
     */
    className: null,
    /**
     * Will render any childViews automatically when set to true
     * @property autoRender
     * @default false
     *
     * @type Boolean
     */
    autoRender: false,
    /**
     * Renders the view using its template and model
     * @method render
     *
     *
     *
     * @return {lavaca.util.Promise} A promise
     */
    render: function() {lacuna_lazy_load("js/libs/lavaca.js[139278:140300]", functionData => eval(functionData))},

    /**
     * Re-renders the view's template and replaces the DOM nodes that match
     * the selector argument. If no selector argument is provided, the whole view
     * will be re-rendered. If the first parameter is passed as <code>false</code>
     * the resulting html will pe passed with the promise and nothing will be replaced.
     * Note: the number of elements that match the provided selector must be identical
     * in the current markup and in the newly rendered markup or else the returned
     * promise will be rejected.
     * Re-renders the view's template using the view's model
     * and redraws the entire view
     * @method redraw
     *
     * @return {lavaca.util.Promise} A promise
     */
    /**
     * Re-renders the view's template using the specified model
     * and redraws the entire view
     * @method redraw
     * @param {Object} model  The data model to be passed to the template
     * @return {lavaca.util.Promise} A promise
     */
    /**
     * Re-renders the view's template using the view's model and only redraws the
     * elements that match the specified selector string.
     * Note: The numbers of items that match the selector must
     * be exactly the same in the view's current markup and in the newly rendered
     * markup. If that is not the case, the returned promise will be rejected and
     * nothing will be redrawn.
     * @method redraw
     * @param {String} selector  Selector string that defines elements to redraw
     * @return {lavaca.util.Promise} A promise
     */
    /**
     * Re-renders the view's template using the specified model and only redraws the
     * elements that match the specified selector string.
     * Note: The numbers of items that match the selector must
     * be exactly the same in the view's current markup and in the newly rendered
     * markup. If that is not the case, the returned promise will be rejected and
     * nothing will be redrawn.
     * @method redraw
     * @param {String} selector  Selector string that defines elements that will be updated
     * @param {Object} model  The data model to be passed to the template
     * @return {lavaca.util.Promise} A promise
     */
    /**
     * Re-renders the view's template using the view's model. If shouldRedraw is true,
     * the entire view will be redrawn. If shouldRedraw is false, nothing will be redrawn,
     * but the returned promise will be resolved with the newly rendered content. This allows
     * the caller to attach a success handler to the returned promise and define their own
     * redrawing behavior.
     * @method redraw
     * @param {Boolean} shouldRedraw  Whether the view should be automatically redrawn.
     * @return {lavaca.util.Promise}  A promise
     */
    /**
     * Re-renders the view's template using the specified model. If shouldRedraw is true,
     * the entire view will be redrawn. If shouldRedraw is false, nothing will be redrawn,
     * but the returned promise will be resolved with the newly rendered content. This allows
     * the caller to attach a success handler to the returned promise and define their own
     * redrawing behavior.
     * @method redraw
     * @param {Boolean} shouldRedraw  Whether the view should be automatically redrawn.
     * @param {Object} model  The data model to be passed to the template
     * @return {lavaca.util.Promise}  A promise
     */
    redraw: function(selector, model) {lacuna_lazy_load("js/libs/lavaca.js[143742:145870]", functionData => eval(functionData))},

    /**
     * Dispose old widgets and child views
     * @method disposeChildViews
     * @param  {Object} $el the $el to search for child views and widgets in
     */
    disposeChildViews: function ($el) {lacuna_lazy_load("js/libs/lavaca.js[146080:146541]", functionData => eval(functionData))},
    /**
     * Dispose old widgets and child views
     * @method disposeWidgets
     * @param  {Object} $el the $el to search for child views and widgets in
     */
    disposeWidgets: function ($el) {lacuna_lazy_load("js/libs/lavaca.js[146744:147171]", functionData => eval(functionData))},
    /**
     * Unbinds events from the model
     * @method clearModelEvents
     *
     */
    clearModelEvents: function() {lacuna_lazy_load("js/libs/lavaca.js[147298:147862]", functionData => eval(functionData))},
    /**
     * Checks for strings in the event map to bind events to this automatically
     * @method bindMappedEvents
     */
    bindMappedEvents: function() {
      var callbacks,
        delegate,
        type;
      for (delegate in this.eventMap) {
        callbacks = this.eventMap[delegate];
        for (type in callbacks) {
          if (typeof this.eventMap[delegate][type] === 'string'){
            this.eventMap[delegate][type] = this[this.eventMap[delegate][type]].bind(this);
          }
        }
      }
    },
    /**
     * Binds events to the view
     * @method applyEvents
     *
     */
    applyEvents: function() {
      var el = this.el,
        callbacks,
        callback,
        property,
        delegate,
        type,
        dotIndex,
        opts;
      for (delegate in this.eventMap) {
        callbacks = this.eventMap[delegate];
        if (delegate === 'self') {
          delegate = null;
        }
        for (type in callbacks) {
          callback = callbacks[type];
          if (typeof callback === 'object') {
            opts = callback;
            callback = callback.on;
          } else {
            opts = undefined;
          }
          if (typeof callback === 'string') {
            if (callback in this) {
              callback = this[callback].bind(this);
            }
          }
          if (delegate === 'model') {
            if (this.model && this.model instanceof Model) {
              dotIndex = type.indexOf('.');
              if (dotIndex !== -1) {
                property = type.substr(dotIndex+1);
                type = type.substr(0, dotIndex);
              }
              this.model.on(type, property, callback, this);
            }
          } else if (type === 'animationEnd' && el.animationEnd) {
            el.animationEnd(delegate, callback);
          } else if (type === 'transitionEnd' && el.transitionEnd) {
            el.transitionEnd(delegate, callback);
          } else {
            el.on(type, delegate, callback);
          }
        }
      }
    },
    /**
     * Maps multiple delegated events for the view
     * @method mapEvent
     *
     * @param {Object} map  A hash of the delegates, event types, and handlers
     *     that will be bound when the view is rendered. The map should be in
     *     the form <code>{delegate: {eventType: callback}}</code>. For example,
     *     <code>{'.button': {click: onClickButton}}</code>. The events defined in
     *     [[Lavaca.fx.Animation]] and [[Lavaca.fx.Transition]] are also supported.
     *     To map an event to the view's el, use 'self' as the delegate. To map
     *     events to the view's model, use 'model' as the delegate. To limit events
     *     to only a particular property on the model, use a period-seperated
     *     syntax such as <code>{model: {'change.myproperty': myCallback}}</code>
     * @return {lavaca.mvc.View}  This view (for chaining)
     */
    /**
     * Maps an event for the view
     * @method mapEvent
     * @param {String} delegate  The element to which to delegate the event
     * @param {String} type  The type of event
     * @param {Function} callback  The event handler
     * @return {lavaca.mvc.View}  This view (for chaining)
     */
    mapEvent: function(delegate, type, callback) {
      var o;
      if (typeof delegate === 'object') {
        o = delegate;
        for (delegate in o) {
          for (type in o[delegate]) {
            this.mapEvent(delegate, type, o[delegate][type]);
          }
        }
      } else {
        o = this.eventMap[delegate];
        if (!o) {
          o = this.eventMap[delegate] = {};
        }
        o[type] = callback;
      }
      return this;
    },
    /**
     * Initializes widgets on the view
     * @method createWidgets
     *
     */
    createWidgets: function() {
      var cache = this.widgets,
        n,
        o;
      for (n in this.widgetMap) {
        o = this.widgetMap[n];
        (n === 'self' ? this.el : this.el.find(n))
          .each(function(index, item) {lacuna_lazy_load("js/libs/lavaca.js[151910:152289]", functionData => eval(functionData))});
      }
    },
    /**
     * Assigns multiple widget types to elements on the view
     * @method mapWidget
     * @param {Object} map  A hash of selectors to widget types to be bound when the view is rendered.
     *     The map should be in the form {selector: TWidget}. For example, {'form': Lavaca.ui.Form}
     * @return {Lavaca.mvc.View}  This view (for chaining)
     *
     */
    /**
     * Assigns a widget type to be created for elements matching a selector when the view is rendered
     * @method mapWidget
     * @param {String} selector  The selector for the root element of the widget
     * @param {Function} TWidget  The [[Lavaca.ui.Widget]]-derived type of widget to create
     * @return {Lavaca.mvc.View}  This view (for chaining)
     */
    mapWidget: function(selector, TWidget) {lacuna_lazy_load("js/libs/lavaca.js[153096:153376]", functionData => eval(functionData))},
    /**
     * Initializes child views on the view, called from onRenderSuccess
     * @method createChildViews
     *
     */
    createChildViews: function() {
      var cache = this.childViews,
        n,
        self = this,
        o;
      for (n in this.childViewMap) {
        o = this.childViewMap[n];
        this.el.find(n)
          .each(function(index, item) {lacuna_lazy_load("js/libs/lavaca.js[153751:153994]", functionData => eval(functionData))});
      }
    },
    /**
     * Assigns multiple Views to elements on the view
     * @method mapChildView
     * @param {Object} map  A hash of selectors to view types and models to be bound when the view is rendered.
     *     The map should be in the form {selector: {TView : TView, model : lavaca.mvc.Model}}. For example, {'form': {TView : lavaca.mvc.ExampleView, model : lavaca.mvc.Model}}
     * @return {lavaca.mvc.View}  This view (for chaining)
     *
     * Assigns a View type to be created for elements matching a selector when the view is rendered
     * @method mapChildView
     * @param {String} selector  The selector for the root element of the View
     * @param {Function} TView  The [[Lavaca.mvc.View]]-derived type of view to create
     * @param {Function} model  The [[Lavaca.mvc.Model]]-derived model instance to use in the child view
     * @return {Lavaca.mvc.View}  This view (for chaining)
     */
    mapChildView: function(selector, TView, model) {
      if (typeof selector === 'object') {
        var childViewTypes = selector;
        for (selector in childViewTypes) {
          this.mapChildView(selector, childViewTypes[selector].TView, childViewTypes[selector].model);
        }
      } else {
        this.childViewMap[selector] = { TView: TView, model: model };
      }
      return this;
    },

    /**
     * Listen for events triggered from child views.
     * @method mapChildViewEvent
     *
     * @param {String} type The type of event to listen for
     * @param {Function} callback The method to execute when this event type has occured
     * @param {Lavaca.mvc.View} TView (Optional) Only listen on child views of this type
     */
    /**
     * Maps multiple child event types
     * @method mapChildViewEvent
     *
     * @param {Object} map A hash of event types with callbacks and TView's associated with that type
     *  The map should be in the form {type : {callback : {Function}, TView : TView}}
     */
    mapChildViewEvent: function(type, callback, TView) {lacuna_lazy_load("js/libs/lavaca.js[156019:156410]", functionData => eval(functionData))},

    /**
     * Called from onRenderSuccess of the view, adds listeners to all childviews if present
     * @method applyChildViewEvent
     *
     */
    applyChildViewEvents: function() {
      var childViewEventMap = this.childViewEventMap,
        type;
      for (type in childViewEventMap) {
        this.childViews.each(function(key, item) {lacuna_lazy_load("js/libs/lavaca.js[156759:157233]", functionData => eval(functionData))});
      }
    },
    /**
     * Executes when the template renders successfully
     * @method onRenderSuccess
     *
     * @param {Event} e  The render event. This object should have a string property named "html"
     *   that contains the template's rendered HTML output.
     */
    onRenderSuccess: function(e) {
      this.el.html(e.html);
      this.bindMappedEvents();
      this.applyEvents();
      this.createWidgets();
      this.createChildViews();
      this.applyChildViewEvents();
      this.el.data('view', this);
      this.el.attr('data-view-id', this.id);
      this.hasRendered = true;
    },
    /**
     * Executes when the template fails to render
     * @method onRenderError
     *
     * @param {Event} e  The error event. This object should have a string property named "err"
     *   that contains the error message.
     */
    onRenderError: function(e) {lacuna_lazy_load("js/libs/lavaca.js[158120:158145]", functionData => eval(functionData))},
    /**
     * Readies the view for garbage collection
     * @method dispose
     */
    dispose: function() {lacuna_lazy_load("js/libs/lavaca.js[158257:158689]", functionData => eval(functionData))}
  });

  return View;

});

define('lavaca/mvc/PageView',['require','$','lavaca/mvc/Model','lavaca/mvc/View','lavaca/ui/Template','lavaca/util/Promise','lavaca/util/delay'],function(require) {

  var $ = require('$'),
      Model = require('lavaca/mvc/Model'),
      View = require('lavaca/mvc/View'),
      Template = require('lavaca/ui/Template'),
      Promise = require('lavaca/util/Promise'),
      delay = require('lavaca/util/delay');

  /**
   * Page View type, represents an entire screen
   * @class lavaca.mvc.PageView
   * @extends lavaca.mvc.View
   *
   * @constructor
   * @param {Object} el  The element that the PageView is bound to
   * @param {Object} model  The model used by the view
   * @param {Number} [layer]  The index of the layer on which the view sits
   *
   */
  var PageView = View.extend(function(el, model, layer) {

    View.call(this, el, model);
    /**
     * The index of the layer on which the view sits
     * @property {Number} layer
     * @default 0
     */
    this.layer = layer || 0;


  }, {

    /**
     * The element containing the view
     * @property {jQuery} shell
     * @default null
     */
    shell: null,

    /**
     * Creates the view's wrapper element
     * @method wrapper
     * @return {jQuery}  The wrapper element
     */
    wrapper: function() {
      return $('<div class="view"></div>');
    },
    /**
     * Creates the view's interior content wrapper element
     * @method interior
     * @return {jQuery} The interior content wrapper element
     */
    interior: function() {
      return $('<div class="view-interior"></div>');
    },


    /**
     * Adds this view to a container
     * @method insertInto
     * @param {jQuery} container  The containing element
     */
    insertInto: function(container) {
      if (this.shell.parent()[0] !== container[0]) {
        var layers = container.children('[data-layer-index]'),
            i = -1,
            layer;
        while (!!(layer = layers[++i])) {
          layer = $(layer);
          if (layer.attr('data-layer-index') > this.index) {
            this.shell.insertBefore(layer);
            return;
          }
        }
        container.append(this.shell);
      }
    },
    /**
     * Renders the view using its template and model, overrides the View class render method
     * @method render
     *
     * @return {Lavaca.util.Promise}  A promise
     */
    render: function() {
      var promise = new Promise(this),
          renderPromise = new Promise(this),
          template = Template.get(this.template),
          model = this.model;
      if (model instanceof Model) {
        model = model.toObject();
      }
      if (this.el) {
        this.el.remove();
      }

      this.shell = this.wrapper();
      this.el = this.interior();
      this.shell.append(this.el);
      this.shell.attr('data-layer-index', this.layer);
      if (this.className) {
        this.shell.addClass(this.className);
      }
      promise
        .success(function(html) {
          /**
           * Fires when html from template has rendered
           * @event rendersuccess
           */
          this.trigger('rendersuccess', {html: html});
          renderPromise.resolve();
        })
        .error(function(err) {lacuna_lazy_load("js/libs/lavaca.js[161951:162175]", functionData => eval(functionData))});
      template
        .render(model)
        .success(promise.resolver())
        .error(promise.rejector());

      return renderPromise;
    },
    /**
     * Executes when the user navigates to this view
     * @method enter
     * @param {jQuery} container  The parent element of all views
     * @param {Array} exitingViews  The views that are exiting as this one enters
     * @return {lavaca.util.Promise}  A promise
     */
    enter: function(container) {
      var promise = new Promise(this),
          renderPromise;
      container = $(container);
      if (!this.hasRendered) {
        renderPromise = this
          .render()
          .error(promise.rejector());
      }
      this.insertInto(container);
      if (renderPromise) {
        promise.when(renderPromise);
      } else {
        delay(promise.resolver());
      }
      promise.then(function() {
        /**
         * Fired when there was an error during rendering process
         * @event rendererror
         */
        this.trigger('enter');
      });
      return promise;
    },
    /**
     * Executes when the user navigates away from this view
     * @method exit
     *
     * @param {jQuery} container  The parent element of all views
     * @param {Array} enteringViews  The views that are entering as this one exits
     * @return {lavaca.util.Promise}  A promise
     */
    exit: function() {lacuna_lazy_load("js/libs/lavaca.js[163565:163885]", functionData => eval(functionData))}
  });

  return PageView;

});

define('lavaca/mvc/ViewManager',['require','$','lavaca/mvc/PageView','lavaca/util/ArrayUtils','lavaca/util/Cache','lavaca/util/Disposable','lavaca/util/Promise','lavaca/util/delay','mout/object/merge','lavaca/net/History'],function(require) {

  var $ = require('$'),
      PageView = require('lavaca/mvc/PageView'),
      ArrayUtils = require('lavaca/util/ArrayUtils'),
      Cache = require('lavaca/util/Cache'),
      Disposable = require('lavaca/util/Disposable'),
      Promise = require('lavaca/util/Promise'),
      delay = require('lavaca/util/delay'),
      merge = require('mout/object/merge'),
      History = require('lavaca/net/History');

  /**
   * Manager responsible for drawing views
   * @class lavaca.mvc.ViewManager
   * @extends lavaca.util.Disposable
   *
   * @constructor
   * @param {jQuery} el  The element that contains all layers
   */
  var ViewManager = Disposable.extend(function(el) {
    Disposable.call(this);
    /**
    * The element that contains all view layers
     * @property {jQuery} el
     * @default null
     */
    this.el = $(el || document.body);
    /**
     * A cache containing all views
     * @property {Lavaca.util.Cache} views
     * @default new Lavaca.util.Cache()
     */
    this.pageViews = new Cache();
    /**
     * A list containing all layers
     * @property {Array} layers
     * @default []
     */
    this.layers = [];
    /**
     * A list containing all views that are currently exiting
     * @property {Array} exitingPageViews
     * @default []
     */
    this.exitingPageViews = [];
    /**
     * A list containing all views that are currently entering
     * @property {Array} enteringPageViews
     * @default []
     */
    this.enteringPageViews = [];
  }, {
    /**
     * When true, the view manager is prevented from loading views.
     * @property {Boolean} locked
     * @default false
     */
    locked: false,
    /**
     * Sets the el property on the instance
     * @method setEl
     *
     * @param {jQuery} el  A jQuery object of the element that contains all layers
     * @return {Lavaca.mvc.ViewManager}  This View Manager instance
     */
    /**
     * Sets the el property on the instance
     * @method setEl
     *
     * @param {String} el  A CSS selector matching the element that contains all layers
     * @return {Lavaca.mvc.ViewManager}  This View Manager instance
     */
    setEl: function(el) {
      this.el = typeof el === 'string' ? $(el) : el;
      return this;
    },
    /**
     * Loads a view
     * @method load
     *
     * @param {String} cacheKey  The cache key associated with the view
     * @param {Function} TPageView  The type of view to load (should derive from [[Lavaca.mvc.View]])
     * @param {Object} model  The views model
     * @param {Number} layer  The index of the layer on which the view will sit
     * @return {Lavaca.util.Promise}  A promise
     */
    /**
     * Loads a view
     * @method load
     *
     * @param {String} cacheKey  The cache key associated with the view
     * @param {Function} TPageView  The type of view to load (should derive from [[Lavaca.mvc.View]])
     * @param {Object} model  The views model
     * @param {Object} params  Parameters to be mapped to the view
     * @return {Lavaca.util.Promise}  A promise
     */
    load: function(cacheKey, TPageView, model, params) {
      if (this.locked) {
        return (new Promise(this)).reject('locked');
      } else {
        this.locked = true;
      }
      params = params || {};
      var self = this,
          layer = layer || 0,
          pageView = this.pageViews.get(cacheKey),
          promise = new Promise(this),
          enterPromise = new Promise(promise),
          renderPromise = null,
          exitPromise = null;
      promise.always(function() {
        this.locked = false;
      });
      if (typeof params === 'number') {
        layer = params;
      } else if (params.layer) {
        layer = params.layer;
      }
      if (!pageView) {
        if (History.isRoutingBack && self.layers[layer] instanceof TPageView) {
          pageView = self.layers[layer];
        } else {
          pageView = new TPageView(null, model, layer);
          if (typeof params === 'object') {
            merge(pageView, params);
          }
          renderPromise = pageView.render();
          if (cacheKey !== null) {
            this.pageViews.set(cacheKey, pageView);
            pageView.cacheKey = cacheKey;
          }
        }
      }
      function lastly() {
        self.enteringPageViews = [pageView];
        promise.success(function() {
          delay(function() {
            self.enteringPageViews = [];
          });
        });
        exitPromise = self.dismissLayersAbove(layer - 1, pageView);
        if (self.layers[layer] !== pageView) {
          enterPromise
            .when(pageView.enter(self.el, self.exitingPageViews), exitPromise)
            .then(promise.resolve);
          self.layers[layer] = pageView;
        } else {
          promise.when(exitPromise);
        }
      }
      if (renderPromise) {
        renderPromise.then(lastly, promise.rejector());
      } else {
        lastly();
      }
      return promise;
    },
    /**
     * Removes all views on a layer
     * @method dismiss
     *
     * @param {Number} index  The index of the layer to remove
     */
    /**
     * Removes all views on a layer
     * @method dismiss
     *
     * @param {jQuery} el  An element on the layer to remove (or the layer itself)
     */
    /**
     * Removes all views on a layer
     * @method dismiss
     *
     * @param {Lavaca.mvc.View} view  The view on the layer to remove
     */
    dismiss: function(layer) {lacuna_lazy_load("js/libs/lavaca.js[169620:170116]", functionData => eval(functionData))},
    /**
     * Removes all layers above a given index
     * @method dismissLayersAbove
     *
     * @param {Number}  index The index above which to clear
     * @return {Lavaca.util.Promise}  A promise
     */
    /**
     * Removes all layers above a given index
     * @method dismissLayersAbove
     *
     * @param {Number} index  The index above which to clear
     * @param {Lavaca.mvc.View}  exceptForView A view that should not be dismissed
     * @return {Lavaca.util.Promise}  A promise
     */
    dismissLayersAbove: function(index, exceptForView) {
      var promise = new Promise(this),
          dismissedLayers = false,
          i,
          layer;
      for (i = this.layers.length - 1; i > index; i--) {
        if ((layer = this.layers[i]) && (!exceptForView || exceptForView !== layer)) {
          (function(layer) {lacuna_lazy_load("js/libs/lavaca.js[170957:171481]", functionData => eval(functionData))}).call(this, layer);
          dismissedLayers = true;
        }
      }
      if (!dismissedLayers) {
        promise.resolve();
      }
      return promise;
    },
    /**
     * Empties the view cache
     * @method flush
     */
    flush: function(cacheKey) {lacuna_lazy_load("js/libs/lavaca.js[171745:172197]", functionData => eval(functionData))},
    /**
     * Readies the view manager for garbage collection
     * @method dispose
     */
    dispose: function() {lacuna_lazy_load("js/libs/lavaca.js[172317:172371]", functionData => eval(functionData))}
  });

  return new ViewManager(null);

});

define('lavaca/env/ChildBrowser',['require','lavaca/env/Device','lavaca/events/EventDispatcher','lavaca/util/Promise'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[172554:173865]", functionData => eval(functionData))});

define('lavaca/util/Translation',['require','./Cache','./Map'],function(require) {

  var Cache = require('./Cache'),
      Map = require('./Map');

  var _cache = new Cache();

  function _construct(name, src, code) {lacuna_lazy_load("js/libs/lavaca.js[174086:174288]", functionData => eval(functionData))}

  /**
   * Translation dictionary
   * @class lavaca.util.Translation
   * @extends lavaca.util.Map
   *
   * @constructor
   * @param {String} name  The name of the map
   * @param {String} src  The URL of the map's data (or null if code is supplied)
   * @param {String} code  The raw string data for the map (or null if src is supplied)
   */
  var Translation = Map.extend(function(name) {lacuna_lazy_load("js/libs/lavaca.js[174682:175324]", functionData => eval(functionData))}, {
    /**
     * Determines whether or not this translation works for a locale
     * @method is
     * @param {String} language  The locale's language
     * @return {Boolean}  True if this translation applies
     */
    /**
     * Determines whether or not this translation works for a locale
     * @method is
     * @param {String} language  The locale's language
     * @param {String} country   (Optional) The locale's country
     * @return {Boolean}  True if this translation applies
     */
    is: function(language, country) {lacuna_lazy_load("js/libs/lavaca.js[175863:175978]", functionData => eval(functionData))}
  });
  /**
   * Sets the application's default locale
   * @method setDefault
   * @static
   *
   * @param {String} locale  A locale string (ie, "en", "en_US", or "es_MX")
   */
  Translation.setDefault = function(locale) {lacuna_lazy_load("js/libs/lavaca.js[176203:176297]", functionData => eval(functionData))};
  /**
   * Finds the most appropriate translation for a given locale
   * @method forLocale
   * @static
   *
   * @param {String} locale  The locale
   * @return {Lavaca.util.Translation}  The translation
   */
  Translation.forLocale = function(locale) {lacuna_lazy_load("js/libs/lavaca.js[176554:176713]", functionData => eval(functionData))};
  /**
   * Finds the most appropriate translation of a message for the default locale
   * @method get
   * @static
   * @param {String} code  The code under which the message is stored
   * @return {Lavaca.util.Translation}  The translation
   */
  /**
   * Finds the most appropriate translation of a message for the default locale
   * @method get
   * @static
   * @param {String} locale  The locale
   * @param {String} code  The code under which the message is stored
   * @return {Lavaca.util.Translation}  The translation
   */
  Translation.get = function(locale, code) {lacuna_lazy_load("js/libs/lavaca.js[177294:177862]", functionData => eval(functionData))};
  /**
   * Scans the document for all translations and prepares them
   * @method init
   * @static
   * @param {String} locale  The default locale
   */
  /**
   * Scans the document for all translations and prepares them
   * @method init
   * @static
   * @param {String} locale  The default locale
   * @param {jQuery} scope  The element to which to limit the scan
   */
  Translation.init = function(locale, scope) {lacuna_lazy_load("js/libs/lavaca.js[178284:178388]", functionData => eval(functionData))};
  /**
   * Disposes of all translations
   * @method dispose
   * @static
   */
  Translation.dispose = function() {lacuna_lazy_load("js/libs/lavaca.js[178505:178535]", functionData => eval(functionData))};

  return Translation;

});

// This plugin is an experiment for abstracting away the touch and mouse
// events so that developers don't have to worry about which method of input
// the device their document is loaded on supports.
//
// The idea here is to allow the developer to register listeners for the
// basic mouse events, such as mousedown, mousemove, mouseup, and click,
// and the plugin will take care of registering the correct listeners
// behind the scenes to invoke the listener at the fastest possible time
// for that device, while still retaining the order of event firing in
// the traditional mouse environment, should multiple handlers be registered
// on the same element for different events.
//
// The current version exposes the following virtual events to jQuery bind methods:
// "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel"

//>>description: Normalizes touch/mouse events.
//>>label: Virtual Mouse (vmouse) Bindings
//>>group: Core

define('jquery-mobile/jquery.mobile.vmouse', [ "jquery" ], function( jQuery ) {
(function( $, window, document, undefined ) {

var dataPropertyName = "virtualMouseBindings",
	touchTargetPropertyName = "virtualTouchID",
	virtualEventNames = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split( " " ),
	touchEventProps = "clientX clientY pageX pageY screenX screenY".split( " " ),
	mouseHookProps = $.event.mouseHooks ? $.event.mouseHooks.props : [],
	mouseEventProps = $.event.props.concat( mouseHookProps ),
	activeDocHandlers = {},
	resetTimerID = 0,
	startX = 0,
	startY = 0,
	didScroll = false,
	clickBlockList = [],
	blockMouseTriggers = false,
	blockTouchTriggers = false,
	eventCaptureSupported = "addEventListener" in document,
	$document = $( document ),
	nextTouchID = 1,
	lastTouchID = 0, threshold;

$.vmouse = {
	moveDistanceThreshold: 10,
	clickDistanceThreshold: 10,
	resetTimerDuration: 1500
};

function getNativeEvent( event ) {lacuna_lazy_load("js/libs/lavaca.js[180498:180616]", functionData => eval(functionData))}

function createVirtualEvent( event, eventType ) {lacuna_lazy_load("js/libs/lavaca.js[180666:181938]", functionData => eval(functionData))}

function getVirtualBindingFlags( element ) {lacuna_lazy_load("js/libs/lavaca.js[181983:182226]", functionData => eval(functionData))}

function getClosestElementWithVirtualBinding( element, eventType ) {lacuna_lazy_load("js/libs/lavaca.js[182295:182493]", functionData => eval(functionData))}

function enableTouchBindings() {lacuna_lazy_load("js/libs/lavaca.js[182526:182558]", functionData => eval(functionData))}

function disableTouchBindings() {lacuna_lazy_load("js/libs/lavaca.js[182592:182623]", functionData => eval(functionData))}

function enableMouseBindings() {lacuna_lazy_load("js/libs/lavaca.js[182656:182834]", functionData => eval(functionData))}

function disableMouseBindings() {lacuna_lazy_load("js/libs/lavaca.js[182868:182969]", functionData => eval(functionData))}

function startResetTimer() {lacuna_lazy_load("js/libs/lavaca.js[182998:183142]", functionData => eval(functionData))}

function clearResetTimer() {lacuna_lazy_load("js/libs/lavaca.js[183171:183252]", functionData => eval(functionData))}

function triggerVirtualEvent( eventType, event, flags ) {lacuna_lazy_load("js/libs/lavaca.js[183310:183548]", functionData => eval(functionData))}

function mouseEventCallback( event ) {lacuna_lazy_load("js/libs/lavaca.js[183587:184043]", functionData => eval(functionData))}

function handleTouchStart( event ) {lacuna_lazy_load("js/libs/lavaca.js[184080:184671]", functionData => eval(functionData))}

function handleScroll( event ) {lacuna_lazy_load("js/libs/lavaca.js[184704:184902]", functionData => eval(functionData))}

function handleTouchMove( event ) {lacuna_lazy_load("js/libs/lavaca.js[184938:185456]", functionData => eval(functionData))}

function handleTouchEnd( event ) {lacuna_lazy_load("js/libs/lavaca.js[185491:186388]", functionData => eval(functionData))}

function hasVirtualBindings( ele ) {
	var bindings = $.data( ele, dataPropertyName ),
		k;

	if ( bindings ) {
		for ( k in bindings ) {
			if ( bindings[ k ] ) {
				return true;
			}
		}
	}
	return false;
}

function dummyMouseHandler() {lacuna_lazy_load("js/libs/lavaca.js[186629:186631]", functionData => eval(functionData))}

function getSpecialEventObject( eventType ) {
	var realType = eventType.substr( 1 );

	return {
		setup: function( data, namespace ) {
			// If this is the first virtual mouse binding for this element,
			// add a bindings object to its data.

			if ( !hasVirtualBindings( this ) ) {
				$.data( this, dataPropertyName, {} );
			}

			// If setup is called, we know it is the first binding for this
			// eventType, so initialize the count for the eventType to zero.
			var bindings = $.data( this, dataPropertyName );
			bindings[ eventType ] = true;

			// If this is the first virtual mouse event for this type,
			// register a global handler on the document.

			activeDocHandlers[ eventType ] = ( activeDocHandlers[ eventType ] || 0 ) + 1;

			if ( activeDocHandlers[ eventType ] === 1 ) {
				$document.bind( realType, mouseEventCallback );
			}

			// Some browsers, like Opera Mini, won't dispatch mouse/click events
			// for elements unless they actually have handlers registered on them.
			// To get around this, we register dummy handlers on the elements.

			$( this ).bind( realType, dummyMouseHandler );

			// For now, if event capture is not supported, we rely on mouse handlers.
			if ( eventCaptureSupported ) {
				// If this is the first virtual mouse binding for the document,
				// register our touchstart handler on the document.

				activeDocHandlers[ "touchstart" ] = ( activeDocHandlers[ "touchstart" ] || 0) + 1;

				if ( activeDocHandlers[ "touchstart" ] === 1 ) {
					$document.bind( "touchstart", handleTouchStart )
						.bind( "touchend", handleTouchEnd )

						// On touch platforms, touching the screen and then dragging your finger
						// causes the window content to scroll after some distance threshold is
						// exceeded. On these platforms, a scroll prevents a click event from being
						// dispatched, and on some platforms, even the touchend is suppressed. To
						// mimic the suppression of the click event, we need to watch for a scroll
						// event. Unfortunately, some platforms like iOS don't dispatch scroll
						// events until *AFTER* the user lifts their finger (touchend). This means
						// we need to watch both scroll and touchmove events to figure out whether
						// or not a scroll happenens before the touchend event is fired.

						.bind( "touchmove", handleTouchMove )
						.bind( "scroll", handleScroll );
				}
			}
		},

		teardown: function( data, namespace ) {lacuna_lazy_load("js/libs/lavaca.js[189080:190433]", functionData => eval(functionData))}
	};
}

// Expose our custom events to the jQuery bind/unbind mechanism.

for ( var i = 0; i < virtualEventNames.length; i++ ) {
	$.event.special[ virtualEventNames[ i ] ] = getSpecialEventObject( virtualEventNames[ i ] );
}

// Add a capture click handler to block clicks.
// Note that we require event capture support for this so if the device
// doesn't support it, we punt for now and rely solely on mouse events.
if ( eventCaptureSupported ) {
	document.addEventListener( "click", function( e ) {lacuna_lazy_load("js/libs/lavaca.js[190933:193224]", functionData => eval(functionData))}, true);
}
})( jQuery, window, document );
});

//>>description: The mobile namespace on the jQuery object
//>>label: Namespace
//>>group: Core
define('jquery-mobile/jquery.mobile.ns',[ "jquery" ], function( jQuery ) {
(function( $ ) {
	$.mobile = {};
}( jQuery ));
});
//>>description: Touch feature test
//>>label: Touch support test
//>>group: Core

define('jquery-mobile/jquery.mobile.support.touch', [ "jquery", "./jquery.mobile.ns" ], function( jQuery ) {
	(function( $, undefined ) {
		var support = {
			touch: "ontouchend" in document
		};

		$.mobile.support = $.mobile.support || {};
		$.extend( $.support, support );
		$.extend( $.mobile.support, support );
	}( jQuery ));
});

//>>description: Touch events including: touchstart, touchmove, touchend, tap, taphold, swipe, swipeleft, swiperight, scrollstart, scrollstop
//>>label: Touch
//>>group: Events

define('jquery-mobile/events/touch', [ "jquery", "../jquery.mobile.vmouse", "../jquery.mobile.support.touch" ], function( jQuery ) {

(function( $, window, undefined ) {
	var $document = $( document );

	// add new event shortcuts
	$.each( ( "touchstart touchmove touchend " +
		"tap taphold " +
		"swipe swipeleft swiperight " +
		"scrollstart scrollstop" ).split( " " ), function( i, name ) {

		$.fn[ name ] = function( fn ) {lacuna_lazy_load("js/libs/lavaca.js[194520:194586]", functionData => eval(functionData))};

		// jQuery < 1.8
		if ( $.attrFn ) {
			$.attrFn[ name ] = true;
		}
	});

	var supportTouch = $.mobile.support.touch,
		scrollEvent = "touchmove scroll",
		touchStartEvent = supportTouch ? "touchstart" : "mousedown",
		touchStopEvent = supportTouch ? "touchend" : "mouseup",
		touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

	function triggerCustomEvent( obj, eventType, event ) {lacuna_lazy_load("js/libs/lavaca.js[194982:195113]", functionData => eval(functionData))}

	// also handles scrollstop
	$.event.special.scrollstart = {

		enabled: true,

		setup: function() {lacuna_lazy_load("js/libs/lavaca.js[195215:195822]", functionData => eval(functionData))}
	};

	// also handles taphold
	$.event.special.tap = {
		tapholdThreshold: 750,

		setup: function() {
			var thisObject = this,
				$this = $( thisObject );

			$this.bind( "vmousedown", function( event ) {lacuna_lazy_load("js/libs/lavaca.js[196029:197058]", functionData => eval(functionData))});
		}
	};

	// also handles swipeleft, swiperight
	$.event.special.swipe = {
		scrollSupressionThreshold: 30, // More than this horizontal displacement, and we will suppress scrolling.

		durationThreshold: 1000, // More time than this, and it isn't a swipe.

		horizontalDistanceThreshold: 30,  // Swipe horizontal displacement must be more than this.

		verticalDistanceThreshold: 75,  // Swipe vertical displacement must be less than this.

		start: function( event ) {lacuna_lazy_load("js/libs/lavaca.js[197530:197758]", functionData => eval(functionData))},

		stop: function( event ) {lacuna_lazy_load("js/libs/lavaca.js[197787:197982]", functionData => eval(functionData))},

		handleSwipe: function( start, stop ) {lacuna_lazy_load("js/libs/lavaca.js[198024:198444]", functionData => eval(functionData))},

		setup: function() {lacuna_lazy_load("js/libs/lavaca.js[198467:199238]", functionData => eval(functionData))}
	};
	$.each({
		scrollstop: "scrollstart",
		taphold: "tap",
		swipeleft: "swipe",
		swiperight: "swipe"
	}, function( event, sourceEvent ) {

		$.event.special[ event ] = {
			setup: function() {lacuna_lazy_load("js/libs/lavaca.js[199434:199483]", functionData => eval(functionData))}
		};
	});

})( jQuery, this );
});

//>>description: Feature test for orientation
//>>label: Orientation support test
//>>group: Core

define('jquery-mobile/jquery.mobile.support.orientation', [ "jquery" ], function( jQuery ) {
	(function( $, undefined ) {
		$.extend( $.support, {
			orientation: "orientation" in window && "onorientationchange" in window
		});
	}( jQuery ));
});

//>>description: Fires a resize event with a slight delay to prevent excessive callback invocation
//>>label: Throttled Resize
//>>group: Events

define('jquery-mobile/events/throttledresize', [ "jquery" ], function( jQuery ) {

	// throttled resize event
	(function( $ ) {
		$.event.special.throttledresize = {
			setup: function() {lacuna_lazy_load("js/libs/lavaca.js[200200:200247]", functionData => eval(functionData))},
			teardown: function() {lacuna_lazy_load("js/libs/lavaca.js[200273:200322]", functionData => eval(functionData))}
		};

		var throttle = 250,
			handler = function() {lacuna_lazy_load("js/libs/lavaca.js[200375:200732]", functionData => eval(functionData))},
			lastCall = 0,
			heldCall,
			curr,
			diff;
	})( jQuery );
});
//>>description: Provides a wrapper around the inconsistent browser implementations of orientationchange
//>>label: Orientation Change
//>>group: Events

define('jquery-mobile/events/orientationchange', [ "jquery", "../jquery.mobile.support.orientation", "./throttledresize" ], function( jQuery ) {

(function( $, window ) {
	var win = $( window ),
		event_name = "orientationchange",
		special_event,
		get_orientation,
		last_orientation,
		initial_orientation_is_landscape,
		initial_orientation_is_default,
		portrait_map = { "0": true, "180": true };

	// It seems that some device/browser vendors use window.orientation values 0 and 180 to
	// denote the "default" orientation. For iOS devices, and most other smart-phones tested,
	// the default orientation is always "portrait", but in some Android and RIM based tablets,
	// the default orientation is "landscape". The following code attempts to use the window
	// dimensions to figure out what the current orientation is, and then makes adjustments
	// to the to the portrait_map if necessary, so that we can properly decode the
	// window.orientation value whenever get_orientation() is called.
	//
	// Note that we used to use a media query to figure out what the orientation the browser
	// thinks it is in:
	//
	//     initial_orientation_is_landscape = $.mobile.media("all and (orientation: landscape)");
	//
	// but there was an iPhone/iPod Touch bug beginning with iOS 4.2, up through iOS 5.1,
	// where the browser *ALWAYS* applied the landscape media query. This bug does not
	// happen on iPad.

	if ( $.support.orientation ) {

		// Check the window width and height to figure out what the current orientation
		// of the device is at this moment. Note that we've initialized the portrait map
		// values to 0 and 180, *AND* we purposely check for landscape so that if we guess
		// wrong, , we default to the assumption that portrait is the default orientation.
		// We use a threshold check below because on some platforms like iOS, the iPhone
		// form-factor can report a larger width than height if the user turns on the
		// developer console. The actual threshold value is somewhat arbitrary, we just
		// need to make sure it is large enough to exclude the developer console case.

		var ww = window.innerWidth || win.width(),
			wh = window.innerHeight || win.height(),
			landscape_threshold = 50;

		initial_orientation_is_landscape = ww > wh && ( ww - wh ) > landscape_threshold;


		// Now check to see if the current window.orientation is 0 or 180.
		initial_orientation_is_default = portrait_map[ window.orientation ];

		// If the initial orientation is landscape, but window.orientation reports 0 or 180, *OR*
		// if the initial orientation is portrait, but window.orientation reports 90 or -90, we
		// need to flip our portrait_map values because landscape is the default orientation for
		// this device/browser.
		if ( ( initial_orientation_is_landscape && initial_orientation_is_default ) || ( !initial_orientation_is_landscape && !initial_orientation_is_default ) ) {
			portrait_map = { "-90": true, "90": true };
		}
	}

	$.event.special.orientationchange = $.extend( {}, $.event.special.orientationchange, {
		setup: function() {lacuna_lazy_load("js/libs/lavaca.js[204027:204532]", functionData => eval(functionData))},
		teardown: function() {lacuna_lazy_load("js/libs/lavaca.js[204557:204929]", functionData => eval(functionData))},
		add: function( handleObj ) {lacuna_lazy_load("js/libs/lavaca.js[204960:205332]", functionData => eval(functionData))}
	});

	// If the event is not supported natively, this handler will be bound to
	// the window resize event to simulate the orientationchange event.
	function handler() {lacuna_lazy_load("js/libs/lavaca.js[205502:205768]", functionData => eval(functionData))}

	// Get the current page orientation. This method is exposed publicly, should it
	// be needed, as jQuery.event.special.orientationchange.orientation()
	$.event.special.orientationchange.orientation = get_orientation = function() {lacuna_lazy_load("js/libs/lavaca.js[206000:206832]", functionData => eval(functionData))};

	$.fn[ event_name ] = function( fn ) {lacuna_lazy_load("js/libs/lavaca.js[206872:206948]", functionData => eval(functionData))};

	// jQuery < 1.8
	if ( $.attrFn ) {
		$.attrFn[ event_name ] = true;
	}

}( jQuery, this ));

});

define('lavaca/mvc/Application',['require','$','lavaca/net/History','lavaca/env/Device','lavaca/events/EventDispatcher','lavaca/mvc/Router','lavaca/mvc/ViewManager','lavaca/net/Connectivity','lavaca/ui/Template','lavaca/util/Config','lavaca/util/Promise','lavaca/env/ChildBrowser','lavaca/util/Translation','jquery-mobile/events/touch','jquery-mobile/events/orientationchange'],function(require) {

  var $ = require('$'),
    History = require('lavaca/net/History'),
    Device = require('lavaca/env/Device'),
    EventDispatcher = require('lavaca/events/EventDispatcher'),
    router = require('lavaca/mvc/Router'),
    viewManager = require('lavaca/mvc/ViewManager'),
    Connectivity = require('lavaca/net/Connectivity'),
    Template = require('lavaca/ui/Template'),
    Config = require('lavaca/util/Config'),
    Promise = require('lavaca/util/Promise'),
    ChildBrowser = require('lavaca/env/ChildBrowser'),
    Translation = require('lavaca/util/Translation');
    require('jquery-mobile/events/touch');
    require('jquery-mobile/events/orientationchange');

  function _stopEvent(e) {lacuna_lazy_load("js/libs/lavaca.js[208145:208199]", functionData => eval(functionData))}

  function _matchHashRoute(hash) {
    var matches = hash.match(/^(?:#)(\/.*)#?@?/);
    if (matches instanceof Array && matches[1]) {
      return matches[1].replace(/#.*/, '');
    }
    return null;
  }

  /**
   * Base application type
   * @class lavaca.mvc.Application
   * @extends lavaca.events.EventDispatcher
   *
   */
   /**
   * Creates an application
   * @constructor
   * @param {Function} [callback]  A callback to execute when the application is initialized but not yet ready
   */
  var Application = EventDispatcher.extend(function(callback) {
    if (callback) {
      this._callback = callback.bind(this);
    }
    Device.init(function() {
      this.beforeInit(Config)
        .then(this.init.bind(this));
    }.bind(this));
  }, {
    /**
     * The default URL that the app will navigate to
     * @property initRoute
     * @default '/'
     *
     * @type String
     */

    initRoute: '/',
    /**
     * The default state object to supply the initial route
     * @property initState
     * @default null
     *
     * @type {Object}
     */
    initState: null,
    /**
     * The default params object to supply the initial route
     * @property initParams
     * @default null
     *
     * @type {Object}
     */

    initParams: null,
    /**
     * The selector used to identify the DOM element that will contain views
     * @property viewRootSelector
     * @default #view-root
     *
     * @type {String}
     */

    viewRootSelector: '#view-root',
    /**
     * Handler for when the user attempts to navigate to an invalid route
     * @method onInvalidRoute
     *
     * @param {Object} err  The routing error
     */
    onInvalidRoute: function(err) {lacuna_lazy_load("js/libs/lavaca.js[209900:210166]", functionData => eval(functionData))},
    /**
     * Handler for when the user taps on a <A> element
     * @method onTapLink
     *
     * @param {Event} e  The event object
     */
    onTapLink: function(e) {lacuna_lazy_load("js/libs/lavaca.js[210340:211110]", functionData => eval(functionData))},
    /**
     * Makes an AJAX request if the user is online. If the user is offline, the returned
     * promise will be rejected with the string argument "offline". (Alias for [[Lavaca.net.Connectivity]].ajax)
     * @method ajax
     *
     * @param {Object} opts  jQuery-style AJAX options
     * @return {Lavaca.util.Promise}  A promise
     */
    ajax: function() {lacuna_lazy_load("js/libs/lavaca.js[211481:211551]", functionData => eval(functionData))},
    /**
     * Initializes the application
     * @method init
     *
     * @param {Object} args  Data of any type from a resolved promise returned by Application.beforeInit(). Defaults to null.
     *
     * @return {Lavaca.util.Promise}  A promise that resolves when the application is ready for use
     */
    init: function(args) {
      var promise = new Promise(this),
          _cbPromise,
          lastly;
      Template.init();
      /**
       * View manager used to transition between UI states
       * @property viewManager
       * @default null
       *
       * @type {Lavaca.mvc.ViewManager}
       */
      this.viewManager = viewManager.setEl(this.viewRootSelector);
      /**
       * Router used to manage application traffic and URLs
       * @property router
       * @default null
       *
       * @type {Lavaca.mvc.Router}
       */
      this.router = router.setViewManager(this.viewManager);


      lastly = function() {
        this.router.startHistory();
        if (!this.router.hasNavigated) {
          promise.when(
            this.router.exec(this.initialHashRoute || this.initRoute, this.initState, this.initParams)
          );
          if (this.initState) {
            History.replace(this.initState.state, this.initState.title, this.initState.url);
          }
        } else {
          promise.resolve();
        }
      }.bind(this);

      $(document.body)
        .on('tap', 'a', this.onTapLink.bind(this))
        .on('tap', '.ui-blocker', _stopEvent);

      if (this._callback) {
        _cbPromise = this._callback(args);
        _cbPromise instanceof Promise ? _cbPromise.then(lastly, promise.rejector()) : lastly();
      } else {
        lastly();
      }
      return promise.then(function() {
        this.trigger('ready');
      });
    },

    /**
     * Gets initial route based on query string returned by server 302 redirect
     * @property initialStandardRoute
     * @default null
     *
     * @type {String}
     */

    initialHashRoute: (function(hash) {
      return _matchHashRoute(hash);
    })(window.location.hash),
    /**
     * Handles asynchronous requests that need to happen before Application.init() is called in the constructor
     * @method {String} beforeInit
     *
     * @param {Lavaca.util.Config} Config cache that's been initialized
     *
     * @return {Lavaca.util.Promise}  A promise
     */
    beforeInit: function(Config) {
      var promise = new Promise();
      return promise.resolve(null);
    }
  });

  return Application;

});

define('lavaca/mvc/Collection',['require','lavaca/mvc/Model','lavaca/net/Connectivity','lavaca/util/ArrayUtils','lavaca/util/Promise','mout/lang/deepClone','mout/object/merge'],function(require) {

  var Model = require('lavaca/mvc/Model'),
      Connectivity = require('lavaca/net/Connectivity'),
      ArrayUtils = require('lavaca/util/ArrayUtils'),
      Promise = require('lavaca/util/Promise'),
      clone = require('mout/lang/deepClone'),
      merge = require('mout/object/merge');

  var UNDEFINED;

  function _triggerItemEvent(collection, event, previousIndex, index, model) {lacuna_lazy_load("js/libs/lavaca.js[214676:214796]", functionData => eval(functionData))}

  function _getComparator(attr, descending) {lacuna_lazy_load("js/libs/lavaca.js[214842:215145]", functionData => eval(functionData))}

  // Virtual type
  /**
   * Event type used when a model in a collection has an event
   * @class lavaca.mvc.ItemEvent
   * @extends lavaca.events.EventDispatcher

   *
   * @property {Lavaca.mvc.Collection} target
   * @default null
   * The collection that contains (or contained) the model that caused the event
   *
   * @property {Lavaca.mvc.Model} model
   * @default null
   * The model that caused the event
   *
   * @property {Number} index
   * @default null
   * The index of the event-causing model in the collection
   *
   * @property {Number} previousIndex
   * @default null
   * The index of the event-causing model before the event
   */

  /**
   * @class lavaca.mvc.Collection
   * @super Model
   * Basic model collection type
   *
   * @event change
   * @event invalid
   * @event fetchSuccess
   * @event fetchError
   * @event saveSuccess
   * @event saveError
   * @event changeItem
   * @event invalidItem
   * @event saveSuccessItem
   * @event saveErrorItem
   *
   * @constructor
   * @param {Array} models  A list of models to add to the collection
   * @param {Object} [map]  A parameter hash to apply to the collection
   */
  var Collection = Model.extend(function(models, map) {
    Model.call(this, map);
    this.models = [];
    this.changedOrder = false;
    this.addedItems = [];
    this.removedItems = [];
    this.changedItems = [];
    if (models) {
      this.suppressEvents = true;
      this.add.apply(this, models);
      this.suppressEvents = false;
    }
  }, {
    /**
     * The type of model object to use for items in this collection
     * @property TModel
     * @default [[Lavaca.mvc.Model]]
     *
     * @type Function
     */

    TModel: Model,
    /**
     * The name of the property containing the collection's items when using toObject()
     * @property itemsProperty
     * @default 'items'
     *
     * @type String
     */
   itemsProperty: 'items',
    /**
     * Whether to allow duplicated IDs in collection items. If false, a later added item will overwrite the one with same ID.
     * @property allowDuplicatedIds
     * @default false
     *
     * @type Boolean
     */
    allowDuplicatedIds: false,
    /**
     * Removes and disposes of all models in the collection
     * @method clear
     *
     */
//  @event removeItem
    clear: function() {lacuna_lazy_load("js/libs/lavaca.js[217475:217560]", functionData => eval(functionData))},
    /**
     * clears only the models in the collection
     * @method clearModels
     *
     */
    clearModels: function() {lacuna_lazy_load("js/libs/lavaca.js[217688:217985]", functionData => eval(functionData))},
    /**
     * Readies data to be an item in the collection
     * @method prepare
     *
     * @param {Object} data  The model or object to be added
     * @return {Lavaca.mvc.Model}  The model derived from the data
     */
    prepare: function(data) {lacuna_lazy_load("js/libs/lavaca.js[218241:218819]", functionData => eval(functionData))},
    /**
     * Determines whether or not an attribute can be assigned
     * @method canSet
     *
     * @param {String} attribute  The name of the attribute
     * @return {Boolean}  True if you can assign to the attribute
     */
    canSet: function(attribute) {
      return attribute !== this.itemsProperty;
    },
    /**
     * Inserts one or more items into the collection at the specified index
     * @method insert
     *
     * @param {Number} insertIndex  index at which items will be inserted
     * @param {Array} newItems  Array of objects or Models to insert
     * @return {Boolean}  false if no items were able to be added, true otherwise.
     */
    /**
     * Inserts one or more items into the collection at the specified index
     * @method insert
     * @param {Number} insertIndex  index at which items will be inserted
     * @params {Object} items  One or more objects or Models to insert
     * @return {Boolean}  false if no items were able to be added, true otherwise.
     */
//@event addItem

    insert: function(insertIndex, item /*, item1, item2, item3...*/) {lacuna_lazy_load("js/libs/lavaca.js[219918:221255]", functionData => eval(functionData))},
    /**
     * Adds one or more items to the collection. Items with IDs matching an item already in this collection will replace instead of add.
     * @method add
     *
     * @params {Object} item  One or more items to add to the collection
     * @return {Boolean}  True if an item was added, false otherwise
     */
    /**
     * Adds one or more items to the collection. Items with IDs matching an item already in this collection will replace instead of add.
     * @method add
     *
     * @params {Array} items  An array of items to add to the collection
     * @return {Boolean}  True if an item was added, false otherwise
     */
// * @event addItem
    add: function(/* item1, item2, itemN */) {lacuna_lazy_load("js/libs/lavaca.js[221964:222186]", functionData => eval(functionData))},
    /**
     * Moves an item
     * @method moveTo
     *
     * @param {Lavaca.mvc.Model} model  The model to move
     * @param {Number} newIndex  The new index at which the model should be placed
     *
     */
    /**
     * Moves an item
     * @method moveTo
     *
     * @param {Number} oldIndex  The current index of the model
     * @param {Number} newIndex  The new index at which the model should be placed
     */
// * @event moveItem
    moveTo: function(oldIndex, newIndex) {lacuna_lazy_load("js/libs/lavaca.js[222677:223135]", functionData => eval(functionData))},
    /**
     * Removes an item from the collection
     * @method remove
     * @params {Number} index  The index of the model to remove
     * @return {Boolean}  True if an item was removed, false otherwise
     *
     */
    /**
     * Removes an item from the collection
     * @method remove
     * @params {Lavaca.mvc.Model} item  The models to remove from the collection
     * @return {Boolean}  True if an item was removed, false otherwise
     *
     */
    /**
     * Removes an item from the collection
     * @method remove
     * @param {Object} item  One object containing attributes matching any models to remove
     * @return {Boolean}  True if at least one item was removed, false otherwise
     *
     */
    /**
     * Removes an item from the collection
     * @method remove
     * @param {Object} item  N number of object arguments containing attributes matching any models to remove
     * @return {Array}  An array of booleans indicating if at least one item was removed by matching each argument
     *
     */
    /**
     * Removes an item from the collection
     * @method remove
     * @param {Array} items  An array of objects containing attributes matching any models to remove
     * @return {Array}  An array of booleans indicating if at least one item was removed by matching each element in the array
     */
    /**
     * Removes an item from the collection
     * @method remove
     * @param {Function} test  A function to check each model in the collection in the form
     *     test(index, model). If the test function returns true, the model will be removed
     * @return {Boolean}  True if at least one item was removed, false otherwise
     */
//* @event removeItem

    remove: function(item /*, item1, item2, item3...*/) {lacuna_lazy_load("js/libs/lavaca.js[224908:226659]", functionData => eval(functionData))},
    /**
     * Compiles a list of items matching an attribute hash
     * @method filter
     *
     * @param {Object} The attributes to test against each model
     * @return {Array}  A list of this collection's models that matched the attributes
     */
    /**
     * Compiles a list of items matching an attribute hash
     * @method filter
     *
     * @param {Object} attributes  The attributes to test against each model
     * @param {Number} maxResults  The maximum number of results to return
     * @return {Array}  A list of this collection's models that matched the attributes
     */
    /**
     * Compiles a list of items matching an attribute hash
     * @method filter
     *
     * @param {Function} test  A function to check each model in the collection in the form
     *     test(index, model). If the test function returns true, the model will be included
     *     in the result
     * @return {Array}  A list of this collection's models that passed the test
     */

    /**
     * Compiles a list of items matching an attribute hash
     * @method filter
     *
     * @param {Function} test  A function to check each model in the collection in the form
     *     test(index, model). If the test function returns true, the model will be included
     *     in the result
     * @param {Number} maxResults  The maximum number of results to return
     * @return {Array}  A list of this collection's models that passed the test
     */
    filter: function(test, maxResults) {
      maxResults = maxResults === UNDEFINED ? Number.MAX_VALUE : maxResults;
      var result = [],
          i = -1,
          item,
          attrs;
      if (typeof test !== 'function') {
        attrs = test;
        test = function(index, item) {lacuna_lazy_load("js/libs/lavaca.js[228415:228580]", functionData => eval(functionData))};
      }
      while (!!(item = this.models[++i])) {
        if (test(i, item)) {
          result.push(item);
          if (--maxResults < 1) {
            break;
          }
        }
      }
      return result;
    },
    /**
     * Finds the first item matching an attribute hash
     * @method first
     *
     * @param {Object} attributes  The attributes to test against each model
     * @return {Lavaca.mvc.Model}  The first model that matched the attributes (or null)
     */
     /**
     * Finds the first item that passed a functional test
     * @method first
     *
     * @param {Function} test  A function to check each model in the collection in the form
     *     test(index, model). If the test function returns true, the model will be included
     *     as the result
     * @return {Lavaca.mvc.Model}  The first model that passed the test (or null)
     */
    first: function(test) {lacuna_lazy_load("js/libs/lavaca.js[229489:229542]", functionData => eval(functionData))},
    /**
     * Finds the index of the first item matching an attribute hash
     * @method indexOf
     *
     * @sig
     * Finds the index of the first item matching an attribute hash
     * @param {Object} attributes  The attributes to test against each model
     * @return {Number}  Index of the matching model, or -1 if no match is found
     */
    /**
     * Finds the index of the first item that passed a functional test
     * @method indexOf
     * @param {Function} test  A function to check each model in the collection in the form
     *     test(index, model). If the test function returns true, the model will be included
     *     as the result
     * @return {Number}  Index of the matching model, or -1 if no match is found
     */
    indexOf: function(test) {lacuna_lazy_load("js/libs/lavaca.js[230325:230434]", functionData => eval(functionData))},
    /**
     * Gets the item at a specific index
     * @method itemAt
     *
     * @param {Number} index  The index of the item
     * @return {Lavaca.mvc.Model}  The model at that index
     */
    itemAt: function(index) {
      return this.models[index];
    },
    /**
     * Gets the number of items in the collection
     * @method count
     *
     * @return {Number}  The number of items in the collection
     */
    count: function() {
      return this.models.length;
    },
    /**
     * Executes a callback for each model in the collection. To stop iteration immediately,
     * return false from the callback.
     * @method each
     *
     * @param {Function} callback  A function to execute for each item, callback(index, model)
     */
    /**
     * Executes a callback for each model in the collection. To stop iteration immediately,
     * return false from the callback.
     * @method each
     * @param {Function} callback  A function to execute for each item, callback(index, model)
     * @param {Object} thisp  The context of the callback
     */
    each: function(cb, thisp) {
      var i = -1,
          returned,
          item;
      while (!!(item = this.itemAt(++i))) {
        returned = cb.call(thisp || this, i, item);
        if (returned === false) {
          break;
        }
      }
    },
    /**
     * Sorts the models in the collection using the specified attribute, in ascending order.
     * @method sort
     *
     * @param {String} attribute  Attribute to sort by
     * @return {Lavaca.mvc.Collection}  The updated collection (for chaining)
     */
    /**
     * Sorts the models in the collection using the specified attribute, in either ascending or descending order.
     * @method sort
     *
     * @param {String} attribute  Attribute to sort by
     * @param {Boolean}  descending  Use descending sort. Defaults to false
     * @return {Lavaca.mvc.Collection}  The updated collection (for chaining)
     *
     */
    /**
     * Sorts the models in the collection according to the specified compare function.
     * @method sort
     *
     * @param {Function} compareFunction  A function that compares two models. It should work
     *     in the same manner as the default Array.sort method in javascript.  i.e. the function
     *     should have a signature of function(modelA, modelB) and should return a negative integer
     *     if modelA should come before modelB, a positive integer if modelB should come before modelA
     *     and integer 0 if modelA and modelB are equivalent.
     * @return {Lavaca.mvc.Collection}  The updated collection (for chaining)
     */
//* @event moveItem

    sort: function(attribute, descending) {lacuna_lazy_load("js/libs/lavaca.js[233140:233761]", functionData => eval(functionData))},
    /**
     * Reverses the order of the models in the collection
     * @method reverse
     *
     * @return {Lavaca.mvc.Collection}  The updated collection (for chaining)
     */
//* @event moveItem
    reverse: function() {lacuna_lazy_load("js/libs/lavaca.js[233989:234489]", functionData => eval(functionData))},
    /**
     * Handler invoked when an item in the collection has an event. Triggers an [[Lavaca.mvc.ItemEvent]].
     * @method onItemEvent
     *
     * @param {Lavaca.mvc.ModelEvent} e  The item event
     */
    onItemEvent: function(e) {lacuna_lazy_load("js/libs/lavaca.js[234732:235183]", functionData => eval(functionData))},
    /**
     * Processes the data received from a fetch request
     * @method onFetchSuccess
     *
     * @param {Object} response  The response data
     */
    onFetchSuccess: function(response) {lacuna_lazy_load("js/libs/lavaca.js[235384:235901]", functionData => eval(functionData))},
    /**
     * Saves the model to the server via POST
     * @method saveToServer
     *
     * @param {String} url  The URL to which to post the data
     * @return {Lavaca.util.Promise}  A promise
     */
    saveToServer: function(url) {lacuna_lazy_load("js/libs/lavaca.js[236142:236639]", functionData => eval(functionData))},
    /**
     * Converts this model to a key-value hash
     * @method toObject
     *
     * @param {Boolean} idOnly  When true, only include item IDs for pre-existing items
     * @return {Object}  The key-value hash
     */
    toObject: function(idOnly) {
      var obj = Model.prototype.toObject.apply(this, arguments),
          prop = this.itemsProperty,
          items = obj[prop] = [],
          i = -1,
          item;
      while (!!(item = this.models[++i])) {
        items[obj[prop].length] = idOnly && !item.isNew() ? item.id() : item.toObject();
      }
      return obj;
    },
    /**
    * Filters the raw response from onFetchSuccess() down to a custom object. (Meant to be overriden)
    * @method responseFilter
    *
    * @param {Object} response  The raw response passed in onFetchSuccess()
    * @return {Object}  An object or array to be applied to this collection instance
    */
    responseFilter: function(response) {lacuna_lazy_load("js/libs/lavaca.js[237588:237618]", functionData => eval(functionData))}
  });

  return Collection;

});

define('lavaca/util/StringUtils',['require'],function(require) {

  var _htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;'
  };

  function _noop(s) {lacuna_lazy_load("js/libs/lavaca.js[237857:237876]", functionData => eval(functionData))}

  /**
   * Static utility type for working with strings
   * @class lavaca.util.StringUtils
   */
  var StringUtils = {};

  /**
   * Substitutes arguments into a string
   * @method format
   * @static
   * @param {String} s  The format string. Substitutions should be in the form {0} to sub in
   *   the first arg, {1} for the second, and so on
   * @params {Object} arg  Arguments to be substituted in to the string
   * @return {String}  The format string with the arguments substituted into it
   */
  /**
   * Substitutes arguments into a string
   * @method format
   * @static
   * @param {String} s  The format string. Substitutions should be in the form {0} to sub in
   *   the first arg, {1} for the second, and so on
   * @param {Array} args  Arguments to be substituted in to the string
   * @return {String}  The format string with the arguments substituted into it
   */
  /**
   * Substitutes arguments into a string
   * @method format
   * @static
   * @param {String} s  The format string. Substitutions should be in the form {0} to sub in
   *   the first arg, {1} for the second, and so on
   * @param {Array} args  Arguments to be substituted in to the string
   * @param {Function} fn  A function to call on each argument, the result of which is substituted into the string
   * @return {String}  The format string with the arguments substituted into it
   */
  StringUtils.format = function(s /*[, arg0, arg1, argN]*/) {lacuna_lazy_load("js/libs/lavaca.js[239323:239671]", functionData => eval(functionData))};

  /**
   * Escapes a string for inclusion in HTML
   * @method escapeHTML
   * @static
   *
   * @param {String} s  The string
   * @return {String}  The escaped string
   */
  StringUtils.escapeHTML = function(s) {lacuna_lazy_load("js/libs/lavaca.js[239888:240007]", functionData => eval(functionData))};

  return StringUtils;

});
define('lavaca/mvc/Controller',['require','lavaca/net/Connectivity','lavaca/net/History','lavaca/util/Disposable','lavaca/util/Promise','lavaca/util/StringUtils','lavaca/util/Translation'],function(require) {

  var Connectivity = require('lavaca/net/Connectivity'),
      History = require('lavaca/net/History'),
      Disposable = require('lavaca/util/Disposable'),
      Promise = require('lavaca/util/Promise'),
      StringUtils = require('lavaca/util/StringUtils'),
      Translation = require('lavaca/util/Translation');

  /**
   * Base type for controllers
   * @class lavaca.mvc.Controller
   * @extends lavaca.util.Disposable
   * @constructor
   * @param {Lavaca.mvc.Controller} other  Another controller from which to take context information
   * @param {Lavaca.mvc.Router} [router]  The application's router
   * @param {Lavaca.mvc.ViewManager} [viewManager]  The application's view manager
   */
  var Controller = Disposable.extend(function(router, viewManager) {
    if (router instanceof Controller) {
      this.router = router.router;
      this.viewManager = router.viewManager;
    } else {
      this.router = router;
      this.viewManager = viewManager;
    }
  }, {
    /**
     * The application's router
     * @property {Lavaca.mvc.Router} router
     * @default null
     */
    router: null,
    /**
     * The application's view manager
     * @property {Lavaca.mvc.ViewManager} viewManager
     * @default null
     */
    viewManager: null,
    /**
     * Executes an action on this controller
     * @method exec
     *
     * @param {String} action  The name of the controller method to call
     * @param {Object} params  Key-value arguments to pass to the action
     * @return {Lavaca.util.Promise}  A promise
     */
     /**
     * Executes an action on this controller
     * @method exec
     * @param {String} action  The name of the controller method to call
     * @param {Object} params  Key-value arguments to pass to the action
     * @param {Object} state  A history record object
     * @return {Lavaca.util.Promise}  A promise
     */
    exec: function(action, params, state) {
      this.params = params;
      this.state = state;
      var promise = new Promise(this),
          model,
          result;
      if (state) {
        model = state.state;
        promise.success(function() {lacuna_lazy_load("js/libs/lavaca.js[242380:242431]", functionData => eval(functionData))});
      }
      result = this[action](params, model);
      if (result instanceof Promise) {
        promise.when(result);
      } else {
        promise.resolve();
      }
      return promise;
    },
    /**
     * Loads a view
     * @method view
     *
     * @param {String} cacheKey  The key under which to cache the view
     * @param {Function} TView  The type of view to load (should derive from [[Lavaca.mvc.View]])
     * @param {Object} model  The data object to pass to the view
     * @param {Number} layer  The integer indicating what UI layer the view sits on
     * @return {Lavaca.util.Promise}  A promise
     */
    view: function(cacheKey, TView, model, layer) {
      return Promise.when(this, this.viewManager.load(cacheKey, TView, model, layer));
    },
    /**
     * Adds a state to the browser history
     * @method history
     *
     * @param {Object} state  A data object associated with the page state
     * @param {String} title  The title of the page state
     * @param {String} url  The URL of the page state
     * @param {Boolean} useReplace  The bool to decide if to remove previous history
     */
    history: function(state, title, url, useReplace) {
      var needsHistory = !this.state;
      return function() {
        if (needsHistory) {
          History[useReplace ? 'replace' : 'push'](state, title, url);
        }
      };
    },
    /**
     * Convenience method for formatting URLs
     * @method url
     *
     * @param {String} str  The URL string
     * @param {Array} args  Format arguments to insert into the URL
     * @return {String}  The formatted URL
     */
    url: function(str, args) {lacuna_lazy_load("js/libs/lavaca.js[244086:244157]", functionData => eval(functionData))},
    /**
     * Directs the user to another route
     * @method redirect
     *
     * @param {String} str  The URL string
     * @return {Lavaca.util.Promise}  A promise
     *
     */
    /**
     * Directs the user to another route
     * @method redirect
     * @param {String} str  The URL string
     * @param {Array} args  Format arguments to insert into the URL
     * @return {Lavaca.util.Promise}  A promise
     */
    redirect: function(str, args) {lacuna_lazy_load("js/libs/lavaca.js[244619:244693]", functionData => eval(functionData))},
    /**
     * Readies the controller for garbage collection
     * @method dispose
     */
    dispose: function() {
      // Do not dispose of view manager or router
      this.router
        = this.viewManager
        = null;
      Disposable.prototype.dispose.apply(this, arguments);
    }
  });

  return Controller;

});

define('lavaca/mvc/Model',['require','lavaca/events/EventDispatcher','lavaca/net/Connectivity','lavaca/util/ArrayUtils','lavaca/util/Cache','lavaca/util/Promise','mout/lang/deepClone','mout/object/merge','lavaca/util/Config'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[245267:265293]", functionData => eval(functionData))});

define('lavaca/mvc/PageView',['require','$','lavaca/mvc/Model','lavaca/mvc/View','lavaca/ui/Template','lavaca/util/Promise','lavaca/util/delay'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[265460:270493]", functionData => eval(functionData))});

define('lavaca/mvc/Route',['require','lavaca/util/Disposable','lavaca/util/delay','mout/lang/deepClone','mout/object/merge'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[270640:277281]", functionData => eval(functionData))});

define('lavaca/mvc/Router',['require','./Route','lavaca/net/History','lavaca/util/Disposable','lavaca/util/Promise'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[277420:283056]", functionData => eval(functionData))});

define('lavaca/mvc/View',['require','$','lavaca/events/EventDispatcher','lavaca/mvc/Model','lavaca/ui/Template','lavaca/util/Cache','lavaca/util/Promise','lavaca/util/log','lavaca/util/uuid'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[283270:306735]", functionData => eval(functionData))});

define('lavaca/mvc/ViewManager',['require','$','lavaca/mvc/PageView','lavaca/util/ArrayUtils','lavaca/util/Cache','lavaca/util/Disposable','lavaca/util/Promise','lavaca/util/delay','mout/object/merge','lavaca/net/History'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[306980:315234]", functionData => eval(functionData))});

define('lavaca/net/Connectivity',['require','$','lavaca/util/Promise','lavaca/util/resolve'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[315349:317884]", functionData => eval(functionData))});

define('lavaca/net/History',['require','lavaca/events/EventDispatcher','lavaca/util/uuid'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[317997:326926]", functionData => eval(functionData))});

define('lavaca/storage/Store',['require','lavaca/util/Disposable'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[327015:328307]", functionData => eval(functionData))});

/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/document.cookie
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path])
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/
define('docCookies',[],function() {lacuna_lazy_load("js/libs/lavaca.js[328904:330770]", functionData => eval(functionData))});
define('lavaca/storage/LocalStore',['require','./Store','docCookies','lavaca/util/ArrayUtils'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[330886:333622]", functionData => eval(functionData))});

define('lavaca/ui/DustTemplate',['require','dust','lavaca/ui/Template','lavaca/util/Config','lavaca/util/Promise','lavaca/util/StringUtils','lavaca/util/Translation','dust-helpers'],function(require) {

  var dust = require('dust'),
      Template = require('lavaca/ui/Template'),
      Config = require('lavaca/util/Config'),
      Promise = require('lavaca/util/Promise'),
      StringUtils = require('lavaca/util/StringUtils'),
      Translation = require('lavaca/util/Translation');
  require('dust-helpers');

  /**
   * Base type for templates that use the dust engine
   * @class lavaca.ui.DustTemplate
   * @extends lavaca.ui.Template
   *
   * @constructor
   * @param {String} name  The unique name of the template
   * @param {String} src  A URL from which to load the template
   * @param {String} code  The raw string code of the template's body
   */
  var DustTemplate = Template.extend(function() {
    Template.apply(this, arguments);
    var helper = this.prepareHelpers(),
        n;
    if(!dust.helpers) {
      dust.helpers = [];
    }
    for (n in helper) {
      dust.helpers[n] = helper[n];
    }
  }, {
    /**
     * Gets the basis for the template helper object
     * @method prepareHelpers
     *
     * @return {Object}  A map of helper function names to functions
     */
    prepareHelpers: function() {
      return {
        msg: this.helperMsg,
        include: this.helperInclude,
        config: this.helperConfig
      };
    },
    /**
     * Helper function, exposed in dust templates, that uses
     *   [Lavaca.util.Translation] to get localized strings.
     * Accessed as:
     *
     * <dl>
     *
     * <dt>{@msg key="code"/}</dt>
     *   <dd>code&mdash;The key under which the message is stored</dd>
     *
     * <dt>{@msg key="code"}default{/msg}</dt>
     *   <dd>code&mdash;The key under which the message is stored</dd>
     *   <dd>default&mdash;The default markup to display if no translation
     *       is found</dd>
     *
     *
     * <dt>{@msg key="code" locale="en_US"/}</dt>
     *   <dd>code&mdash;The key under which the message is stored</dd>
     *   <dd>locale&mdash;The locale from which to get the message ("en_US")</dd>
     *
     * <dt>{@msg key="code" p0="first" p1=variable /}</dt>
     *   <dd>code&mdash;The key under which the message is stored</dd>
     *   <dd>p0, p1, &hellip; pN&mdash;String format parameters for the message
     *       (See [[Lavaca.util.StringUtils]].format())</dd>
     *
     * </dl>
     *
     * @method helperMsg
     *
     * @param {Object} chunk  Dust chunk
     * @param {Object} context  Dust context
     * @param {Object} bodies  Dust bodies
     * @param {Object} params  Parameters passed to the helper
     * @return {String}  Rendered output
     */
    helperMsg: function(chunk, context, bodies, params) {lacuna_lazy_load("js/libs/lavaca.js[336455:337060]", functionData => eval(functionData))},
    /**
     * Helper function, exposed in dust templates, that uses
     *   [[Lavaca.ui.Template]] to include other templates. Accessed as:
     *
     * <dl>
     *
     * <dt>{@include name="template-name"/}</dt>
     *   <dd>name&mdash;The name under which the template can be referenced</dd>
     *
     * </dl>
     *
     * <strong>Note:</strong> You should always use the include helper instead of
     * the dust.js partial syntax. The dust.js partial syntax may not work as expected.
     *
     * @method helperInclude
     * @param {Object} chunk  Dust chunk
     * @param {Object} context  Dust context
     * @param {Object} bodies  Dust bodies
     * @param {Object} params  Parameters passed to the helper
     * @return {String}  Rendered output
     */
    helperInclude: function(chunk, context, bodies, params) {lacuna_lazy_load("js/libs/lavaca.js[337894:338303]", functionData => eval(functionData))},
    /**
     * Helper function, exposed in dust templates, that allows templates
     *   to use data from [[Lavaca.util.Config]]. Accessed as:
     *
     * <dl>
     *
     * <dt>{@config key="config_value"/}</dt>
     *   <dd>key&mdash;The key to read from the config file for the default environment.</dd>
     *
     * <dt>{@config key="config_value" environment="production"/}</dt>
     *   <dd>key&mdash;The key to read from the config file for the specified environment.</dd>
     *
     * <dt>{@config key="config_value"}default{/config}</dt>
     *   <dd>key&mdash;The key to read from the config file</dd>
     *   <dd>default&mdash;The default markup to display if the key
     *       is not found</dd>
     *
     * <dt>{@config key="config_value" p0="first" p1=variable /}</dt>
     *   <dd>key&mdash;The key to read from the config file</dd>
     *   <dd>p0, p1, &hellip; pN&mdash;String format parameters
     *       (See [[Lavaca.util.StringUtils]].format())</dd>
     *
     * </dl>
     *
     * <dt>{@config only="local"}&hellip;{:else}&hellip;{/config}</dt>
     *   <dd>only&mdash;Only render the body content if the current config environment's name matches this key</dd>
     *
     * </dl>
     *
     * <dt>{@config not="production"}&hellip;{:else}&hellip;{/config}</dt>
     *   <dd>not&mdash;Only render the body content if the current config environment's name does NOT match this key</dd>
     *
     * </dl>
     * @method helperConfig
     *
     * @param {Object} chunk  Dust chunk
     * @param {Object} context  Dust context
     * @param {Object} bodies  Dust bodies
     * @param {Object} params  Parameters passed to the helper
     * @return {String}  Rendered output
     */
    helperConfig: function(chunk, context, bodies, params) {lacuna_lazy_load("js/libs/lavaca.js[340081:341138]", functionData => eval(functionData))},
    /**
     * Compiles the template
     * @method compile
     */
    compile: function() {lacuna_lazy_load("js/libs/lavaca.js[341232:341343]", functionData => eval(functionData))},
    /**
     * Renders the template to a string.
     * @method render
     *
     * @param {Object} model  The data model to provide to the template
     * @return {Lavaca.util.Promise}  A promise
     */
    render: function(model) {
      var promise = new Promise(this);
      if (!this.code && this.src) {
        this.load(this.src);
      }
      if (this.code && !this.compiled) {
        this.compile();
        this.compiled = true;
      }
      dust.render(this.name, model, function(err, html) {
        if (err) {
          promise.reject(err);
        } else {
          promise.resolve(html);
        }
      });
      return promise;
    },
    /**
     * Makes this template ready for disposals
     * @method dispose
     */
    dispose: function() {lacuna_lazy_load("js/libs/lavaca.js[342113:342201]", functionData => eval(functionData))}
  });

  DustTemplate.getCompiledTemplates = function() {
    return dust.cache;
  };

  // Register the Dust template type for later use
  Template.register('text/dust-template', DustTemplate);

  return DustTemplate;

});

define('lavaca/ui/Widget',['require','$','lavaca/events/EventDispatcher','lavaca/util/uuid'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[342538:343345]", functionData => eval(functionData))});

define('lavaca/ui/Form',['require','$','lavaca/ui/Widget','lavaca/util/Promise'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[343448:353770]", functionData => eval(functionData))});

define('lavaca/ui/Widget',['require','$','lavaca/events/EventDispatcher','lavaca/util/uuid'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[353885:354692]", functionData => eval(functionData))});

define('lavaca/ui/LoadingIndicator',['require','$','./Widget'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[354777:356364]", functionData => eval(functionData))});


define('lavaca/ui/Template',['require','lavaca/util/Cache','lavaca/util/Map'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[356465:360165]", functionData => eval(functionData))});

define('lavaca/util/ArrayUtils',[],function() {lacuna_lazy_load("js/libs/lavaca.js[360215:362503]", functionData => eval(functionData))});

define('lavaca/util/Cache',['require','lavaca/util/Disposable','lavaca/util/uuid'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[362608:367016]", functionData => eval(functionData))});

define('lavaca/util/extend',[],function() {lacuna_lazy_load("js/libs/lavaca.js[367062:369173]", functionData => eval(functionData))});

define('lavaca/util/Disposable',['require','./extend'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[369250:370249]", functionData => eval(functionData))});
define('lavaca/util/Map',['require','$','./Cache','./Disposable','lavaca/net/Connectivity'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[370362:375803]", functionData => eval(functionData))});

define('lavaca/util/Config',['require','./Cache','./Map'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[375883:377873]", functionData => eval(functionData))});

define('lavaca/util/Translation',['require','./Cache','./Map'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[377958:382570]", functionData => eval(functionData))});

define('lavaca/util/DateUtils',['require','./Translation'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[382651:398604]", functionData => eval(functionData))});

define('lavaca/util/Promise',['require','./extend'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[398678:405375]", functionData => eval(functionData))});

define('lavaca/util/StringUtils',['require'],function(require) {lacuna_lazy_load("js/libs/lavaca.js[405442:407760]", functionData => eval(functionData))});
define('lavaca/util/delay',[],function() {lacuna_lazy_load("js/libs/lavaca.js[407804:408794]", functionData => eval(functionData))});

define('lavaca/util/log',[],function() {lacuna_lazy_load("js/libs/lavaca.js[408837:409275]", functionData => eval(functionData))});

define('lavaca/util/resolve',[],function() {lacuna_lazy_load("js/libs/lavaca.js[409322:410773]", functionData => eval(functionData))});

define('lavaca/util/uuid',[],function() {lacuna_lazy_load("js/libs/lavaca.js[410817:411368]", functionData => eval(functionData))});

})();