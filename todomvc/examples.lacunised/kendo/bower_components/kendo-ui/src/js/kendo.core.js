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
(function($, evil, undefined) {
    var kendo = window.kendo = window.kendo || { cultures: {} },
        extend = $.extend,
        each = $.each,
        isArray = $.isArray,
        proxy = $.proxy,
        noop = $.noop,
        math = Math,
        Template,
        JSON = window.JSON || {},
        support = {},
        percentRegExp = /%/,
        formatRegExp = /\{(\d+)(:[^\}]+)?\}/g,
        boxShadowRegExp = /(\d+?)px\s*(\d+?)px\s*(\d+?)px\s*(\d+?)?/i,
        numberRegExp = /^(\+|-?)\d+(\.?)\d*$/,
        FUNCTION = "function",
        STRING = "string",
        NUMBER = "number",
        OBJECT = "object",
        NULL = "null",
        BOOLEAN = "boolean",
        UNDEFINED = "undefined",
        getterCache = {},
        setterCache = {},
        slice = [].slice,
        globalize = window.Globalize;

    kendo.version = "2013.3.1119";

    function Class() {}

    Class.extend = function(proto) {
        var base = function() {},
            member,
            that = this,
            subclass = proto && proto.init ? proto.init : function () {
                that.apply(this, arguments);
            },
            fn;

        base.prototype = that.prototype;
        fn = subclass.fn = subclass.prototype = new base();

        for (member in proto) {
            if (typeof proto[member] === OBJECT && !(proto[member] instanceof Array) && proto[member] !== null) {
                // Merge object members
                fn[member] = extend(true, {}, base.prototype[member], proto[member]);
            } else {
                fn[member] = proto[member];
            }
        }

        fn.constructor = subclass;
        subclass.extend = that.extend;

        return subclass;
    };

    Class.prototype._initOptions = function(options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[2220:2289]", functionData => eval(functionData))};

    var isFunction = kendo.isFunction = function(fn) {
        return typeof fn === "function";
    };

    var preventDefault = function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[2432:2478]", functionData => eval(functionData))};

    var isDefaultPrevented = function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[2521:2576]", functionData => eval(functionData))};

    var Observable = Class.extend({
        init: function() {
            this._events = {};
        },

        bind: function(eventName, handlers, one) {
            var that = this,
                idx,
                eventNames = typeof eventName === STRING ? [eventName] : eventName,
                length,
                original,
                handler,
                handlersIsFunction = typeof handlers === FUNCTION,
                events;

            if (handlers === undefined) {
                for (idx in eventName) {
                    that.bind(idx, eventName[idx]);
                }
                return that;
            }

            for (idx = 0, length = eventNames.length; idx < length; idx++) {
                eventName = eventNames[idx];

                handler = handlersIsFunction ? handlers : handlers[eventName];

                if (handler) {
                    if (one) {
                        original = handler;
                        handler = function() {
                            that.unbind(eventName, handler);
                            original.apply(that, arguments);
                        };
                    }
                    events = that._events[eventName] = that._events[eventName] || [];
                    events.push(handler);
                }
            }

            return that;
        },

        one: function(eventNames, handlers) {
            return this.bind(eventNames, handlers, true);
        },

        first: function(eventName, handlers) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[4120:4829]", functionData => eval(functionData))},

        trigger: function(eventName, e) {
            var that = this,
                events = that._events[eventName],
                idx,
                length;

            if (events) {
                e = e || {};

                e.sender = that;

                e._defaultPrevented = false;

                e.preventDefault = preventDefault;

                e.isDefaultPrevented = isDefaultPrevented;

                events = events.slice();

                for (idx = 0, length = events.length; idx < length; idx++) {
                    events[idx].call(that, e);
                }

                return e._defaultPrevented === true;
            }

            return false;
        },

        unbind: function(eventName, handler) {
            var that = this,
                events = that._events[eventName],
                idx;

            if (eventName === undefined) {
                that._events = {};
            } else if (events) {
                if (handler) {
                    for (idx = events.length - 1; idx >= 0; idx--) {
                        if (events[idx] === handler) {
                            events.splice(idx, 1);
                        }
                    }
                } else {
                    that._events[eventName] = [];
                }
            }

            return that;
        }
    });


     function compilePart(part, stringPart) {
         if (stringPart) {
             return "'" +
                 part.split("'").join("\\'")
                     .split('\\"').join('\\\\\\"')
                     .replace(/\n/g, "\\n")
                     .replace(/\r/g, "\\r")
                     .replace(/\t/g, "\\t") + "'";
         } else {
             var first = part.charAt(0),
                 rest = part.substring(1);

             if (first === "=") {
                 return "+(" + rest + ")+";
             } else if (first === ":") {
                 return "+e(" + rest + ")+";
             } else {
                 return ";" + part + ";o+=";
             }
         }
     }

    var argumentNameRegExp = /^\w+/,
        encodeRegExp = /\$\{([^}]*)\}/g,
        escapedCurlyRegExp = /\\\}/g,
        curlyRegExp = /__CURLY__/g,
        escapedSharpRegExp = /\\#/g,
        sharpRegExp = /__SHARP__/g,
        zeros = ["", "0", "00", "000", "0000"];

    Template = {
        paramName: "data", // name of the parameter of the generated template
        useWithBlock: true, // whether to wrap the template in a with() block
        render: function(template, data) {
            var idx,
                length,
                html = "";

            for (idx = 0, length = data.length; idx < length; idx++) {
                html += template(data[idx]);
            }

            return html;
        },
        compile: function(template, options) {
            var settings = extend({}, this, options),
                paramName = settings.paramName,
                argumentName = paramName.match(argumentNameRegExp)[0],
                useWithBlock = settings.useWithBlock,
                functionBody = "var o,e=kendo.htmlEncode;",
                fn,
                parts,
                idx;

            if (isFunction(template)) {
                if (template.length === 2) {
                    //looks like jQuery.template
                    return function(d) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[8208:8297]", functionData => eval(functionData))};
                }
                return template;
            }

            functionBody += useWithBlock ? "with(" + paramName + "){" : "";

            functionBody += "o=";

            parts = template
                .replace(escapedCurlyRegExp, "__CURLY__")
                .replace(encodeRegExp, "#=e($1)#")
                .replace(curlyRegExp, "}")
                .replace(escapedSharpRegExp, "__SHARP__")
                .split("#");

            for (idx = 0; idx < parts.length; idx ++) {
                functionBody += compilePart(parts[idx], idx % 2 === 0);
            }

            functionBody += useWithBlock ? ";}" : ";";

            functionBody += "return o;";

            functionBody = functionBody.replace(sharpRegExp, "#");

            try {
                fn = new Function(argumentName, functionBody);
                fn._slotCount = Math.floor(parts.length / 2);
                return fn;
            } catch(e) {
                throw new Error(kendo.format("Invalid template:'{0}' Generated code:'{1}'", template, functionBody));
            }
        }
    };

