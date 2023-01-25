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
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./interfaces.d.ts"/>
var utils_1 = require("./utils");
var TodoModel = (function () {
    function TodoModel(key) {
        this.key = key;
        this.todos = utils_1.Utils.store(key);
        this.onChanges = [];
    }
    TodoModel.prototype.subscribe = function (onChange) {
        this.onChanges.push(onChange);
    };
    TodoModel.prototype.inform = function () {lacuna_lazy_load("js/bundle.js[1021:1136]", functionData => eval(functionData))};
    TodoModel.prototype.addTodo = function (title) {lacuna_lazy_load("js/bundle.js[1189:1365]", functionData => eval(functionData))};
    TodoModel.prototype.toggleAll = function (checked) {lacuna_lazy_load("js/bundle.js[1422:1593]", functionData => eval(functionData))};
    TodoModel.prototype.toggle = function (todoToToggle) {lacuna_lazy_load("js/bundle.js[1652:1894]", functionData => eval(functionData))};
    TodoModel.prototype.destroy = function (todo) {lacuna_lazy_load("js/bundle.js[1946:2089]", functionData => eval(functionData))};
    TodoModel.prototype.save = function (todoToSave, text) {lacuna_lazy_load("js/bundle.js[2150:2343]", functionData => eval(functionData))};
    TodoModel.prototype.clearCompleted = function () {lacuna_lazy_load("js/bundle.js[2398:2533]", functionData => eval(functionData))};
    return TodoModel;
})();
exports.TodoModel = TodoModel;

},{"./utils":6}],2:[function(require,module,exports){
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./interfaces.d.ts"/>
var TodoModel_1 = require("./TodoModel");
var footer_1 = require("./footer");
var todoItem_1 = require("./todoItem");
var constants_1 = require("./constants");
var TodoApp = (function (_super) {
    __extends(TodoApp, _super);
    function TodoApp(props) {
        _super.call(this, props);
        this.state = {
            nowShowing: constants_1.ALL_TODOS,
            editing: null
        };
    }
    TodoApp.prototype.componentDidMount = function () {
        var setState = this.setState;
        var router = Router({
            '/': setState.bind(this, { nowShowing: constants_1.ALL_TODOS }),
            '/active': setState.bind(this, { nowShowing: constants_1.ACTIVE_TODOS }),
            '/completed': setState.bind(this, { nowShowing: constants_1.COMPLETED_TODOS })
        });
        router.init('/');
    };
    TodoApp.prototype.handleNewTodoKeyDown = function (event) {lacuna_lazy_load("js/bundle.js[4011:4345]", functionData => eval(functionData))};
    TodoApp.prototype.toggleAll = function (event) {lacuna_lazy_load("js/bundle.js[4398:4523]", functionData => eval(functionData))};
    TodoApp.prototype.toggle = function (todoToToggle) {lacuna_lazy_load("js/bundle.js[4580:4634]", functionData => eval(functionData))};
    TodoApp.prototype.destroy = function (todo) {lacuna_lazy_load("js/bundle.js[4684:4731]", functionData => eval(functionData))};
    TodoApp.prototype.edit = function (todo) {lacuna_lazy_load("js/bundle.js[4778:4830]", functionData => eval(functionData))};
    TodoApp.prototype.save = function (todoToSave, text) {lacuna_lazy_load("js/bundle.js[4889:4987]", functionData => eval(functionData))};
    TodoApp.prototype.cancel = function () {lacuna_lazy_load("js/bundle.js[5032:5081]", functionData => eval(functionData))};
    TodoApp.prototype.clearCompleted = function () {lacuna_lazy_load("js/bundle.js[5134:5184]", functionData => eval(functionData))};
    TodoApp.prototype.render = function () {
        var _this = this;
        var footer;
        var main;
        var todos = this.props.model.todos;
        var shownTodos = todos.filter(function (todo) {lacuna_lazy_load("js/bundle.js[5393:5706]", functionData => eval(functionData))});
        var todoItems = shownTodos.map(function (todo) {lacuna_lazy_load("js/bundle.js[5764:6137]", functionData => eval(functionData))});
        var activeTodoCount = todos.reduce(function (accum, todo) {lacuna_lazy_load("js/bundle.js[6206:6272]", functionData => eval(functionData))}, 0);
        var completedCount = todos.length - activeTodoCount;
        if (activeTodoCount || completedCount) {
            footer =
                React.createElement(footer_1.TodoFooter, {"count": activeTodoCount, "completedCount": completedCount, "nowShowing": this.state.nowShowing, "onClearCompleted": function (e) {lacuna_lazy_load("js/bundle.js[6597:6631]", functionData => eval(functionData))}});
        }
        if (todos.length) {
            main = (React.createElement("section", {"className": "main"}, React.createElement("input", {"className": "toggle-all", "type": "checkbox", "onChange": function (e) {lacuna_lazy_load("js/bundle.js[6849:6879]", functionData => eval(functionData))}, "checked": activeTodoCount === 0}), React.createElement("ul", {"className": "todo-list"}, todoItems)));
        }
        return (React.createElement("div", null, React.createElement("header", {"className": "header"}, React.createElement("h1", null, "todos"), React.createElement("input", {"ref": "newField", "className": "new-todo", "placeholder": "What needs to be done?", "onKeyDown": function (e) {lacuna_lazy_load("js/bundle.js[7282:7323]", functionData => eval(functionData))}, "autoFocus": true})), main, footer));
    };
    return TodoApp;
})(React.Component);
var model = new TodoModel_1.TodoModel('react-todos');
function render() {
    React.render(React.createElement(TodoApp, {"model": model}), document.getElementsByClassName('todoapp')[0]);
}
model.subscribe(render);
render();

},{"./TodoModel":1,"./constants":3,"./footer":4,"./todoItem":5}],3:[function(require,module,exports){
var ALL_TODOS = 'all';
exports.ALL_TODOS = ALL_TODOS;
var ACTIVE_TODOS = 'active';
exports.ACTIVE_TODOS = ACTIVE_TODOS;
var COMPLETED_TODOS = 'completed';
exports.COMPLETED_TODOS = COMPLETED_TODOS;
var ENTER_KEY = 13;
exports.ENTER_KEY = ENTER_KEY;
var ESCAPE_KEY = 27;
exports.ESCAPE_KEY = ESCAPE_KEY;

},{}],4:[function(require,module,exports){
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./interfaces.d.ts"/>
var constants_1 = require("./constants");
var utils_1 = require("./utils");
var TodoFooter = (function (_super) {
    __extends(TodoFooter, _super);
    function TodoFooter() {lacuna_lazy_load("js/bundle.js[8726:8772]", functionData => eval(functionData))}
    TodoFooter.prototype.render = function () {lacuna_lazy_load("js/bundle.js[8819:9995]", functionData => eval(functionData))};
    return TodoFooter;
})(React.Component);
exports.TodoFooter = TodoFooter;

},{"./constants":3,"./utils":6}],5:[function(require,module,exports){
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./interfaces.d.ts"/>
var constants_1 = require("./constants");
var TodoItem = (function (_super) {
    __extends(TodoItem, _super);
    function TodoItem(props) {lacuna_lazy_load("js/bundle.js[10755:10854]", functionData => eval(functionData))}
    TodoItem.prototype.handleSubmit = function (event) {lacuna_lazy_load("js/bundle.js[10910:11135]", functionData => eval(functionData))};
    TodoItem.prototype.handleEdit = function () {lacuna_lazy_load("js/bundle.js[11185:11281]", functionData => eval(functionData))};
    TodoItem.prototype.handleKeyDown = function (event) {lacuna_lazy_load("js/bundle.js[11339:11624]", functionData => eval(functionData))};
    TodoItem.prototype.handleChange = function (event) {lacuna_lazy_load("js/bundle.js[11681:11772]", functionData => eval(functionData))};
    TodoItem.prototype.shouldComponentUpdate = function (nextProps, nextState) {lacuna_lazy_load("js/bundle.js[11853:12027]", functionData => eval(functionData))};
    TodoItem.prototype.componentDidUpdate = function (prevProps) {lacuna_lazy_load("js/bundle.js[12094:12333]", functionData => eval(functionData))};
    TodoItem.prototype.render = function () {lacuna_lazy_load("js/bundle.js[12379:13273]", functionData => eval(functionData))};
    return TodoItem;
})(React.Component);
exports.TodoItem = TodoItem;

},{"./constants":3}],6:[function(require,module,exports){
var Utils = (function () {
    function Utils() {lacuna_lazy_load("js/bundle.js[13453:13460]", functionData => eval(functionData))}
    Utils.uuid = function () {lacuna_lazy_load("js/bundle.js[13490:13867]", functionData => eval(functionData))};
    Utils.pluralize = function (count, word) {lacuna_lazy_load("js/bundle.js[13914:13969]", functionData => eval(functionData))};
    Utils.store = function (namespace, data) {
        if (data) {
            return localStorage.setItem(namespace, JSON.stringify(data));
        }
        var store = localStorage.getItem(namespace);
        return (store && JSON.parse(store)) || [];
    };
    Utils.extend = function () {lacuna_lazy_load("js/bundle.js[14264:14697]", functionData => eval(functionData))};
    return Utils;
})();
exports.Utils = Utils;

},{}]},{},[2]);
