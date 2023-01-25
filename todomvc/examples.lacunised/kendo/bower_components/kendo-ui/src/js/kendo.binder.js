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
    id: "binder",
    name: "MVVM",
    category: "framework",
    description: "Model View ViewModel (MVVM) is a design pattern which helps developers separate the Model (the data) from the View (the UI).",
    depends: [ "core", "data" ]
});

(function ($, undefined) {
    var kendo = window.kendo,
        Observable = kendo.Observable,
        ObservableObject = kendo.data.ObservableObject,
        ObservableArray = kendo.data.ObservableArray,
        toString = {}.toString,
        binders = {},
        splice = Array.prototype.splice,
        Class = kendo.Class,
        innerText,
        proxy = $.proxy,
        VALUE = "value",
        SOURCE = "source",
        EVENTS = "events",
        CHECKED = "checked",
        CHANGE = "change";

    (function() {
        var a = document.createElement("a");
        if (a.innerText !== undefined) {
            innerText = "innerText";
        } else if (a.textContent !== undefined) {
            innerText = "textContent";
        }
    })();

    var Binding = Observable.extend( {
        init: function(parents, path) {
            var that = this;

            Observable.fn.init.call(that);

            that.source = parents[0];
            that.parents = parents;
            that.path = path;
            that.dependencies = {};
            that.dependencies[path] = true;
            that.observable = that.source instanceof Observable;

            that._access = function(e) {
                that.dependencies[e.field] = true;
            };

            if (that.observable) {
                that._change = function(e) {
                    that.change(e);
                };

                that.source.bind(CHANGE, that._change);
            }
        },

        _parents: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[2221:2588]", functionData => eval(functionData))},

        change: function(e) {
            var dependency,
                ch,
                field = e.field,
                that = this;

            if (that.path === "this") {
                that.trigger(CHANGE, e);
            } else {
                for (dependency in that.dependencies) {
                    if (dependency.indexOf(field) === 0) {
                       ch = dependency.charAt(field.length);

                       if (!ch || ch === "." || ch === "[") {
                            that.trigger(CHANGE, e);
                            break;
                       }
                    }
                }
            }
        },

        start: function(source) {
            source.bind("get", this._access);
        },

        stop: function(source) {
            source.unbind("get", this._access);
        },

        get: function() {

            var that = this,
                source = that.source,
                index = 0,
                path = that.path,
                result = source;

            if (!that.observable) {
                return result;
            }

            that.start(that.source);

            result = source.get(path);

            // Traverse the observable hierarchy if the binding is not resolved at the current level.
            while (result === undefined && source) {

                source = that.parents[++index];

                if (source instanceof ObservableObject) {
                    result = source.get(path);
                }
            }

            // second pass try to get the parent from the object hierarchy
            if (result === undefined) {
                source = that.source; //get the initial source

                while (result === undefined && source) {
                    source = source.parent();

                    if (source instanceof ObservableObject) {
                        result = source.get(path);
                    }
                }
            }

            // If the result is a function - invoke it
            if (typeof result === "function") {
                index = path.lastIndexOf(".");

                // If the function is a member of a nested observable object make that nested observable the context (this) of the function
                if (index > 0) {
                    source = source.get(path.substring(0, index));
                }

                // Invoke the function
                that.start(source);

                result = result.call(source, that.source);

                that.stop(source);
            }

            // If the binding is resolved by a parent object
            if (source && source !== that.source) {

                that.currentSource = source; // save parent object

                // Listen for changes in the parent object
                source.unbind(CHANGE, that._change)
                      .bind(CHANGE, that._change);
            }

            that.stop(that.source);

            return result;
        },

        set: function(value) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[5640:5783]", functionData => eval(functionData))},

        destroy: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[5814:5932]", functionData => eval(functionData))}
    });

    var EventBinding = Binding.extend( {
        get: function() {
            var source = this.source,
                path = this.path,
                index = 0,
                handler;

            handler = source.get(path);

            while (!handler && source) {
                source = this.parents[++index];

                if (source instanceof ObservableObject) {
                    handler = source.get(path);
                }
            }

            return proxy(handler, source);
        }
    });

    var TemplateBinding = Binding.extend( {
        init: function(source, path, template) {
            var that = this;

            Binding.fn.init.call(that, source, path);

            that.template = template;
        },

        render: function(value) {
            var html;

            this.start(this.source);

            html = kendo.render(this.template, value);

            this.stop(this.source);

            return html;
        }
    });

    var Binder = Class.extend({
        init: function(element, bindings, options) {
            this.element = element;
            this.bindings = bindings;
            this.options = options;
        },

        bind: function(binding, attribute) {
            var that = this;

            binding = attribute ? binding[attribute] : binding;

            binding.bind(CHANGE, function(e) {
                that.refresh(attribute || e);
            });

            that.refresh(attribute);
        },

        destroy: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[7460:7471]", functionData => eval(functionData))}
    });

    binders.attr = Binder.extend({
        refresh: function(key) {
            this.element.setAttribute(key, this.bindings.attr[key].get());
        }
    });

    binders.style = Binder.extend({
        refresh: function(key) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[7710:7797]", functionData => eval(functionData))}
    });

    binders.enabled = Binder.extend({
        refresh: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[7873:8091]", functionData => eval(functionData))}
    });

    binders.readonly = Binder.extend({
       refresh: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[8167:8385]", functionData => eval(functionData))}
    });

    binders.disabled = Binder.extend({
        refresh: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[8462:8681]", functionData => eval(functionData))}
    });

    binders.events = Binder.extend({
        init: function(element, bindings, options) {
            Binder.fn.init.call(this, element, bindings, options);
            this.handlers = {};
        },

        refresh: function(key) {
            var element = $(this.element),
                binding = this.bindings.events[key],
                handler = this.handlers[key];

            if (handler) {
                element.off(key, handler);
            }

            handler = this.handlers[key] = binding.get();

            element.on(key, binding.source, handler);
        },

        destroy: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[9306:9507]", functionData => eval(functionData))}
    });

    binders.text = Binder.extend({
        refresh: function() {
            var text = this.bindings.text.get();

            if (text == null) {
                text = "";
            }

            this.element[innerText] = text;
        }
    });

    binders.visible = Binder.extend({
        refresh: function() {
            if (this.bindings.visible.get()) {
                this.element.style.display = "";
            } else {
                this.element.style.display = "none";
            }
        }
    });

    binders.invisible = Binder.extend({
        refresh: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[10108:10306]", functionData => eval(functionData))}
    });

    binders.html = Binder.extend({
        refresh: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[10379:10453]", functionData => eval(functionData))}
    });

    binders.value = Binder.extend({
        init: function(element, bindings, options) {
            Binder.fn.init.call(this, element, bindings, options);

            this._change = proxy(this.change, this);
            this.eventName = options.valueUpdate || CHANGE;

            $(this.element).on(this.eventName, this._change);

            this._initChange = false;
        },

        change: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[10874:11463]", functionData => eval(functionData))},

        refresh: function() {
            if (!this._initChange) {
                var value = this.bindings[VALUE].get();

                if (value == null) {
                    value = "";
                }

                var type = this.element.type;

                if (type == "date") {
                    value = kendo.toString(value, "yyyy-MM-dd");
                } else if (type == "datetime-local") {
                    value = kendo.toString(value, "yyyy-MM-ddTHH:mm:ss");
                }

                this.element.value = value;
            }

            this._initChange = false;
        },

        destroy: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[12113:12187]", functionData => eval(functionData))}
    });

    binders.source = Binder.extend({
        init: function(element, bindings, options) {
            Binder.fn.init.call(this, element, bindings, options);

            var source = this.bindings.source.get();

            if (source instanceof kendo.data.DataSource && options.autoBind !== false) {
                source.fetch();
            }
        },

        refresh: function(e) {
            var that = this,
                source = that.bindings.source.get();

            if (source instanceof ObservableArray || source instanceof kendo.data.DataSource) {
                e = e || {};

                if (e.action == "add") {
                    that.add(e.index, e.items);
                } else if (e.action == "remove") {
                    that.remove(e.index, e.items);
                } else if (e.action != "itemchange") {
                    that.render();
                }
            } else {
                that.render();
            }
        },

        container: function() {
            var element = this.element;

            if (element.nodeName.toLowerCase() == "table") {
                if (!element.tBodies[0]) {
                    element.appendChild(document.createElement("tbody"));
                }
                element = element.tBodies[0];
            }

            return element;
        },

        template: function() {
            var options = this.options,
                template = options.template,
                nodeName = this.container().nodeName.toLowerCase();

            if (!template) {
                if (nodeName == "select") {
                    if (options.valueField || options.textField) {
                        template = kendo.format('<option value="#:{0}#">#:{1}#</option>',
                            options.valueField || options.textField, options.textField || options.valueField);
                    } else {
                        template = "<option>#:data#</option>";
                    }
                } else if (nodeName == "tbody") {
                    template = "<tr><td>#:data#</td></tr>";
                } else if (nodeName == "ul" || nodeName == "ol") {
                    template = "<li>#:data#</li>";
                } else {
                    template = "#:data#";
                }

                template = kendo.template(template);
            }

            return template;
        },

        destroy: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[14634:14748]", functionData => eval(functionData))},

        add: function(index, items) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[14787:15531]", functionData => eval(functionData))},

        remove: function(index, items) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[15573:15842]", functionData => eval(functionData))},

        render: function() {
            var source = this.bindings.source.get(),
                parents,
                idx,
                length,
                element = this.container(),
                template = this.template(),
                parent;

            if (source instanceof kendo.data.DataSource) {
                source = source.view();
            }

            if (!(source instanceof ObservableArray) && toString.call(source) !== "[object Array]") {
                if (source.parent) {
                    parent = source.parent;
                }

                source = new ObservableArray([source]);

                if (source.parent) {
                    source.parent = parent;
                }
            }

            if (this.bindings.template) {
                unbindElementChildren(element);

                $(element).html(this.bindings.template.render(source));

                if (element.children.length) {
                    parents = this.bindings.source._parents();

                    for (idx = 0, length = source.length; idx < length; idx++) {
                        bindElement(element.children[idx], source[idx], this.options.roles, [source[idx]].concat(parents));
                    }
                }
            }
            else {
                $(element).html(kendo.render(template, source));
            }
        }
    });

    binders.input = {
        checked: Binder.extend({
            init: function(element, bindings, options) {
                Binder.fn.init.call(this, element, bindings, options);
                this._change = proxy(this.change, this);

                $(this.element).change(this._change);
            },
            change: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[17589:18559]", functionData => eval(functionData))},

            refresh: function() {
                var value = this.bindings[CHECKED].get(),
                    source = value,
                    element = this.element;

                if (element.type == "checkbox") {
                    if (source instanceof ObservableArray) {
                        value = this.element.value;
                        if (source.indexOf(value) >= 0) {
                            value = true;
                        }
                    }

                    element.checked = value === true;
                } else if (element.type == "radio" && value != null) {
                    if (element.value === value.toString()) {
                        element.checked = true;
                    }
                }
            },

            value: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[19368:19615]", functionData => eval(functionData))},
            destroy: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[19649:19723]", functionData => eval(functionData))}
        })
    };

    binders.select = {
        value: Binder.extend({
            init: function(target, bindings, options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[19851:20048]", functionData => eval(functionData))},

            change: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[20082:22017]", functionData => eval(functionData))},
            refresh: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[22051:23434]", functionData => eval(functionData))},
            destroy: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[23468:23542]", functionData => eval(functionData))}
        })
    };

    binders.widget = {
        events : Binder.extend({
            init: function(widget, bindings, options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[23672:23842]", functionData => eval(functionData))},

            refresh: function(key) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[23880:24472]", functionData => eval(functionData))},

            destroy: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[24507:24692]", functionData => eval(functionData))}
        }),

        checked: Binder.extend({
            init: function(widget, bindings, options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[24793:25041]", functionData => eval(functionData))},
            change: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[25074:25147]", functionData => eval(functionData))},

            refresh: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[25182:25271]", functionData => eval(functionData))},

            value: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[25304:25556]", functionData => eval(functionData))},

            destroy: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[25591:25664]", functionData => eval(functionData))}
        }),

        visible: Binder.extend({
            init: function(widget, bindings, options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[25765:25900]", functionData => eval(functionData))},

            refresh: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[25935:26087]", functionData => eval(functionData))}
        }),

        invisible: Binder.extend({
            init: function(widget, bindings, options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[26190:26325]", functionData => eval(functionData))},

            refresh: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[26360:26518]", functionData => eval(functionData))}
        }),

        enabled: Binder.extend({
            init: function(widget, bindings, options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[26619:26754]", functionData => eval(functionData))},

            refresh: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[26789:26933]", functionData => eval(functionData))}
        }),

        disabled: Binder.extend({
            init: function(widget, bindings, options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[27035:27170]", functionData => eval(functionData))},

            refresh: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[27205:27351]", functionData => eval(functionData))}
        }),

        source: Binder.extend({
            init: function(widget, bindings, options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[27451:27815]", functionData => eval(functionData))},

            itemChange: function(e) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[27854:27983]", functionData => eval(functionData))},

            dataBinding: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[28022:28322]", functionData => eval(functionData))},

            _ns: function(ns) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[28355:28622]", functionData => eval(functionData))},

            dataBound: function(e) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[28660:29437]", functionData => eval(functionData))},

            refresh: function(e) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[29473:30480]", functionData => eval(functionData))},

            destroy: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[30515:30762]", functionData => eval(functionData))}
        }),

        value: Binder.extend({
            init: function(widget, bindings, options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[30861:31421]", functionData => eval(functionData))},

            change: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[31455:34033]", functionData => eval(functionData))},

            refresh: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[34068:34966]", functionData => eval(functionData))},

            destroy: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[35001:35074]", functionData => eval(functionData))}
        }),

        multiselect: {
            value: Binder.extend({
                init: function(widget, bindings, options) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[35204:35521]", functionData => eval(functionData))},

                change: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[35559:38616]", functionData => eval(functionData))},

                refresh: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[38655:39716]", functionData => eval(functionData))},

                destroy: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[39755:39836]", functionData => eval(functionData))}

            })
        }
    };

    var BindingTarget = Class.extend( {
        init: function(target, options) {
            this.target = target;
            this.options = options;
            this.toDestroy = [];
        },

        bind: function(bindings) {
            var nodeName = this.target.nodeName.toLowerCase(),
                key,
                hasValue,
                hasSource,
                hasEvents,
                specificBinders = binders[nodeName] || {};

            for (key in bindings) {
                if (key == VALUE) {
                    hasValue = true;
                } else if (key == SOURCE) {
                    hasSource = true;
                } else if (key == EVENTS) {
                    hasEvents = true;
                } else {
                    this.applyBinding(key, bindings, specificBinders);
                }
            }

            if (hasSource) {
                this.applyBinding(SOURCE, bindings, specificBinders);
            }

            if (hasValue) {
                this.applyBinding(VALUE, bindings, specificBinders);
            }

            if (hasEvents) {
                this.applyBinding(EVENTS, bindings, specificBinders);
            }
        },

        applyBinding: function(name, bindings, specificBinders) {
            var binder = specificBinders[name] || binders[name],
                toDestroy = this.toDestroy,
                attribute,
                binding = bindings[name];

            if (binder) {
                binder = new binder(this.target, bindings, this.options);

                toDestroy.push(binder);

                if (binding instanceof Binding) {
                    binder.bind(binding);
                    toDestroy.push(binding);
                } else {
                    for (attribute in binding) {
                        binder.bind(binding, attribute);
                        toDestroy.push(binding[attribute]);
                    }
                }
            } else if (name !== "template") {
                throw new Error("The " + name + " binding is not supported by the " + this.target.nodeName.toLowerCase() + " element");
            }
        },

        destroy: function() {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[42071:42304]", functionData => eval(functionData))}
    });

    var WidgetBindingTarget = BindingTarget.extend( {
        bind: function(bindings) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[42401:43166]", functionData => eval(functionData))},

        applyBinding: function(name, bindings, specificBinder) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[43232:44100]", functionData => eval(functionData))}
    });

    function flattenGroups(data) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[44143:44509]", functionData => eval(functionData))}

    function bindingTargetForRole(element, roles) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[44561:44712]", functionData => eval(functionData))}

    var keyValueRegExp = /[A-Za-z0-9_\-]+:(\{([^}]*)\}|[^,}]+)/g,
        whiteSpaceRegExp = /\s/g;

    function parseBindings(bind) {
        var result = {},
            idx,
            length,
            token,
            colonIndex,
            key,
            value,
            tokens;

        tokens = bind.match(keyValueRegExp);

        for (idx = 0, length = tokens.length; idx < length; idx++) {
            token = tokens[idx];
            colonIndex = token.indexOf(":");

            key = token.substring(0, colonIndex);
            value = token.substring(colonIndex + 1);

            if (value.charAt(0) == "{") {
                value = parseBindings(value);
            }

            result[key] = value;
        }

        return result;
    }

    function createBindings(bindings, source, type) {
        var binding,
            result = {};

        for (binding in bindings) {
            result[binding] = new type(source, bindings[binding]);
        }

        return result;
    }

    function bindElement(element, source, roles, parents) {
        var role = element.getAttribute("data-" + kendo.ns + "role"),
            idx,
            bind = element.getAttribute("data-" + kendo.ns + "bind"),
            children = element.children,
            childrenCopy = [],
            deep = true,
            bindings,
            options = {},
            target;

        parents = parents || [source];

        if (role || bind) {
            unbindElement(element);
        }

        if (role) {
            target = bindingTargetForRole(element, roles);
        }

        if (bind) {
            bind = parseBindings(bind.replace(whiteSpaceRegExp, ""));

            if (!target) {
                options = kendo.parseOptions(element, {textField: "", valueField: "", template: "", valueUpdate: CHANGE, valuePrimitive: false, autoBind: true});
                options.roles = roles;
                target = new BindingTarget(element, options);
            }

            target.source = source;

            bindings = createBindings(bind, parents, Binding);

            if (options.template) {
                bindings.template = new TemplateBinding(parents, "", options.template);
            }

            if (bindings.click) {
                bind.events = bind.events || {};
                bind.events.click = bind.click;
                delete bindings.click;
            }

            if (bindings.source) {
                deep = false;
            }

            if (bind.attr) {
                bindings.attr = createBindings(bind.attr, parents, Binding);
            }

            if (bind.style) {
                bindings.style = createBindings(bind.style, parents, Binding);
            }

            if (bind.events) {
                bindings.events = createBindings(bind.events, parents, EventBinding);
            }

            target.bind(bindings);
        }

        if (target) {
            element.kendoBindingTarget = target;
        }

        if (deep && children) {
            // https://github.com/telerik/kendo/issues/1240 for the weirdness.
            for (idx = 0; idx < children.length; idx++) {
                childrenCopy[idx] = children[idx];
            }

            for (idx = 0; idx < childrenCopy.length; idx++) {
                bindElement(childrenCopy[idx], source, roles, parents);
            }
        }
    }

    function bind(dom, object) {
        var idx,
            length,
            node,
            roles = kendo.rolesFromNamespaces([].slice.call(arguments, 2));

        object = kendo.observable(object);
        dom = $(dom);

        for (idx = 0, length = dom.length; idx < length; idx++) {
            node = dom[idx];
            if (node.nodeType === 1) {
                bindElement(node, object, roles);
            }
        }
    }

    function unbindElement(element) {
        var bindingTarget = element.kendoBindingTarget;

        if (bindingTarget) {
            bindingTarget.destroy();

            if ($.support.deleteExpando) {
                delete element.kendoBindingTarget;
            } else if (element.removeAttribute) {
                element.removeAttribute("kendoBindingTarget");
            } else {
                element.kendoBindingTarget = null;
            }
        }
    }

    function unbindElementTree(element) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[49084:49164]", functionData => eval(functionData))}

    function unbindElementChildren(element) {
        var children = element.children;

        if (children) {
            for (var idx = 0, length = children.length; idx < length; idx++) {
                unbindElementTree(children[idx]);
            }
        }
    }

    function unbind(dom) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[49463:49637]", functionData => eval(functionData))}

    function notify(widget, namespace) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[49678:49882]", functionData => eval(functionData))}

    kendo.unbind = unbind;
    kendo.bind = bind;
    kendo.data.binders = binders;
    kendo.data.Binder = Binder;
    kendo.notify = notify;

    kendo.observable = function(object) {
        if (!(object instanceof ObservableObject)) {
            object = new ObservableObject(object);
        }

        return object;
    };

    kendo.observableHierarchy = function(array) {lacuna_lazy_load("bower_components/kendo-ui/src/js/kendo.binder.js[50264:50864]", functionData => eval(functionData))};

})(window.kendo.jQuery);