function pad(number, digits, end) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[9434:9622]", functionData => eval(functionData))}

    //JSON stringify
(function() {
    var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            "\"" : '\\"',
            "\\": "\\\\"
        },
        rep,
        toString = {}.toString;

    if (typeof Date.prototype.toJSON !== FUNCTION) {

        Date.prototype.toJSON = function () {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[10180:10597]", functionData => eval(functionData))};

        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[10699:10745]", functionData => eval(functionData))};
    }

    function quote(string) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[10781:11100]", functionData => eval(functionData))}

    function str(key, holder) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[11132:13480]", functionData => eval(functionData))}

    if (typeof JSON.stringify !== FUNCTION) {
        JSON.stringify = function (value, replacer, space) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[13587:14172]", functionData => eval(functionData))};
    }
})();

// Date and Number formatting
(function() {
    var dateFormatRegExp = /dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|HH|H|hh|h|mm|m|fff|ff|f|tt|ss|s|"[^"]*"|'[^']*'/g,
        standardFormatRegExp =  /^(n|c|p|e)(\d*)$/i,
        literalRegExp = /(\\.)|(['][^']*[']?)|(["][^"]*["]?)/g,
        commaRegExp = /\,/g,
        EMPTY = "",
        POINT = ".",
        COMMA = ",",
        SHARP = "#",
        ZERO = "0",
        PLACEHOLDER = "??",
        EN = "en-US",
        objectToString = {}.toString;

    //cultures
    kendo.cultures["en-US"] = {
        name: EN,
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n %", "n %"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                pattern: ["($n)", "$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "$"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    namesShort: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ]
                },
                months: {
                    names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                },
                AM: [ "AM", "am", "AM" ],
                PM: [ "PM", "pm", "PM" ],
                patterns: {
                    d: "M/d/yyyy",
                    D: "dddd, MMMM dd, yyyy",
                    F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                    g: "M/d/yyyy h:mm tt",
                    G: "M/d/yyyy h:mm:ss tt",
                    m: "MMMM dd",
                    M: "MMMM dd",
                    s: "yyyy'-'MM'-'ddTHH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM, yyyy",
                    Y: "MMMM, yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 0,
                twoDigitYearMax: 2029
            }
        }
    };


     function findCulture(culture) {
        if (culture) {
            if (culture.numberFormat) {
                return culture;
            }

            if (typeof culture === STRING) {
                var cultures = kendo.cultures;
                return cultures[culture] || cultures[culture.split("-")[0]] || null;
            }

            return null;
        }

        return null;
    }

    function getCulture(culture) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[17286:17421]", functionData => eval(functionData))}

    function expandNumberFormat(numberFormat) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[17469:17684]", functionData => eval(functionData))}

    kendo.culture = function(cultureName) {
        var cultures = kendo.cultures, culture;

        if (cultureName !== undefined) {
            culture = findCulture(cultureName) || cultures[EN];
            culture.calendar = culture.calendars.standard;
            cultures.current = culture;

            if (globalize) {
                expandNumberFormat(culture.numberFormat);
            }

        } else {
            return cultures.current;
        }
    };

    kendo.findCulture = findCulture;
    kendo.getCulture = getCulture;

    //set current culture to en-US.
    kendo.culture(EN);

    function formatDate(date, format, culture) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[18338:20832]", functionData => eval(functionData))}

    //number formatting
    function formatNumber(number, format, culture) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[20909:32538]", functionData => eval(functionData))}

    var round = function(value, precision) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[32583:32711]", functionData => eval(functionData))};

    var toString = function(value, fmt, culture) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[32763:33093]", functionData => eval(functionData))};

    if (globalize) {
        toString = proxy(globalize.format, globalize);
    }

    kendo.format = function(fmt) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[33212:33500]", functionData => eval(functionData))};

    kendo._extractFormat = function (format) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[33548:33689]", functionData => eval(functionData))};

    kendo._activeElement = function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[33730:33884]", functionData => eval(functionData))};

    kendo._round = round;
    kendo.toString = toString;
})();


