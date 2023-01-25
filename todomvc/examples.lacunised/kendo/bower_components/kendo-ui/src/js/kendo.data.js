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
    id: "data",
    name: "Data source",
    category: "framework",
    description: "Powerful component for using local and remote data.Fully supports CRUD, Sorting, Paging, Filtering, Grouping, and Aggregates.",
    depends: [ "core" ],
    features: [ {
        id: "data-odata",
        name: "OData",
        description: "Support for accessing Open Data Protocol (OData) services.",
        depends: [ "data.odata" ]
    }, {
        id: "data-XML",
        name: "XML",
        description: "Support for binding to XML.",
        depends: [ "data.xml" ]
    } ]
});

(function($, undefined) {
    var extend = $.extend,
        proxy = $.proxy,
        isPlainObject = $.isPlainObject,
        isEmptyObject = $.isEmptyObject,
        isArray = $.isArray,
        grep = $.grep,
        ajax = $.ajax,
        map,
        each = $.each,
        noop = $.noop,
        kendo = window.kendo,
        isFunction = kendo.isFunction,
        Observable = kendo.Observable,
        Class = kendo.Class,
        STRING = "string",
        FUNCTION = "function",
        CREATE = "create",
        READ = "read",
        UPDATE = "update",
        DESTROY = "destroy",
        CHANGE = "change",
        SYNC = "sync",
        GET = "get",
        ERROR = "error",
        REQUESTSTART = "requestStart",
        PROGRESS = "progress",
        REQUESTEND = "requestEnd",
        crud = [CREATE, READ, UPDATE, DESTROY],
        identity = function(o) { return o; },
        getter = kendo.getter,
        stringify = kendo.stringify,
        math = Math,
        push = [].push,
        join = [].join,
        pop = [].pop,
        splice = [].splice,
        shift = [].shift,
        slice = [].slice,
        unshift = [].unshift,
        toString = {}.toString,
        stableSort = kendo.support.stableSort,
        dateRegExp = /^\/Date\((.*?)\)\/$/,
        newLineRegExp = /(\r+|\n+)/g,
        quoteRegExp = /(?=['\\])/g;

    var ObservableArray = Observable.extend({
        init: function(array, type) {
            var that = this;

            that.type = type || ObservableObject;

            Observable.fn.init.call(that);

            that.length = array.length;

            that.wrapAll(array, that);
        },

        toJSON: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[2716:3083]", functionData => eval(functionData))},

        parent: noop,

        wrapAll: function(source, target) {
            var that = this,
                idx,
                length,
                parent = function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[3263:3315]", functionData => eval(functionData))};

            target = target || [];

            for (idx = 0, length = source.length; idx < length; idx++) {
                target[idx] = that.wrap(source[idx], parent);
            }

            return target;
        },

        wrap: function(object, parent) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[3582:4489]", functionData => eval(functionData))},

        push: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[4517:4855]", functionData => eval(functionData))},

        slice: slice,

        join: join,

        pop: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[4926:5241]", functionData => eval(functionData))},

        splice: function(index, howMany, item) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[5291:6114]", functionData => eval(functionData))},

        shift: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[6143:6451]", functionData => eval(functionData))},

        unshift: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[6482:6782]", functionData => eval(functionData))},

        indexOf: function(item) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[6817:7103]", functionData => eval(functionData))},

        forEach: function(callback) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[7142:7321]", functionData => eval(functionData))},

        map: function(callback) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[7356:7606]", functionData => eval(functionData))},

        filter: function(callback) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[7644:8005]", functionData => eval(functionData))},

        find: function(callback) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[8041:8328]", functionData => eval(functionData))},

        every: function(callback) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[8365:8680]", functionData => eval(functionData))},

        some: function(callback) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[8716:9030]", functionData => eval(functionData))},

        // non-standard collection methods
        remove: function(item) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[9107:9166]", functionData => eval(functionData))},

        empty: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[9195:9247]", functionData => eval(functionData))}
    });

    function eventHandler(context, type, field, prefix) {
        return function(e) {
            var event = {}, key;

            for (key in e) {
                event[key] = e[key];
            }

            if (prefix) {
                event.field = field + "." + e.field;
            } else {
                event.field = field;
            }

            if (type == CHANGE && context._notifyChange) {
                context._notifyChange(event);
            }

            context.trigger(type, event);
        };
    }

    var ObservableObject = Observable.extend({
        init: function(value) {
            var that = this,
                member,
                field,
                parent = function() {
                    return that;
                };

            Observable.fn.init.call(this);

            for (field in value) {
                member = value[field];

                if (field.charAt(0) != "_") {
                    member = that.wrap(member, field, parent);
                }

                that[field] = member;
            }

            that.uid = kendo.guid();
        },

        shouldSerialize: function(field) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[10427:10562]", functionData => eval(functionData))},

        forEach: function(f) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[10594:10753]", functionData => eval(functionData))},

        toJSON: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[10783:11236]", functionData => eval(functionData))},

        get: function(field) {
            var that = this, result;

            that.trigger(GET, { field: field });

            if (field === "this") {
                result = that;
            } else {
                result = kendo.getter(field, true)(that);
            }

            return result;
        },

        _set: function(field, value) {
            var that = this;
            var composite = field.indexOf(".") >= 0;

            if (composite) {
                var paths = field.split("."),
                    path = "";

                while (paths.length > 1) {
                    path += paths.shift();
                    var obj = kendo.getter(path, true)(that);
                    if (obj instanceof ObservableObject) {
                        obj.set(paths.join("."), value);
                        return composite;
                    }
                    path += ".";
                }
            }

            kendo.setter(field)(that, value);

            return composite;
        },

        set: function(field, value) {
            var that = this,
                current = kendo.getter(field, true)(that);

            if (current !== value) {

                if (!that.trigger("set", { field: field, value: value })) {
                    if (!that._set(field, that.wrap(value, field, function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[12588:12604]", functionData => eval(functionData))})) || field.indexOf("(") >= 0 || field.indexOf("[") >= 0) {
                        that.trigger(CHANGE, { field: field });
                    }
                }
            }
        },

        parent: noop,

        wrap: function(object, field, parent) {
            var that = this,
                type = toString.call(object);

            if (object != null && (type === "[object Object]" || type === "[object Array]")) {
                var isObservableArray = object instanceof ObservableArray;
                var isDataSource = object instanceof DataSource;

                if (type === "[object Object]" && !isDataSource && !isObservableArray) {
                    if (!(object instanceof ObservableObject)) {
                        object = new ObservableObject(object);
                    }

                    if (object.parent() != parent()) {
                        object.bind(GET, eventHandler(that, GET, field, true));
                        object.bind(CHANGE, eventHandler(that, CHANGE, field, true));
                    }
                } else if (type === "[object Array]" || isObservableArray || isDataSource) {
                    if (!isObservableArray && !isDataSource) {
                        object = new ObservableArray(object);
                    }

                    if (object.parent() != parent()) {
                        object.bind(CHANGE, eventHandler(that, CHANGE, field, false));
                    }
                }

                object.parent = parent;
            }

            return object;
        }
    });

    function equal(x, y) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[14210:14734]", functionData => eval(functionData))}

    var parsers = {
        "number": function(value) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[14790:14845]", functionData => eval(functionData))},

        "date": function(value) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[14880:14934]", functionData => eval(functionData))},

        "boolean": function(value) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[14972:15147]", functionData => eval(functionData))},

        "string": function(value) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[15184:15252]", functionData => eval(functionData))},

        "default": function(value) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[15290:15327]", functionData => eval(functionData))}
    };

    var defaultValues = {
        "string": "",
        "number": 0,
        "date": new Date(),
        "boolean": false,
        "default": ""
    };

    function getFieldByName(obj, name) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[15528:15872]", functionData => eval(functionData))}

    var Model = ObservableObject.extend({
        init: function(data) {
            var that = this;

            if (!data || $.isEmptyObject(data)) {
                data = $.extend({}, that.defaults, data);
            }

            ObservableObject.fn.init.call(that, data);

            that.dirty = false;

            if (that.idField) {
                that.id = that.get(that.idField);

                if (that.id === undefined) {
                    that.id = that._defaultId;
                }
            }
        },

        shouldSerialize: function(field) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[16449:16646]", functionData => eval(functionData))},

        _parse: function(field, value) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[16688:17218]", functionData => eval(functionData))},

        _notifyChange: function(e) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[17256:17409]", functionData => eval(functionData))},

        editable: function(field) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[17446:17565]", functionData => eval(functionData))},

        set: function(field, value, initiator) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[17615:17954]", functionData => eval(functionData))},

        accept: function(data) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[17988:18499]", functionData => eval(functionData))},

        isNew: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[18528:18587]", functionData => eval(functionData))}
    });

    Model.define = function(base, options) {
        if (options === undefined) {
            options = base;
            base = Model;
        }

        var model,
            proto = extend({ defaults: {} }, options),
            name,
            field,
            type,
            value,
            idx,
            length,
            fields = {},
            originalName,
            id = proto.id;

        if (id) {
            proto.idField = id;
        }

        if (proto.id) {
            delete proto.id;
        }

        if (id) {
            proto.defaults[id] = proto._defaultId = "";
        }

        if (toString.call(proto.fields) === "[object Array]") {
            for (idx = 0, length = proto.fields.length; idx < length; idx++) {
                field = proto.fields[idx];
                if (typeof field === STRING) {
                    fields[field] = {};
                } else if (field.field) {
                    fields[field.field] = field;
                }
            }
            proto.fields = fields;
        }

        for (name in proto.fields) {
            field = proto.fields[name];
            type = field.type || "default";
            value = null;
            originalName = name;

            name = typeof (field.field) === STRING ? field.field : name;

            if (!field.nullable) {
                value = proto.defaults[originalName !== name ? originalName : name] = field.defaultValue !== undefined ? field.defaultValue : defaultValues[type.toLowerCase()];
            }

            if (options.id === name) {
                proto._defaultId = value;
            }

            proto.defaults[originalName !== name ? originalName : name] = value;

            field.parse = field.parse || parsers[type];
        }

        model = base.extend(proto);
        model.define = function(options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[20464:20524]", functionData => eval(functionData))};

        if (proto.fields) {
            model.fields = proto.fields;
            model.idField = proto.idField;
        }

        return model;
    };

    var Comparer = {
        selector: function(field) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[20735:20808]", functionData => eval(functionData))},

        compare: function(field) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[20844:21441]", functionData => eval(functionData))},

        create: function(sort) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[21475:21743]", functionData => eval(functionData))},

        combine: function(comparers) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[21783:22140]", functionData => eval(functionData))}
    };

    var StableComparer = extend({}, Comparer, {
        asc: function(field) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[22226:23072]", functionData => eval(functionData))},

        desc: function(field) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[23105:23951]", functionData => eval(functionData))},
        create: function(sort) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[23984:24041]", functionData => eval(functionData))}
    });

    map = function (array, callback) {
        var idx, length = array.length, result = new Array(length);

        for (idx = 0; idx < length; idx++) {
            result[idx] = callback(array[idx], idx, array);
        }

        return result;
    };

    var operators = (function(){

        function quote(value) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[24370:24461]", functionData => eval(functionData))}

        function operator(op, a, b, ignore) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[24507:25305]", functionData => eval(functionData))}

        return {
            eq: function(a, b, ignore) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[25363:25431]", functionData => eval(functionData))},
            neq: function(a, b, ignore) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[25473:25541]", functionData => eval(functionData))},
            gt: function(a, b, ignore) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[25582:25649]", functionData => eval(functionData))},
            gte: function(a, b, ignore) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[25691:25759]", functionData => eval(functionData))},
            lt: function(a, b, ignore) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[25800:25867]", functionData => eval(functionData))},
            lte: function(a, b, ignore) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[25909:25977]", functionData => eval(functionData))},
            startswith: function(a, b, ignore) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[26026:26387]", functionData => eval(functionData))},
            endswith: function(a, b, ignore) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[26434:26833]", functionData => eval(functionData))},
            contains: function(a, b, ignore) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[26880:27234]", functionData => eval(functionData))},
            doesnotcontain: function(a, b, ignore) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[27287:27642]", functionData => eval(functionData))}
        };
    })();

    function Query(data) {
        this.data = data || [];
    }

    Query.filterExpr = function(expression) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[27775:29930]", functionData => eval(functionData))};

    function normalizeSort(field, dir) {
        if (field) {
            var descriptor = typeof field === STRING ? { field: field, dir: dir } : field,
            descriptors = isArray(descriptor) ? descriptor : (descriptor !== undefined ? [descriptor] : []);

            return grep(descriptors, function(d) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[30245:30264]", functionData => eval(functionData))});
        }
    }

    var operatorMap = {
        "==": "eq",
        equals: "eq",
        isequalto: "eq",
        equalto: "eq",
        equal: "eq",
        "!=": "neq",
        ne: "neq",
        notequals: "neq",
        isnotequalto: "neq",
        notequalto: "neq",
        notequal: "neq",
        "<": "lt",
        islessthan: "lt",
        lessthan: "lt",
        less: "lt",
        "<=": "lte",
        le: "lte",
        islessthanorequalto: "lte",
        lessthanequal: "lte",
        ">": "gt",
        isgreaterthan: "gt",
        greaterthan: "gt",
        greater: "gt",
        ">=": "gte",
        isgreaterthanorequalto: "gte",
        greaterthanequal: "gte",
        ge: "gte",
        notsubstringof: "doesnotcontain"
    };

    function normalizeOperator(expression) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[31063:31592]", functionData => eval(functionData))}

    function normalizeFilter(expression) {
        if (expression && !isEmptyObject(expression)) {
            if (isArray(expression) || !expression.filters) {
                expression = {
                    logic: "and",
                    filters: isArray(expression) ? expression : [expression]
                };
            }

            normalizeOperator(expression);

            return expression;
        }
    }

    Query.normalizeFilter = normalizeFilter;

    function normalizeAggregate(expressions) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[32114:32188]", functionData => eval(functionData))}

    function normalizeGroup(field, dir) {
        var descriptor = typeof field === STRING ? { field: field, dir: dir } : field,
        descriptors = isArray(descriptor) ? descriptor : (descriptor !== undefined ? [descriptor] : []);

        return map(descriptors, function(d) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[32469:32546]", functionData => eval(functionData))});
    }

    Query.prototype = {
        toArray: function () {
            return this.data;
        },
        range: function(index, count) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[32690:32770]", functionData => eval(functionData))},
        skip: function (count) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[32803:32868]", functionData => eval(functionData))},
        take: function (count) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[32901:32969]", functionData => eval(functionData))},
        select: function (selector) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[33007:33074]", functionData => eval(functionData))},
        order: function(selector, dir) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[33115:33464]", functionData => eval(functionData))},
        orderBy: function(selector) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[33502:33561]", functionData => eval(functionData))},
        orderByDescending: function(selector) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[33609:33669]", functionData => eval(functionData))},
        sort: function(field, dir, comparer) {
            var idx,
            length,
            descriptors = normalizeSort(field, dir),
            comparers = [];

            comparer = comparer || Comparer;

            if (descriptors.length) {
                for (idx = 0, length = descriptors.length; idx < length; idx++) {
                    comparers.push(comparer.create(descriptors[idx]));
                }

                return this.orderBy({ compare: comparer.combine(comparers) });
            }

            return this;
        },

        filter: function(expressions) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[34266:35351]", functionData => eval(functionData))},

        group: function(descriptors, allData) {
            descriptors =  normalizeGroup(descriptors || []);
            allData = allData || this.data;

            var that = this,
            result = new Query(that.data),
            descriptor;

            if (descriptors.length > 0) {
                descriptor = descriptors[0];
                result = result.groupBy(descriptor).select(function(group) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[35768:36352]", functionData => eval(functionData))});
            }
            return result;
        },

        groupBy: function(descriptor) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[36446:37679]", functionData => eval(functionData))},

        _sortForGrouping: function(field, dir) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[37729:38298]", functionData => eval(functionData))},

        aggregate: function (aggregates) {
            var idx,
            len,
            result = {};

            if (aggregates && aggregates.length) {
                for(idx = 0, len = this.data.length; idx < len; idx++) {
                    calculateAggregate(result, aggregates, this.data[idx], idx, len);
                }
            }
            return result;
        }
    };

    function groupValueComparer(a, b) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[38733:38870]", functionData => eval(functionData))}

    function calculateAggregate(accumulator, aggregates, item, index, length) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[38950:39473]", functionData => eval(functionData))}

    var functions = {
        sum: function(accumulator, item, accessor) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[39548:39619]", functionData => eval(functionData))},
        count: function(accumulator) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[39658:39712]", functionData => eval(functionData))},
        average: function(accumulator, item, accessor, index, length) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[39784:39998]", functionData => eval(functionData))},
        max: function(accumulator, item, accessor) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[40051:40273]", functionData => eval(functionData))},
        min: function(accumulator, item, accessor) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[40326:40616]", functionData => eval(functionData))}
    };

    function isNumber(val) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[40652:40714]", functionData => eval(functionData))}

    function toJSON(array) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[40743:40945]", functionData => eval(functionData))}

    Query.process = function(data, options) {
        options = options || {};

        var query = new Query(data),
            group = options.group,
            sort = normalizeGroup(group || []).concat(normalizeSort(options.sort || [])),
            total,
            filter = options.filter,
            skip = options.skip,
            take = options.take;

        if (filter) {
            query = query.filter(filter);
            total = query.toArray().length;
        }

        if (sort) {
            query = query.sort(sort);

            if (group) {
                data = query.toArray();
            }
        }

        if (skip !== undefined && take !== undefined) {
            query = query.range(skip, take);
        }

        if (group) {
            query = query.group(group, data);
        }

        return {
            total: total,
            data: query.toArray()
        };
    };

    function calculateAggregates(data, options) {
        options = options || {};

        var query = new Query(data),
            aggregates = options.aggregate,
            filter = options.filter;

        if(filter) {
            query = query.filter(filter);
        }

        return query.aggregate(aggregates);
    }

    var LocalTransport = Class.extend({
        init: function(options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[42266:42315]", functionData => eval(functionData))},

        read: function(options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[42350:42401]", functionData => eval(functionData))},
        update: function(options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[42437:42491]", functionData => eval(functionData))},
        create: function(options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[42527:42581]", functionData => eval(functionData))},
        destroy: function(options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[42618:42672]", functionData => eval(functionData))}
    });

    var RemoteTransport = Class.extend( {
        init: function(options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[42756:43925]", functionData => eval(functionData))},

        options: {
            parameterMap: identity
        },

        create: function(options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[44028:44093]", functionData => eval(functionData))},

        read: function(options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[44128:44770]", functionData => eval(functionData))},

        update: function(options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[44807:44872]", functionData => eval(functionData))},

        destroy: function(options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[44910:44976]", functionData => eval(functionData))},

        setup: function(options, type) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[45018:45602]", functionData => eval(functionData))}
    });

    var Cache = Class.extend({
        init: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[45668:45709]", functionData => eval(functionData))},
        add: function(key, data) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[45744:45857]", functionData => eval(functionData))},
        find: function(key) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[45887:45946]", functionData => eval(functionData))},
        clear: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[45974:46015]", functionData => eval(functionData))},
        remove: function(key) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[46047:46106]", functionData => eval(functionData))}
    });

    Cache.create = function(options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[46153:46466]", functionData => eval(functionData))};

    function serializeRecords(data, getters, modelInstance, originalFieldNames, fieldNames) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[46561:47077]", functionData => eval(functionData))}

    function convertRecords(data, getters, modelInstance, originalFieldNames, fieldNames) {
        var record,
            getter,
            originalName,
            idx,
            length;

        for (idx = 0, length = data.length; idx < length; idx++) {
            record = data[idx];
            for (getter in getters) {
                record[getter] = modelInstance._parse(getter, getters[getter](record));

                originalName = fieldNames[getter];
                if (originalName && originalName !== getter) {
                    delete record[originalName];
                }
            }
        }
    }

    function convertGroup(data, getters, modelInstance, originalFieldNames, fieldNames) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[47801:48526]", functionData => eval(functionData))}

    function wrapDataAccess(originalFunction, model, converter, getters, originalFieldNames, fieldNames) {
        return function(data) {
            data = originalFunction(data);

            if (data && !isEmptyObject(getters)) {
                if (toString.call(data) !== "[object Array]" && !(data instanceof ObservableArray)) {
                    data = [data];
                }

                converter(data, getters, new model(), originalFieldNames, fieldNames);
            }

            return data || [];
        };
    }

    var DataReader = Class.extend({
        init: function(schema) {
            var that = this, member, get, model, base;

            schema = schema || {};

            for (member in schema) {
                get = schema[member];

                that[member] = typeof get === STRING ? getter(get) : get;
            }

            base = schema.modelBase || Model;

            if (isPlainObject(that.model)) {
                that.model = model = base.define(that.model);
            }

            if (that.model) {
                var dataFunction = proxy(that.data, that),
                    groupsFunction = proxy(that.groups, that),
                    serializeFunction = proxy(that.serialize, that),
                    originalFieldNames = {},
                    getters = {},
                    serializeGetters = {},
                    fieldNames = {},
                    shouldSerialize = false,
                    fieldName;

                model = that.model;

                if (model.fields) {
                    each(model.fields, function(field, value) {
                        var fromName;

                        fieldName = field;

                        if (isPlainObject(value) && value.field) {
                            fieldName = value.field;
                        } else if (typeof value === STRING) {
                            fieldName = value;
                        }

                        if (isPlainObject(value) && value.from) {
                            fromName = value.from;
                        }

                        shouldSerialize = shouldSerialize || (fromName && fromName !== field) || fieldName !== field;

                        getters[field] = getter(fromName || fieldName);
                        serializeGetters[field] = getter(field);
                        originalFieldNames[fromName || fieldName] = field;
                        fieldNames[field] = fromName || fieldName;
                    });

                    if (!schema.serialize && shouldSerialize) {
                        that.serialize = wrapDataAccess(serializeFunction, model, serializeRecords, serializeGetters, originalFieldNames, fieldNames);
                    }
                }

                that.data = wrapDataAccess(dataFunction, model, convertRecords, getters, originalFieldNames, fieldNames);
                that.groups = wrapDataAccess(groupsFunction, model, convertGroup, getters, originalFieldNames, fieldNames);
            }
        },
        errors: function(data) {
            return data ? data.errors : null;
        },
        parse: identity,
        data: identity,
        total: function(data) {
            return data.length;
        },
        groups: identity,
        aggregates: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[51862:51896]", functionData => eval(functionData))},
        serialize: function(data) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[51932:51968]", functionData => eval(functionData))}
    });

    function mergeGroups(target, dest, start, count) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[52031:53206]", functionData => eval(functionData))}

    function flattenGroups(data) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[53241:53601]", functionData => eval(functionData))}

    function wrapGroupItems(data, model) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[53644:54153]", functionData => eval(functionData))}

    function eachGroupItems(data, func) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[54195:54561]", functionData => eval(functionData))}

    function removeModel(data, model) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[54601:54873]", functionData => eval(functionData))}

    function wrapInEmptyGroup(groups, model) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[54920:55387]", functionData => eval(functionData))}

    function indexOfPristineModel(data, model) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[55436:55616]", functionData => eval(functionData))}

    function indexOfModel(data, model) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[55657:55826]", functionData => eval(functionData))}

    function indexOf(data, comparer) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[55865:56076]", functionData => eval(functionData))}

    function fieldNameFromModel(fields, name) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[56124:56599]", functionData => eval(functionData))}

    function convertFilterDescriptorsField(descriptor, model) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[56663:57280]", functionData => eval(functionData))}

    function convertDescriptorsField(descriptors, model) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[57339:58018]", functionData => eval(functionData))}

    var DataSource = Observable.extend({
        init: function(options) {
            var that = this, model, data;

            if (options) {
                data = options.data;
            }

            options = that.options = extend({}, that.options, options);

            that._map = {};
            that._prefetch = {};
            that._data = [];
            that._pristineData = [];
            that._ranges = [];
            that._view = [];
            that._pristine = [];
            that._destroyed = [];
            that._pageSize = options.pageSize;
            that._page = options.page  || (options.pageSize ? 1 : undefined);
            that._sort = normalizeSort(options.sort);
            that._filter = normalizeFilter(options.filter);
            that._group = normalizeGroup(options.group);
            that._aggregate = options.aggregate;
            that._total = options.total;

            Observable.fn.init.call(that);

            that.transport = Transport.create(options, data);

            that.reader = new kendo.data.readers[options.schema.type || "json" ](options.schema);

            model = that.reader.model || {};

            that._data = that._observe(that._data);

            that.bind([ERROR, CHANGE, REQUESTSTART, SYNC, REQUESTEND, PROGRESS], options);
        },

        options: {
            data: [],
            schema: {
               modelBase: Model
            },
            serverSorting: false,
            serverPaging: false,
            serverFiltering: false,
            serverGrouping: false,
            serverAggregates: false,
            batch: false
        },

        _isServerGrouped: function() {
            var group = this.group() || [];

            return this.options.serverGrouping && group.length;
        },

        _flatData: function(data) {
            if (this._isServerGrouped()) {
                return flattenGroups(data);
            }
            return data;
        },

        parent: noop,

        get: function(id) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[60044:60303]", functionData => eval(functionData))},

        getByUid: function(id) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[60337:60661]", functionData => eval(functionData))},

        indexOf: function(model) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[60697:60760]", functionData => eval(functionData))},

        at: function(index) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[60791:60840]", functionData => eval(functionData))},

        data: function(value) {
            var that = this;
            if (value !== undefined) {
                that._data = this._observe(value);

                that._ranges = [];
                that._addRange(that._data);

                that._total = that._data.length;

                that._process(that._data);
            } else {
                return that._data;
            }
        },

        view: function() {
            return this._view;
        },

        add: function(model) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[61349:61418]", functionData => eval(functionData))},

        _createNewModel: function(model) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[61462:61627]", functionData => eval(functionData))},

        insert: function(index, model) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[61669:62133]", functionData => eval(functionData))},

        remove: function(model) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[62168:62667]", functionData => eval(functionData))},

        sync: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[62695:63895]", functionData => eval(functionData))},

        cancelChanges: function(model) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[63937:64378]", functionData => eval(functionData))},

        hasChanges: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[64412:64813]", functionData => eval(functionData))},

        _accept: function(result) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[64850:66436]", functionData => eval(functionData))},

        _updatePristineForModel: function(model, values) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[66496:66655]", functionData => eval(functionData))},

        _executeOnPristineForModel: function(model, callback) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[66720:67034]", functionData => eval(functionData))},

        _removePristineForModel: function(model) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[67086:67229]", functionData => eval(functionData))},

        _readData: function(data) {
            var read = !this._isServerGrouped() ? this.reader.data : this.reader.groups;
            return read(data);
        },

        _eachPristineItem: function(callback) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[67446:67515]", functionData => eval(functionData))},

       _eachItem: function(data, callback) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[67561:67803]", functionData => eval(functionData))},

        _pristineForModel: function(model) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[67849:68252]", functionData => eval(functionData))},

        _cancelModel: function(model) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[68293:68761]", functionData => eval(functionData))},

        _promise: function(data, models, type) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[68811:69604]", functionData => eval(functionData))},

        _send: function(method, data) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[69645:70275]", functionData => eval(functionData))},

        read: function(data) {
            var that = this, params = that._params(data);

            that._queueRequest(params, function() {
                if (!that.trigger(REQUESTSTART, { type: "read" })) {
                    that.trigger(PROGRESS);

                    that._ranges = [];
                    that.transport.read({
                        data: params,
                        success: proxy(that.success, that),
                        error: proxy(that.error, that)
                    });
                } else {
                    that._dequeueRequest();
                }
            });
        },

        success: function(data) {
            var that = this,
                options = that.options;

            that.trigger(REQUESTEND, { response: data, type: "read" });

            data = that.reader.parse(data);

            if (that._handleCustomErrors(data)) {
                that._dequeueRequest();
                return;
            }

            that._pristine = isPlainObject(data) ? $.extend(true, {}, data) : data.slice ? data.slice(0) : data;

            that._total = that.reader.total(data);

            if (that._aggregate && options.serverAggregates) {
                that._aggregateResult = that.reader.aggregates(data);
            }

            data = that._readData(data);

            that._pristineData = data.slice(0);

            that._data = that._observe(data);

            that._addRange(that._data);

            that._process(that._data);
            that._dequeueRequest();
        },

        _addRange: function(data) {
            var that = this,
                start = that._skip || 0,
                end = start + that._flatData(data).length;

            that._ranges.push({ start: start, end: end, data: data });
            that._ranges.sort( function(x, y) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[72121:72150]", functionData => eval(functionData))} );
        },

        error: function(xhr, status, errorThrown) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[72216:72395]", functionData => eval(functionData))},

        _params: function(data) {
            var that = this,
                options =  extend({
                    take: that.take(),
                    skip: that.skip(),
                    page: that.page(),
                    pageSize: that.pageSize(),
                    sort: that._sort,
                    filter: that._filter,
                    group: that._group,
                    aggregate: that._aggregate
                }, data);

            if (!that.options.serverPaging) {
                delete options.take;
                delete options.skip;
                delete options.page;
                delete options.pageSize;
            }

            if (!that.options.serverGrouping) {
                delete options.group;
            } else if (that.reader.model && options.group) {
                options.group = convertDescriptorsField(options.group, that.reader.model);
            }

            if (!that.options.serverFiltering) {
                delete options.filter;
            } else if (that.reader.model && options.filter) {
               options.filter = convertFilterDescriptorsField(options.filter, that.reader.model);
            }

            if (!that.options.serverSorting) {
                delete options.sort;
            } else if (that.reader.model && options.sort) {
                options.sort = convertDescriptorsField(options.sort, that.reader.model);
            }

            if (!that.options.serverAggregates) {
                delete options.aggregate;
            } else if (that.reader.model && options.aggregate) {
                options.aggregate = convertDescriptorsField(options.aggregate, that.reader.model);
            }

            return options;
        },

        _queueRequest: function(options, callback) {
            var that = this;
            if (!that._requestInProgress) {
                that._requestInProgress = true;
                that._pending = undefined;
                callback();
            } else {
                that._pending = { callback: proxy(callback, that), options: options };
            }
        },

        _dequeueRequest: function() {
            var that = this;
            that._requestInProgress = false;
            if (that._pending) {
                that._queueRequest(that._pending.options, that._pending.callback);
            }
        },

        _handleCustomErrors: function(response) {
            if (this.reader.errors) {
                var errors = this.reader.errors(response);
                if (errors) {
                    this.trigger(ERROR, { xhr: null, status: "customerror", errorThrown: "custom error", errors: errors });
                    return true;
                }
            }
            return false;
        },
        _observe: function(data) {
            var that = this,
                model = that.reader.model,
                wrap = false;

            if (model && data.length) {
                wrap = !(data[0] instanceof model);
            }

            if (data instanceof ObservableArray) {
                if (wrap) {
                    data.type = that.reader.model;
                    data.wrapAll(data, data);
                }
            } else {
                data = new ObservableArray(data, that.reader.model);
                data.parent = function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[75749:75774]", functionData => eval(functionData))};
            }

            if (that._isServerGrouped()) {
                wrapGroupItems(data, model);
            }

            if (that._changeHandler && that._data && that._data instanceof ObservableArray) {
                that._data.unbind(CHANGE, that._changeHandler);
            } else {
                that._changeHandler = proxy(that._change, that);
            }

            return data.bind(CHANGE, that._changeHandler);
        },

        _change: function(e) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[76253:77359]", functionData => eval(functionData))},

        _process: function (data, e) {
            var that = this,
                options = {},
                result;

            if (that.options.serverPaging !== true) {
                options.skip = that._skip;
                options.take = that._take || that._pageSize;

                if(options.skip === undefined && that._page !== undefined && that._pageSize !== undefined) {
                    options.skip = (that._page - 1) * that._pageSize;
                }
            }

            if (that.options.serverSorting !== true) {
                options.sort = that._sort;
            }

            if (that.options.serverFiltering !== true) {
                options.filter = that._filter;
            }

            if (that.options.serverGrouping !== true) {
                options.group = that._group;
            }

            if (that.options.serverAggregates !== true) {
                options.aggregate = that._aggregate;
                that._aggregateResult = calculateAggregates(data, options);
            }

            result = Query.process(data, options);

            that._view = result.data;

            if (result.total !== undefined && !that.options.serverFiltering) {
                that._total = result.total;
            }

            e = e || {};

            e.items = e.items || that._view;

            that.trigger(CHANGE, e);
        },

        _mergeState: function(options) {
            var that = this;

            if (options !== undefined) {
                that._pageSize = options.pageSize;
                that._page = options.page;
                that._sort = options.sort;
                that._filter = options.filter;
                that._group = options.group;
                that._aggregate = options.aggregate;
                that._skip = options.skip;
                that._take = options.take;

                if(that._skip === undefined) {
                    that._skip = that.skip();
                    options.skip = that.skip();
                }

                if(that._take === undefined && that._pageSize !== undefined) {
                    that._take = that._pageSize;
                    options.take = that._take;
                }

                if (options.sort) {
                    that._sort = options.sort = normalizeSort(options.sort);
                }

                if (options.filter) {
                    that._filter = options.filter = normalizeFilter(options.filter);
                }

                if (options.group) {
                    that._group = options.group = normalizeGroup(options.group);
                }
                if (options.aggregate) {
                    that._aggregate = options.aggregate = normalizeAggregate(options.aggregate);
                }
            }
            return options;
        },

        query: function(options) {
            var that = this,
                result,
                remote = that.options.serverSorting || that.options.serverPaging || that.options.serverFiltering || that.options.serverGrouping || that.options.serverAggregates;

            if (remote || ((that._data === undefined || that._data.length === 0) && !that._destroyed.length)) {
                that.read(that._mergeState(options));
            } else {
                if (!that.trigger(REQUESTSTART, { type: "read" })) {
                    that.trigger(PROGRESS);

                    result = Query.process(that._data, that._mergeState(options));

                    if (!that.options.serverFiltering) {
                        if (result.total !== undefined) {
                            that._total = result.total;
                        } else {
                            that._total = that._data.length;
                        }
                    }

                    that._view = result.data;
                    that._aggregateResult = calculateAggregates(that._data, options);
                    that.trigger(REQUESTEND, { });
                    that.trigger(CHANGE, { items: result.data });
                }
            }
        },

        fetch: function(callback) {
            var that = this;

            return $.Deferred(function(deferred) {
                var success = function(e) {
                    that.unbind(ERROR, error);

                    deferred.resolve();

                    if (callback) {
                        callback.call(that, e);
                    }
                };

                var error = function(e) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[81886:81945]", functionData => eval(functionData))};

                that.one(CHANGE, success);
                that.one(ERROR, error);
                that._query();
            }).promise();
        },

        _query: function(options) {
            var that = this;

            that.query(extend({}, {
                page: that.page(),
                pageSize: that.pageSize(),
                sort: that.sort(),
                filter: that.filter(),
                group: that.group(),
                aggregate: that.aggregate()
            }, options));
        },

        next: function(options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[82505:82928]", functionData => eval(functionData))},

        prev: function(options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[82963:83325]", functionData => eval(functionData))},

        page: function(val) {
            var that = this,
            skip;

            if(val !== undefined) {
                val = math.max(math.min(math.max(val, 1), that.totalPages()), 1);
                that._query({ page: val });
                return;
            }
            skip = that.skip();

            return skip !== undefined ? math.round((skip || 0) / (that.take() || 1)) + 1 : undefined;
        },

        pageSize: function(val) {
            var that = this;

            if(val !== undefined) {
                that._query({ pageSize: val, page: 1 });
                return;
            }

            return that.take();
        },

        sort: function(val) {
            var that = this;

            if(val !== undefined) {
                that._query({ sort: val });
                return;
            }

            return that._sort;
        },

        filter: function(val) {
            var that = this;

            if (val === undefined) {
                return that._filter;
            }

            that._query({ filter: val, page: 1 });
        },

        group: function(val) {
            var that = this;

            if(val !== undefined) {
                that._query({ group: val });
                return;
            }

            return that._group;
        },

        total: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[84680:84742]", functionData => eval(functionData))},

        aggregate: function(val) {
            var that = this;

            if(val !== undefined) {
                that._query({ aggregate: val });
                return;
            }

            return that._aggregate;
        },

        aggregates: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[85013:85066]", functionData => eval(functionData))},

        totalPages: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[85100:85259]", functionData => eval(functionData))},

        inRange: function(skip, take) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[85300:85568]", functionData => eval(functionData))},

        lastRange: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[85601:85731]", functionData => eval(functionData))},

        firstItemUid: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[85767:85901]", functionData => eval(functionData))},

        range: function(skip, take) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[85940:88146]", functionData => eval(functionData))},

        _findRange: function(start, end) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[88190:90763]", functionData => eval(functionData))},

        _mergeGroups: function(data, range, startIndex, endIndex) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[90832:91262]", functionData => eval(functionData))},

        skip: function() {
            var that = this;

            if (that._skip === undefined) {
                return (that._page !== undefined ? (that._page  - 1) * (that.take() || 1) : undefined);
            }
            return that._skip;
        },

        take: function() {
            return this._take || this._pageSize;
        },

        _prefetchSuccessHandler: function (skip, size, callback) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[91680:92854]", functionData => eval(functionData))},

        prefetch: function(skip, take, callback) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[92906:94126]", functionData => eval(functionData))},

        _rangeExists: function(start, end) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[94172:94525]", functionData => eval(functionData))}
    });

    var Transport = {};

    Transport.create = function(options, data) {
        var transport,
            transportOptions = options.transport;

        if (transportOptions) {
            transportOptions.read = typeof transportOptions.read === STRING ? { url: transportOptions.read } : transportOptions.read;

            if (options.type) {
                if (kendo.data.transports[options.type] && !isPlainObject(kendo.data.transports[options.type])) {
                    transport = new kendo.data.transports[options.type](extend(transportOptions, { data: data }));
                } else {
                    transportOptions = extend(true, {}, kendo.data.transports[options.type], transportOptions);
                }

                options.schema = extend(true, {}, kendo.data.schemas[options.type], options.schema);
            }

            if (!transport) {
                transport = isFunction(transportOptions.read) ? transportOptions : new RemoteTransport(transportOptions);
            }
        } else {
            transport = new LocalTransport({ data: options.data });
        }
        return transport;
    };

    DataSource.create = function(options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[95720:96894]", functionData => eval(functionData))};

    function inferSelect(select, fields) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[96938:97755]", functionData => eval(functionData))}

    function inferTable(table, fields) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[97796:98627]", functionData => eval(functionData))}

    var Node = Model.define({
        init: function(value) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[98689:100073]", functionData => eval(functionData))},

        _initChildren: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[100110:101362]", functionData => eval(functionData))},

        append: function(model) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[101397:101511]", functionData => eval(functionData))},

        hasChildren: false,

        level: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[101569:101865]", functionData => eval(functionData))},

        _updateChildrenField: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[101909:102047]", functionData => eval(functionData))},

        load: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[102075:102689]", functionData => eval(functionData))},

        parentNode: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[102723:102809]", functionData => eval(functionData))},

        loaded: function(value) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[102844:103004]", functionData => eval(functionData))},

        shouldSerialize: function(field) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[103048:103308]", functionData => eval(functionData))}
    });

    function dataMethod(name) {
        return function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[103376:103630]", functionData => eval(functionData))};
    }

    var HierarchicalDataSource = DataSource.extend({
        init: function(options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[103724:103982]", functionData => eval(functionData))},

        _attachBubbleHandlers: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[104027:104173]", functionData => eval(functionData))},

        remove: function(node){lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[104206:104664]", functionData => eval(functionData))},

        success: dataMethod("success"),

        data: dataMethod("data"),

        insert: function(index, model) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[104782:105068]", functionData => eval(functionData))},

        _find: function(method, value) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[105110:105794]", functionData => eval(functionData))},

        get: function(id) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[105823:105876]", functionData => eval(functionData))},

        getByUid: function(uid) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[105911:105970]", functionData => eval(functionData))}
    });

    function inferList(list, fields) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[106017:107942]", functionData => eval(functionData))}

    HierarchicalDataSource.create = function(options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[107998:108621]", functionData => eval(functionData))};

    var Buffer = kendo.Observable.extend({
        init: function(dataSource, viewSize, disablePrefetch) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[108729:109133]", functionData => eval(functionData))},

        setViewSize: function(viewSize) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[109176:109258]", functionData => eval(functionData))},

        at: function(index)  {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[109290:111044]", functionData => eval(functionData))},

        indexOf: function(item) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[111079:111165]", functionData => eval(functionData))},

        total: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[111194:111263]", functionData => eval(functionData))},

        next: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[111291:111785]", functionData => eval(functionData))},

        range: function(offset) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[111820:112485]", functionData => eval(functionData))},

        syncDataSource: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[112523:112636]", functionData => eval(functionData))},

        destroy: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[112667:112705]", functionData => eval(functionData))},

        _prefetch: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[112738:113408]", functionData => eval(functionData))},

        _goToRange: function(offset, expanding) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[113459:113688]", functionData => eval(functionData))},

        _change: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[113719:114331]", functionData => eval(functionData))},

        _syncWithDataSource: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[114374:114673]", functionData => eval(functionData))},

        _recalculate: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[114709:115389]", functionData => eval(functionData))}
    });

    var BatchBuffer = kendo.Observable.extend({
        init: function(dataSource, batchSize) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[115493:116669]", functionData => eval(functionData))},

        syncDataSource: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[116707:116760]", functionData => eval(functionData))},

        at: function(index) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[116791:117328]", functionData => eval(functionData))},

        total: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[117357:117400]", functionData => eval(functionData))},

        destroy: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.data.js[117431:117504]", functionData => eval(functionData))}
    });

    extend(true, kendo.data, {
        readers: {
            json: DataReader
        },
        Query: Query,
        DataSource: DataSource,
        HierarchicalDataSource: HierarchicalDataSource,
        Node: Node,
        ObservableObject: ObservableObject,
        ObservableArray: ObservableArray,
        LocalTransport: LocalTransport,
        RemoteTransport: RemoteTransport,
        Cache: Cache,
        DataReader: DataReader,
        Model: Model,
        Buffer: Buffer,
        BatchBuffer: BatchBuffer
    });
})(window.kendo.jQuery);
