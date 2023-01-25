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
/*
* Kendo UI Web v2013.3.1119 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI Web commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement/kendo-ui-web-commercial.aspx
* If you do not own a commercial license, this file shall be governed by the
* GNU General Public License (GPL) version 3.
* For GPL requirements, please review: http://www.gnu.org/copyleft/gpl.html
*/
kendo_module({
    id: "router",
    name: "Router",
    category: "framework",
    description: "The Router class is responsible for tracking the application state and navigating between the application states.",
    depends: [ "core" ],
    hidden: false
});

(function($, undefined) {
    var kendo = window.kendo,
        CHANGE = "change",
        BACK = "back",
        support = kendo.support,
        location = window.location,
        history = window.history,
        CHECK_URL_INTERVAL = 50,
        hashStrip = /^#*/,
        document = window.document;

    function absoluteURL(path, pathPrefix) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.router.js[1053:1445]", functionData => eval(functionData))}

    function stripRoot(root, url) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.router.js[1481:1647]", functionData => eval(functionData))}

    var PushStateAdapter = kendo.Class.extend({
        init: function(root) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.router.js[1726:1767]", functionData => eval(functionData))},

        navigate: function(to) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.router.js[1801:1926]", functionData => eval(functionData))},

        current: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.router.js[1957:2158]", functionData => eval(functionData))},

        change: function(callback) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.router.js[2196:2263]", functionData => eval(functionData))},

        stop: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.router.js[2291:2350]", functionData => eval(functionData))}
    });

    var HashAdapter = kendo.Class.extend({
        navigate: function(to) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.router.js[2434:2500]", functionData => eval(functionData))},

        change: function(callback) {
            if (support.hashChange) {
                $(window).bind("hashchange.kendo", callback);
            } else {
                this._interval = setInterval(callback, CHECK_URL_INTERVAL);
            }
        },

        stop: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.router.js[2788:2890]", functionData => eval(functionData))},

        current: function() {
            return location.hash.replace(hashStrip, '');
        }
    });

    var History = kendo.Observable.extend({
        start: function(options) {
            options = options || {};

            this.bind([CHANGE, BACK], options);

            if (this._started) {
                return;
            }

            this._started = true;

            var pathname = location.pathname,
                hash = location.hash,
                pushState = support.pushState && options.pushState,
                root = options.root || "/",
                atRoot = root === pathname;

            this.adapter = pushState ? new PushStateAdapter(root) : new HashAdapter();

            if (options.pushState && !support.pushState && !atRoot) {
                location.replace(root + '#' + stripRoot(root, pathname));
                return true; // browser will reload at this point.
            }

            if (pushState) {
                var fixedUrl;
                if (root === pathname + "/") {
                    fixedUrl = root;
                }

                if (atRoot && hash) {
                    fixedUrl = absoluteURL(hash.replace(hashStrip, ''), root);
                }

                if (fixedUrl) {
                    history.replaceState({}, document.title, fixedUrl);
                }
            }

            this.root = root;
            this.current = this.adapter.current();
            this.locations = [this.current];
            this.adapter.change($.proxy(this, "_checkUrl"));
        },

        stop: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.router.js[4486:4670]", functionData => eval(functionData))},

        change: function(callback) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.router.js[4708:4760]", functionData => eval(functionData))},

        navigate: function(to, silent) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.router.js[4802:5332]", functionData => eval(functionData))},

        _checkUrl: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.router.js[5365:6320]", functionData => eval(functionData))}
    });

    kendo.absoluteURL = absoluteURL;
    kendo.history = new History();
})(window.kendo.jQuery);

(function() {
    var kendo = window.kendo,
        history = kendo.history,
        Observable = kendo.Observable,
        INIT = "init",
        ROUTE_MISSING = "routeMissing",
        CHANGE = "change",
        BACK = "back",
        optionalParam = /\((.*?)\)/g,
        namedParam = /(\(\?)?:\w+/g,
        splatParam = /\*\w+/g,
        escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

    function namedParamReplace(match, optional) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.router.js[6863:6916]", functionData => eval(functionData))}

    function routeToRegExp(route) {
        return new RegExp('^' + route
            .replace(escapeRegExp, '\\$&')
            .replace(optionalParam, '(?:$1)?')
            .replace(namedParam, namedParamReplace)
            .replace(splatParam, '(.*?)') + '$');
    }

    function stripUrl(url) {
        return url.replace(/(\?.*)|(#.*)/g, "");
    }

    var Route = kendo.Class.extend({
        init: function(route, callback) {
            if (!(route instanceof RegExp)) {
                route = routeToRegExp(route);
            }

            this.route = route;
            this._callback = callback;
        },

        callback: function(url) {
            var params,
                idx = 0,
                length,
                queryStringParams = kendo.parseQueryStringParams(url);

            url = stripUrl(url);
            params = this.route.exec(url).slice(1);
            length = params.length;

            for (; idx < length; idx ++) {
                if (typeof params[idx] !== 'undefined') {
                    params[idx] = decodeURIComponent(params[idx]);
                }
            }

            params.push(queryStringParams);

            this._callback.apply(null, params);
        },

        worksWith: function(url) {
            if (this.route.test(url)) {
                this.callback(url);
                return true;
            } else {
                return false;
            }
        }
    });

    var Router = Observable.extend({
        init: function(options) {
            Observable.fn.init.call(this);
            this.routes = [];
            this.pushState = options ? options.pushState : false;
            if (options && options.root) {
                this.root = options.root;
            }
            this.bind([INIT, ROUTE_MISSING, CHANGE], options);
        },

        destroy: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.router.js[8788:8936]", functionData => eval(functionData))},

        start: function() {
            var that = this,
                backProxy = function(e) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.router.js[9036:9054]", functionData => eval(functionData))},
                urlChangedProxy = function(e) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.router.js[9102:9126]", functionData => eval(functionData))};

            history.start({
                change: urlChangedProxy,
                back: backProxy,
                pushState: that.pushState,
                root: that.root
            });

            var initEventObject = { url: history.current || "/" };

            if (!that.trigger(INIT, initEventObject)) {
                that._urlChanged(initEventObject);
            }

            this._urlChangedProxy = urlChangedProxy;
            this._backProxy = backProxy;
        },

        route: function(route, callback) {
            this.routes.push(new Route(route, callback));
        },

        navigate: function(url, silent) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.router.js[9772:9832]", functionData => eval(functionData))},

        _back: function(e) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.router.js[9862:9987]", functionData => eval(functionData))},

        _urlChanged: function(e) {
            var url = e.url;

            if (!url) {
                url = "/";
            }

            if (this.trigger(CHANGE, { url: e.url, params: kendo.parseQueryStringParams(e.url) })) {
                e.preventDefault();
                return;
            }

            var idx = 0,
                routes = this.routes,
                route,
                length = routes.length;

            for (; idx < length; idx ++) {
                 route = routes[idx];

                 if (route.worksWith(url)) {
                    return;
                 }
            }

            if (this.trigger(ROUTE_MISSING, { url: url, params: kendo.parseQueryStringParams(url) })) {
                e.preventDefault();
            }
        }
    });

    kendo.Router = Router;
})();