(function() {
    var nonBreakingSpaceRegExp = /\u00A0/g,
        exponentRegExp = /[eE][\-+]?[0-9]+/,
        shortTimeZoneRegExp = /[+|\-]\d{1,2}/,
        longTimeZoneRegExp = /[+|\-]\d{1,2}:\d{2}/,
        dateRegExp = /^\/Date\((.*?)\)\/$/,
        formatsSequence = ["G", "g", "d", "F", "D", "y", "m", "T", "t"],
        numberRegExp = {
            2: /^\d{1,2}/,
            4: /^\d{4}/
        },
        objectToString = {}.toString;

    function outOfRange(value, start, end) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[34440:34497]", functionData => eval(functionData))}

    function designatorPredicate(designator) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[34544:34588]", functionData => eval(functionData))}

    function mapDesignators(designators) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[34631:34694]", functionData => eval(functionData))}

    //if date's day is different than the typed one - adjust
    function adjustDST(date, hours) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[34793:34906]", functionData => eval(functionData))}

    function lowerArray(data) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[34938:35153]", functionData => eval(functionData))}

    function lowerLocalInfo(localInfo) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[35194:35391]", functionData => eval(functionData))}

    function parseExact(value, format, culture) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[35441:45017]", functionData => eval(functionData))}

    kendo.parseDate = function(value, formats, culture) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[45075:46674]", functionData => eval(functionData))};

    kendo.parseInt = function(value, culture) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[46723:46873]", functionData => eval(functionData))};

    kendo.parseFloat = function(value, culture, format) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[46932:48908]", functionData => eval(functionData))};

    if (globalize) {
        kendo.parseDate = function (value, format, culture) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[48992:49178]", functionData => eval(functionData))};

        kendo.parseFloat = function (value, culture) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[49234:49540]", functionData => eval(functionData))};
    }
})();

    function wrap(element, autosize) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[49592:52514]", functionData => eval(functionData))}

    function deepExtend(destination) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[52553:52751]", functionData => eval(functionData))}

    function deepExtendOne(destination, source) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[52801:53985]", functionData => eval(functionData))}

    function testRx(agent, rxs, dflt) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[54025:54228]", functionData => eval(functionData))}

    function toHyphens(str) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[54258:54402]", functionData => eval(functionData))}

    function toCamelCase(str) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[54434:54554]", functionData => eval(functionData))}

    function getComputedStyles(element, properties) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[54608:55388]", functionData => eval(functionData))}

    (function() {
        support.scrollbar = function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[55447:55834]", functionData => eval(functionData))};

        support.isRtl = function(element) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[55879:55950]", functionData => eval(functionData))};

        var table = document.createElement("table");

        // Internet Explorer does not support setting the innerHTML of TBODY and TABLE elements
        try {
            table.innerHTML = "<tr><td></td></tr>";

            support.tbodyInnerHtml = true;
        } catch (e) {
            support.tbodyInnerHtml = false;
        }

        support.touch = "ontouchstart" in window;
        support.msPointers = navigator.msPointerEnabled;
        support.pointers = navigator.pointerEnabled;

        var transitions = support.transitions = false,
            transforms = support.transforms = false,
            elementProto = "HTMLElement" in window ? HTMLElement.prototype : [];

        support.hasHW3D = ("WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix()) || "MozPerspective" in document.documentElement.style || "msPerspective" in document.documentElement.style;

        each([ "Moz", "webkit", "O", "ms" ], function () {
            var prefix = this.toString(),
                hasTransitions = typeof table.style[prefix + "Transition"] === STRING;

            if (hasTransitions || typeof table.style[prefix + "Transform"] === STRING) {
                var lowPrefix = prefix.toLowerCase();

                transforms = {
                    css: (lowPrefix != "ms") ? "-" + lowPrefix + "-" : "",
                    prefix: prefix,
                    event: (lowPrefix === "o" || lowPrefix === "webkit") ? lowPrefix : ""
                };

                if (hasTransitions) {
                    transitions = transforms;
                    transitions.event = transitions.event ? transitions.event + "TransitionEnd" : "transitionend";
                }

                return false;
            }
        });

        support.transforms = transforms;
        support.transitions = transitions;

        support.devicePixelRatio = window.devicePixelRatio === undefined ? 1 : window.devicePixelRatio;

        try {
            support.screenWidth = window.outerWidth || window.screen ? window.screen.availWidth : window.innerWidth;
            support.screenHeight = window.outerHeight || window.screen ? window.screen.availHeight : window.innerHeight;
        } catch(e) {
            //window.outerWidth throws error when in IE showModalDialog.
            support.screenWidth = window.screen.availWidth;
            support.screenHeight = window.screen.availHeight;
        }

        support.detectOS = function (ua) {
            var os = false, minorVersion, match = [],
                notAndroidPhone = !/mobile safari/i.test(ua),
                agentRxs = {
                    fire: /(Silk)\/(\d+)\.(\d+(\.\d+)?)/,
                    android: /(Android|Android.*(?:Opera|Firefox).*?\/)\s*(\d+)\.(\d+(\.\d+)?)/,
                    iphone: /(iPhone|iPod).*OS\s+(\d+)[\._]([\d\._]+)/,
                    ipad: /(iPad).*OS\s+(\d+)[\._]([\d_]+)/,
                    meego: /(MeeGo).+NokiaBrowser\/(\d+)\.([\d\._]+)/,
                    webos: /(webOS)\/(\d+)\.(\d+(\.\d+)?)/,
                    blackberry: /(BlackBerry|BB10).*?Version\/(\d+)\.(\d+(\.\d+)?)/,
                    playbook: /(PlayBook).*?Tablet\s*OS\s*(\d+)\.(\d+(\.\d+)?)/,
                    wp: /(Windows Phone(?: OS)?)\s(\d+)\.(\d+(\.\d+)?)/,
                    windows: /(MSIE)\s+(\d+)\.(\d+(\.\d+)?)/,
                    ffos: /(Mobile).*rv:(\d+)\.(\d+(\.\d+)?).*Firefox/
                },
                osRxs = {
                    ios: /^i(phone|pad|pod)$/i,
                    android: /^android|fire$/i,
                    blackberry: /^blackberry|playbook/i,
                    windows: /windows/,
                    wp: /wp/,
                    meego: /meego|ffos/
                },
                formFactorRxs = {
                    tablet: /playbook|ipad|fire/i
                },
                browserRxs = {
                    omini: /Opera\sMini/i,
                    omobile: /Opera\sMobi/i,
                    firefox: /Firefox|Fennec/i,
                    mobilesafari: /version\/.*safari/i,
                    chrome: /chrome/i,
                    webkit: /webkit/i,
                    ie: /MSIE|Windows\sPhone/i
                };

            for (var agent in agentRxs) {
                if (agentRxs.hasOwnProperty(agent)) {
                    match = ua.match(agentRxs[agent]);
                    if (match) {
                        if (agent == "windows" && "plugins" in navigator) { return false; } // Break if not Metro/Mobile Windows

                        os = {};
                        os.device = agent;
                        os.tablet = testRx(agent, formFactorRxs, false);
                        os.browser = testRx(ua, browserRxs, "default");
                        os.name = testRx(agent, osRxs);
                        os[os.name] = true;
                        os.majorVersion = match[2];
                        os.minorVersion = match[3].replace("_", ".");
                        minorVersion = os.minorVersion.replace(".", "").substr(0, 2);
                        os.flatVersion = os.majorVersion + minorVersion + (new Array(3 - (minorVersion.length < 3 ? minorVersion.length : 2)).join("0"));
                        os.appMode = window.navigator.standalone || (/file|local|wmapp/).test(window.location.protocol) || typeof window.PhoneGap !== UNDEFINED || typeof window.cordova !== UNDEFINED; // Use file protocol to detect appModes.

                        if (os.android && (support.devicePixelRatio < 1.5 && os.flatVersion < 400 || notAndroidPhone) && (support.screenWidth > 800 || support.screenHeight > 800)) {
                            os.tablet = agent;
                        }

                        break;
                    }
                }
            }
            return os;
        };

        var mobileOS = support.mobileOS = support.detectOS(navigator.userAgent);

        support.wpDevicePixelRatio = mobileOS.wp ? screen.width / 320 : 0;
        support.kineticScrollNeeded = mobileOS && (support.touch || support.msPointers || support.pointers);

        support.hasNativeScrolling = false;

        if ((mobileOS.ios && mobileOS.majorVersion > 4) || (mobileOS.android && mobileOS.majorVersion > 2) || mobileOS.wp) {
            support.hasNativeScrolling = mobileOS;
        }

        support.mouseAndTouchPresent = support.touch && !(support.mobileOS.ios || support.mobileOS.android);

        support.detectBrowser = function(ua) {
            var browser = false, match = [],
                browserRxs = {
                    webkit: /(chrome)[ \/]([\w.]+)/i,
                    safari: /(webkit)[ \/]([\w.]+)/i,
                    opera: /(opera)(?:.*version|)[ \/]([\w.]+)/i,
                    msie: /(msie\s|trident.*? rv:)([\w.]+)/i,
                    mozilla: /(mozilla)(?:.*? rv:([\w.]+)|)/i
                };

            for (var agent in browserRxs) {
                if (browserRxs.hasOwnProperty(agent)) {
                    match = ua.match(browserRxs[agent]);
                    if (match) {
                        browser = {};
                        browser[agent] = true;
                        browser[match[1].toLowerCase()] = true;
                        browser.version = parseInt(document.documentMode || match[2], 10);

                        break;
                    }
                }
            }

            return browser;
        };

        support.browser = support.detectBrowser(navigator.userAgent);

        support.zoomLevel = function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[63485:63821]", functionData => eval(functionData))};

        support.cssBorderSpacing = typeof document.documentElement.style.borderSpacing != "undefined" && !(support.browser.msie && support.browser.version < 8);

        (function(browser) {
            // add browser-specific CSS class
            var cssClass,
                majorVersion = parseInt(browser.version, 10);

            if (browser.msie) {
                cssClass = "ie";
            } else if (browser.mozilla) {
                cssClass = "ff";
            } else if (browser.safari) {
                cssClass = "safari";
            } else if (browser.webkit) {
                cssClass = "webkit";
            } else if (browser.opera) {
                cssClass = "opera";
            }

            if (cssClass) {
                $(document.documentElement).addClass("k-" + cssClass + " k-" + cssClass + majorVersion);
            }
        })(support.browser);

        support.eventCapture = document.documentElement.addEventListener;

        var input = document.createElement("input");

        support.placeholder = "placeholder" in input;

        support.input = (function() {
            var types = ["number", "date", "time", "month", "week", "datetime", "datetime-local"];
            var length = types.length;
            var value = "test";
            var result = {};
            var idx = 0;
            var type;

            for (;idx < length; idx++) {
                type = types[idx];
                input.setAttribute("type", type);
                input.value = value;

                result[type.replace("-", "")] = input.type !== "text" && input.value !== value;
            }

            return result;
        })();

        support.stableSort = (function() {
            var sorted = [0,1,2,3,4,5,6,7,8,9,10,11,12].sort(function() { return 0; } );
            return sorted[0] === 0 && sorted[1] === 1 && sorted[2] === 2 && sorted[3] === 3 && sorted[4] === 4 &&
                sorted[5] === 5 && sorted[6] === 6 && sorted[7] === 7 && sorted[8] === 8 &&
                sorted[9] === 9 && sorted[10] === 10 && sorted[11] === 11 && sorted[12] === 12;
        })();

        support.matchesSelector = elementProto.webkitMatchesSelector || elementProto.mozMatchesSelector ||
                                  elementProto.msMatchesSelector || elementProto.oMatchesSelector || elementProto.matchesSelector ||
          function( selector ) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[66220:66585]", functionData => eval(functionData))};

        support.pushState = window.history && window.history.pushState;

        var documentMode = document.documentMode;

        support.hashChange = ("onhashchange" in window) && !(support.browser.msie && (!documentMode || documentMode <= 8)); // old IE detection
    })();


    function size(obj) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[66891:67117]", functionData => eval(functionData))}

    function getOffset(element, type, positioned) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[67169:68187]", functionData => eval(functionData))}

    var directions = {
        left: { reverse: "right" },
        right: { reverse: "left" },
        down: { reverse: "up" },
        up: { reverse: "down" },
        top: { reverse: "bottom" },
        bottom: { reverse: "top" },
        "in": { reverse: "out" },
        out: { reverse: "in" }
    };

    function parseEffects(input) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[68528:68717]", functionData => eval(functionData))}

    function fx(element) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[68744:68802]", functionData => eval(functionData))}

    var effects = {};

    $.extend(effects, {
        Element: function(element) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[68886:68936]", functionData => eval(functionData))},

        promise: function (element, options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[68984:69547]", functionData => eval(functionData))},

        transitionPromise: function(element, destination, options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[69617:69976]", functionData => eval(functionData))}
    });

    function prepareAnimationOptions(options, duration, reverse, complete) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[70061:71302]", functionData => eval(functionData))}

    function animate(element, options, duration, reverse, complete) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[71372:71736]", functionData => eval(functionData))}

    function animateTo(element, destination, options, duration, reverse, complete) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[71821:71955]", functionData => eval(functionData))}

    function toggleClass(element, classes, options, add) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[72014:72236]", functionData => eval(functionData))}

    if (!("kendoAnimate" in $.fn)) {
        extend($.fn, {
            kendoStop: function(clearQueue, gotoEnd) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[72351:72421]", functionData => eval(functionData))},

            kendoAnimate: function(options, duration, reverse, complete) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[72497:72588]", functionData => eval(functionData))},

            kendoAnimateTo: function(destination, options, duration, reverse, complete) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[72679:72785]", functionData => eval(functionData))},

            kendoAddClass: function(classes, options){lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[72841:72928]", functionData => eval(functionData))},
            kendoRemoveClass: function(classes, options){lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[72986:73074]", functionData => eval(functionData))},
            kendoToggleClass: function(classes, options, toggle){lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[73140:73229]", functionData => eval(functionData))}
        });
    }

    var ampRegExp = /&/g,
        ltRegExp = /</g,
        gtRegExp = />/g;
    function htmlEncode(value) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[73356:73472]", functionData => eval(functionData))}

    var eventTarget = function (e) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[73509:73541]", functionData => eval(functionData))};

    if (support.touch) {

        eventTarget = function(e) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[73604:73854]", functionData => eval(functionData))};

        each(["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap"], function(m, value) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[73971:74095]", functionData => eval(functionData))});
    }

    if (support.touch) {
        if (!support.mobileOS) {
            support.mousedown = "mousedown touchstart";
            support.mouseup = "mouseup touchend";
            support.mousemove = "mousemove touchmove";
            support.mousecancel = "mouseleave touchcancel";
            support.click = "click";
            support.resize = "resize";
        } else {
            support.mousedown = "touchstart";
            support.mouseup = "touchend";
            support.mousemove = "touchmove";
            support.mousecancel = "touchcancel";
            support.click = "touchend";
            support.resize = "orientationchange";
        }
    } else if (support.pointers) {
        support.mousemove = "pointermove";
        support.mousedown = "pointerdown";
        support.mouseup = "pointerup";
        support.mousecancel = "pointercancel";
        support.click = "pointerup";
        support.resize = "orientationchange resize";
    } else if (support.msPointers) {
        support.mousemove = "MSPointerMove";
        support.mousedown = "MSPointerDown";
        support.mouseup = "MSPointerUp";
        support.mousecancel = "MSPointerCancel";
        support.click = "MSPointerUp";
        support.resize = "orientationchange resize";
    } else {
        support.mousemove = "mousemove";
        support.mousedown = "mousedown";
        support.mouseup = "mouseup";
        support.mousecancel = "mouseleave";
        support.click = "click";
        support.resize = "resize";
    }

    var wrapExpression = function(members, paramName) {
        var result = paramName || "d",
            index,
            idx,
            length,
            member,
            count = 1;

        for (idx = 0, length = members.length; idx < length; idx++) {
            member = members[idx];
            if (member !== "") {
                index = member.indexOf("[");

                if (index !== 0) {
                    if (index == -1) {
                        member = "." + member;
                    } else {
                        count++;
                        member = "." + member.substring(0, index) + " || {})" + member.substring(index);
                    }
                }

                count++;
                result += member + ((idx < length - 1) ? " || {})" : ")");
            }
        }
        return new Array(count).join("(") + result;
    },
    localUrlRe = /^([a-z]+:)?\/\//i;

    extend(kendo, {
        ui: kendo.ui || {},
        fx: kendo.fx || fx,
        effects: kendo.effects || effects,
        mobile: kendo.mobile || {},
        data: kendo.data || {},
        dataviz: kendo.dataviz || {ui: { roles: {}}},
        keys: {
            INSERT: 45,
            DELETE: 46,
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            ESC: 27,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            END: 35,
            HOME: 36,
            SPACEBAR: 32,
            PAGEUP: 33,
            PAGEDOWN: 34,
            F2: 113,
            F10: 121,
            F12: 123
        },
        support: kendo.support || support,
        animate: kendo.animate || animate,
        ns: "",
        attr: function(value) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[77353:77411]", functionData => eval(functionData))},
        wrap: wrap,
        deepExtend: deepExtend,
        getComputedStyles: getComputedStyles,
        size: size,
        toCamelCase: toCamelCase,
        toHyphens: toHyphens,
        getOffset: kendo.getOffset || getOffset,
        parseEffects: kendo.parseEffects || parseEffects,
        toggleClass: kendo.toggleClass || toggleClass,
        directions: kendo.directions || directions,
        Observable: Observable,
        Class: Class,
        Template: Template,
        template: proxy(Template.compile, Template),
        render: proxy(Template.render, Template),
        stringify: proxy(JSON.stringify, JSON),
        eventTarget: eventTarget,
        htmlEncode: htmlEncode,
        isLocalUrl: function(url) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[78142:78202]", functionData => eval(functionData))},

        expr: function(expression, safe, paramName) {
            expression = expression || "";

            if (typeof safe == STRING) {
                paramName = safe;
                safe = false;
            }

            paramName = paramName || "d";

            if (expression && expression.charAt(0) !== "[") {
                expression = "." + expression;
            }

            if (safe) {
                expression = wrapExpression(expression.split("."), paramName);
            } else {
                expression = paramName + expression;
            }

            return expression;
        },

        getter: function(expression, safe) {
            return getterCache[expression] = getterCache[expression] || new Function("d", "return " + kendo.expr(expression, safe));
        },

        setter: function(expression) {
            return setterCache[expression] = setterCache[expression] || new Function("d,value", kendo.expr(expression) + "=value");
        },

        accessor: function(expression) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[79237:79377]", functionData => eval(functionData))},

        guid: function() {
            var id = "", i, random;

            for (i = 0; i < 32; i++) {
                random = math.random() * 16 | 0;

                if (i == 8 || i == 12 || i == 16 || i == 20) {
                    id += "-";
                }
                id += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
            }

            return id;
        },

        roleSelector: function(role) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[79822:79925]", functionData => eval(functionData))},

        triggeredByInput: function(e) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[79966:80057]", functionData => eval(functionData))},

        logToConsole: function(message) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[80100:80271]", functionData => eval(functionData))}
    });

    var Widget = Observable.extend( {
        init: function(element, options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[80360:80877]", functionData => eval(functionData))},

        events: [],

        options: {
            prefix: ""
        },

        _hasBindingTarget: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[80993:81061]", functionData => eval(functionData))},

        _tabindex: function(target) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[81100:81424]", functionData => eval(functionData))},

        setOptions: function(options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[81465:81905]", functionData => eval(functionData))},

        resize: function(force) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[81940:82279]", functionData => eval(functionData))},

        getSize: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[82310:82372]", functionData => eval(functionData))},

        size: function(size) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[82404:82550]", functionData => eval(functionData))},

        setSize: $.noop,
        _resize: $.noop,

        destroy: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[82632:82836]", functionData => eval(functionData))}
    });

    kendo.dimensions = function(element, dimensions) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[82899:83101]", functionData => eval(functionData))};

    kendo.notify = noop;

    var templateRegExp = /template$/i,
        jsonRegExp = /^\s*(?:\{(?:.|\r\n|\n)*\}|\[(?:.|\r\n|\n)*\])\s*$/,
        jsonFormatRegExp = /^\{(\d+)(:[^\}]+)?\}/,
        dashRegExp = /([A-Z])/g;

    function parseOption(element, option) {
        var value;

        if (option.indexOf("data") === 0) {
            option = option.substring(4);
            option = option.charAt(0).toLowerCase() + option.substring(1);
        }

        option = option.replace(dashRegExp, "-$1");
        value = element.getAttribute("data-" + kendo.ns + option);

        if (value === null) {
            value = undefined;
        } else if (value === "null") {
            value = null;
        } else if (value === "true") {
            value = true;
        } else if (value === "false") {
            value = false;
        } else if (numberRegExp.test(value)) {
            value = parseFloat(value);
        } else if (jsonRegExp.test(value) && !jsonFormatRegExp.test(value)) {
            value = evil("(" + value + ")");
        }

        return value;
    }

    function parseOptions(element, options) {
        var result = {},
            option,
            value;

        for (option in options) {
            value = parseOption(element, option);

            if (value !== undefined) {

                if (templateRegExp.test(option)) {
                    value = kendo.template($("#" + value).html());
                }

                result[option] = value;
            }
        }

        return result;
    }

    kendo.initWidget = function(element, options, roles) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[84716:86512]", functionData => eval(functionData))};

    kendo.rolesFromNamespaces = function(namespaces) {
        var roles = [],
            idx,
            length;

        if (!namespaces[0]) {
            namespaces = [kendo.ui, kendo.dataviz.ui];
        }

        for (idx = 0, length = namespaces.length; idx < length; idx ++) {
            roles[idx] = namespaces[idx].roles;
        }

        return extend.apply(null, [{}].concat(roles.reverse()));
    };

    kendo.init = function(element) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[86969:87191]", functionData => eval(functionData))};

    kendo.destroy = function(element) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[87232:87464]", functionData => eval(functionData))};

    kendo.resize = function(element) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[87504:88027]", functionData => eval(functionData))};

    kendo.parseOptions = parseOptions;

    extend(kendo.ui, {
        Widget: Widget,
        roles: {},
        progress: function(container, toggle) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[88182:89314]", functionData => eval(functionData))},
        plugin: function(widget, register, prefix) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[89367:91100]", functionData => eval(functionData))}
    });

    var ContainerNullObject = { bind: function () {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[91160:91176]", functionData => eval(functionData))} };

    var MobileWidget = Widget.extend({
        init: function(element, options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[91261:91458]", functionData => eval(functionData))},

        destroy: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[91489:91583]", functionData => eval(functionData))},

        options: {
            prefix: "Mobile"
        },

        events: [],

        view: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[91692:91881]", functionData => eval(functionData))},

        container: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[91914:92115]", functionData => eval(functionData))}
    });

    extend(kendo.mobile, {
        init: function(element) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[92184:92273]", functionData => eval(functionData))},

        ui: {
            Widget: MobileWidget,
            roles: {},
            plugin: function(widget) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[92384:92467]", functionData => eval(functionData))}
        }
    });

    kendo.touchScroller = function(elements, options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[92541:92990]", functionData => eval(functionData))};

    kendo.preventDefault = function(e) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[93032:93067]", functionData => eval(functionData))};

    kendo.widgetInstance = function(element, suite) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[93122:93704]", functionData => eval(functionData))};

    kendo.onResize = function(callback) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[93747:93973]", functionData => eval(functionData))};

    kendo.unbindResize = function(callback) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[94020:94076]", functionData => eval(functionData))};

    kendo.attrValue = function(element, key) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[94124:94176]", functionData => eval(functionData))};

    kendo.days = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6
    };

    function focusable(element, isTabIndexNotNaN) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[94396:94735]", functionData => eval(functionData))}

    function visible(element) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[94767:94949]", functionData => eval(functionData))}

    $.extend($.expr[ ":" ], {
        kendoFocusable: function(element) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[95023:95149]", functionData => eval(functionData))}
    });

    var MOUSE_EVENTS = ["mousedown", "mousemove", "mouseenter", "mouseleave", "mouseover", "mouseout", "mouseup", "click"];
    var EXCLUDE_BUST_CLICK_SELECTOR = "label, input, [data-rel=external]";

    var MouseEventNormalizer = {
        setupMouseMute: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[95427:96474]", functionData => eval(functionData))},

        muteMouse: function(e) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[96508:96745]", functionData => eval(functionData))},

        unMuteMouse: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[96780:97072]", functionData => eval(functionData))}
    };

    var eventMap = {
        down: "touchstart mousedown",
        move: "mousemove touchmove",
        up: "mouseup touchend touchcancel",
        cancel: "mouseleave touchcancel"
    };

    if (support.touch && (support.mobileOS.ios || support.mobileOS.android)) {
        eventMap = {
            down: "touchstart",
            move: "touchmove",
            up: "touchend touchcancel",
            cancel: "touchcancel"
        };
    } else if (support.pointers) {
        eventMap = {
            down: "pointerdown",
            move: "pointermove",
            up: "pointerup",
            cancel: "pointercancel pointerleave"
        };
    } else if (support.msPointers) {
        eventMap = {
            down: "MSPointerDown",
            move: "MSPointerMove",
            up: "MSPointerUp",
            cancel: "MSPointerCancel MSPointerLeave"
        };
    }

    if (support.msPointers && !("onmspointerenter" in window)) { // IE10
        // Create MSPointerEnter/MSPointerLeave events using mouseover/out and event-time checks
        $.each({
            MSPointerEnter: "MSPointerOver",
            MSPointerLeave: "MSPointerOut"
        }, function( orig, fix ) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[98267:99145]", functionData => eval(functionData))});
    }


    var getEventMap = function(e) { return (eventMap[e] || e); },
        eventRegEx = /([^ ]+)/g;

    kendo.applyEventMap = function(events, ns) {
        events = events.replace(eventRegEx, getEventMap);

        if (ns) {
            events = events.replace(eventRegEx, "$1." + ns);
        }

        return events;
    };

    var on = $.fn.on;

    function kendoJQuery(selector, context) {
        return new kendoJQuery.fn.init(selector, context);
    }

    extend(true, kendoJQuery, $);

    kendoJQuery.fn = kendoJQuery.prototype = new $();

    kendoJQuery.fn.constructor = kendoJQuery;

    kendoJQuery.fn.init = function(selector, context) {
        if (context && context instanceof $ && !(context instanceof kendoJQuery)) {
            context = kendoJQuery(context);
        }

        return $.fn.init.call(this, selector, context, rootjQuery);
    };

    kendoJQuery.fn.init.prototype = kendoJQuery.fn;

    var rootjQuery = kendoJQuery(document);

    extend(kendoJQuery.fn, {
        handler: function(handler) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[100190:100269]", functionData => eval(functionData))},

        autoApplyNS: function(ns) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[100306:100396]", functionData => eval(functionData))},

        on: function() {
            var that = this,
                ns = that.data("kendoNS");

            // support for event map signature
            if (arguments.length === 1) {
                return on.call(that, arguments[0]);
            }

            var context = that,
                args = slice.call(arguments);

            if (typeof args[args.length -1] === UNDEFINED) {
                args.pop();
            }

            var callback =  args[args.length - 1],
                events = kendo.applyEventMap(args[0], ns);

            // setup mouse trap
            if (support.mouseAndTouchPresent && events.search(/mouse|click/) > -1 && this[0] !== document.documentElement) {
                MouseEventNormalizer.setupMouseMute();

                var selector = args.length === 2 ? null : args[1],
                    bustClick = events.indexOf("click") > -1 && events.indexOf("touchend") > -1;

                on.call(this,
                    {
                        touchstart: MouseEventNormalizer.muteMouse,
                        touchend: MouseEventNormalizer.unMuteMouse
                    },
                    selector,
                    {
                        bustClick: bustClick
                    });
            }

            if (typeof callback === STRING) {
                context = that.data("handler");
                callback = context[callback];

                args[args.length - 1] = function(e) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[101864:101930]", functionData => eval(functionData))};
            }

            args[0] = events;

            on.apply(that, args);

            return that;
        },

        kendoDestroy: function(ns) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[102085:102240]", functionData => eval(functionData))}
    });

    kendo.jQuery = kendoJQuery;
    kendo.eventMap = eventMap;

    kendo.timezone = (function(){
        var months =  { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
        var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

        function ruleToDate(year, rule) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[102592:103861]", functionData => eval(functionData))}

        function findRule(utcTime, rules, zone) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[103911:104995]", functionData => eval(functionData))}

        function findZone(utcTime, zones, timezone) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[105049:105816]", functionData => eval(functionData))}

        function zoneAndRule(utcTime, zones, rules, timezone) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[105880:106359]", functionData => eval(functionData))}

        function offset(utcTime, timezone) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[106404:106724]", functionData => eval(functionData))}

        function abbr(utcTime, timezone) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[106767:107241]", functionData => eval(functionData))}

        function convert(date, fromOffset, toOffset) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[107296:107834]", functionData => eval(functionData))}

        function apply(date, timezone) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[107875:107960]", functionData => eval(functionData))}

        function remove(date, timezone) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[108002:108087]", functionData => eval(functionData))}

        function toLocalDate(time) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[108124:108193]", functionData => eval(functionData))}

        return {
           zones: {},
           rules: {},
           offset: offset,
           convert: convert,
           apply: apply,
           remove: remove,
           abbr: abbr,
           toLocalDate: toLocalDate
        };
    })();

    kendo.date = (function(){
        var MS_PER_MINUTE = 60000,
            MS_PER_DAY = 86400000;

        function adjustDST(date, hours) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[108586:108776]", functionData => eval(functionData))}

        function setDayOfWeek(date, day, dir) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[108824:109049]", functionData => eval(functionData))}

        function dayOfWeek(date, day, dir) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[109094:109207]", functionData => eval(functionData))}

        function firstDayOfMonth(date) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[109248:109390]", functionData => eval(functionData))}

        function lastDayOfMonth(date) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[109430:109798]", functionData => eval(functionData))}

        function getDate(date) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[109831:109990]", functionData => eval(functionData))}

        function toUtcTime(date) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[110025:110245]", functionData => eval(functionData))}

        function getMilliseconds(date) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[110286:110348]", functionData => eval(functionData))}

        function isInTimeRange(value, min, max) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[110398:110973]", functionData => eval(functionData))}

        function isInDateRange(value, min, max) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[111023:111321]", functionData => eval(functionData))}

        function addDays(date, offset) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[111362:111563]", functionData => eval(functionData))}

        function setTime(date, milliseconds, ignoreDST) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[111621:111953]", functionData => eval(functionData))}

        function today() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[111980:112031]", functionData => eval(functionData))}

        function isToday(date) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[112064:112139]", functionData => eval(functionData))}

        function toInvariantTime(date) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[112180:112438]", functionData => eval(functionData))}

        return {
            adjustDST: adjustDST,
            dayOfWeek: dayOfWeek,
            setDayOfWeek: setDayOfWeek,
            getDate: getDate,
            isInDateRange: isInDateRange,
            isInTimeRange: isInTimeRange,
            isToday: isToday,
            nextDay: function(date) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[112745:112801]", functionData => eval(functionData))},
            previousDay: function(date) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[112843:112900]", functionData => eval(functionData))},
            toUtcTime: toUtcTime,
            MS_PER_DAY: MS_PER_DAY,
            MS_PER_MINUTE: MS_PER_MINUTE,
            setTime: setTime,
            addDays: addDays,
            today: today,
            toInvariantTime: toInvariantTime,
            firstDayOfMonth: firstDayOfMonth,
            lastDayOfMonth: lastDayOfMonth,
            getMilliseconds: getMilliseconds
            //TODO methods: combine date portion and time portion from arguments - date1, date 2
        };
    })();


    kendo.stripWhitespace = function(element) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[113447:113919]", functionData => eval(functionData))};

    var animationFrame  = window.requestAnimationFrame       ||
                          window.webkitRequestAnimationFrame ||
                          window.mozRequestAnimationFrame    ||
                          window.oRequestAnimationFrame      ||
                          window.msRequestAnimationFrame     ||
                          function(callback){lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[114286:114322]", functionData => eval(functionData))};

    kendo.animationFrame = function(callback) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[114371:114425]", functionData => eval(functionData))};

    var animationQueue = [];

    kendo.queueAnimation = function(callback) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[114504:114660]", functionData => eval(functionData))};

    kendo.runNextAnimation = function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.core.js[114703:114929]", functionData => eval(functionData))};

    kendo.parseQueryStringParams = function(url) {
        var queryString = url.split('?')[1] || "",
            params = {},
            paramParts = queryString.split(/&|=/),
            length = paramParts.length,
            idx = 0;

        for (; idx < length; idx += 2) {
            if(paramParts[idx] !== "") {
                params[decodeURIComponent(paramParts[idx])] = decodeURIComponent(paramParts[idx + 1]);
            }
        }

        return params;
    };

})(jQuery, eval);

/*global kendo_module:true */
if (typeof kendo_module === "undefined") {
    kendo_module = function(){};
}

kendo_module({
    id: "core",
    name: "Core",
    category: "framework",
    description: "The core of the Kendo framework."
});
