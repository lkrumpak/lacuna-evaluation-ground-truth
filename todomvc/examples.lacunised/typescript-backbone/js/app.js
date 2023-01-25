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
/* ---------------------------------------------------------------------------------------
Todos.ts
Microsoft grants you the right to use these script files under the Apache 2.0 license.
Microsoft reserves all other rights to the files not expressly granted by Microsoft,
whether by implication, estoppel or otherwise. The copyright notices and MIT licenses
below are for informational purposes only.

Portions Copyright © Microsoft Corporation
Apache 2.0 License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
file except in compliance with the License. You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
ANY KIND, either express or implied.

See the License for the specific language governing permissions and limitations
under the License.
------------------------------------------------------------------------------------------
Provided for Informational Purposes Only
MIT License
Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies
or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
--------------------------------------------------------------------------------------- */
// Todos.js
// https://github.com/documentcloud/backbone/blob/master/examples/todos/todos.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// Todo Model
// ----------
// Our basic **Todo** model has `title`, `order`, and `completed` attributes.
var Todo = (function (_super) {
    __extends(Todo, _super);
    function Todo() {lacuna_lazy_load("js/app.js[2781:2827]", functionData => eval(functionData))}
    // Default attributes for the todo.
    Todo.prototype.defaults = function () {lacuna_lazy_load("js/app.js[2910:2997]", functionData => eval(functionData))};
    // Ensure that each todo created has `title`.
    Todo.prototype.initialize = function () {lacuna_lazy_load("js/app.js[3093:3202]", functionData => eval(functionData))};
    // Toggle the `completed` state of this todo item.
    Todo.prototype.toggle = function () {lacuna_lazy_load("js/app.js[3299:3364]", functionData => eval(functionData))};
    // Remove this Todo from *localStorage* and delete its view.
    Todo.prototype.clear = function () {lacuna_lazy_load("js/app.js[3470:3501]", functionData => eval(functionData))};
    return Todo;
})(Backbone.Model);
// Todo Collection
// ---------------
// The collection of todos is backed by *localStorage* instead of a remote
// server.
var TodoList = (function (_super) {
    __extends(TodoList, _super);
    function TodoList() {
        _super.apply(this, arguments);
        // Reference to this collection's model.
        this.model = Todo;
        // Save all of the todo items under the `'todos'` namespace.
        this.localStorage = new Store('todos-typescript-backbone');
    }
    // Filter down the list of all todo items that are completed.
    TodoList.prototype.completed = function () {
        return this.filter(function (todo) {lacuna_lazy_load("js/app.js[4175:4208]", functionData => eval(functionData))});
    };
    // Filter down the list to only todo items that are still not completed.
    TodoList.prototype.remaining = function () {
        return this.without.apply(this, this.completed());
    };
    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    TodoList.prototype.nextOrder = function () {lacuna_lazy_load("js/app.js[4617:4712]", functionData => eval(functionData))};
    // Todos are sorted by their original insertion order.
    TodoList.prototype.comparator = function (todo) {lacuna_lazy_load("js/app.js[4825:4866]", functionData => eval(functionData))};
    return TodoList;
})(Backbone.Collection);
// Create our global collection of **Todos**.
var Todos = new TodoList();
var taskFilter;
// Todo Item View
// --------------
// The DOM element for a todo item...
var TodoView = (function (_super) {
    __extends(TodoView, _super);
    function TodoView(options) {lacuna_lazy_load("js/app.js[5178:5973]", functionData => eval(functionData))}
    // Re-render the contents of the todo item.
    TodoView.prototype.render = function () {lacuna_lazy_load("js/app.js[6066:6307]", functionData => eval(functionData))};
    // Toggle the `completed` state of the model.
    TodoView.prototype.toggleDone = function () {lacuna_lazy_load("js/app.js[6407:6443]", functionData => eval(functionData))};
    TodoView.prototype.toggleVisible = function () {lacuna_lazy_load("js/app.js[6496:6723]", functionData => eval(functionData))};
    // Switch this view into `'editing'` mode, displaying the input field.
    TodoView.prototype.edit = function () {lacuna_lazy_load("js/app.js[6842:6915]", functionData => eval(functionData))};
    // Close the `'editing'` mode, saving changes to the todo.
    TodoView.prototype.close = function () {lacuna_lazy_load("js/app.js[7023:7266]", functionData => eval(functionData))};
    // If you hit `enter`, we're through editing the item.
    TodoView.prototype.updateOnEnter = function (e) {lacuna_lazy_load("js/app.js[7379:7456]", functionData => eval(functionData))};
    // If you're pressing `escape` we revert your change by simply leaving
    // the `editing` state.
    TodoView.prototype.revertOnEscape = function (e) {lacuna_lazy_load("js/app.js[7614:7844]", functionData => eval(functionData))};
    // Remove the item, destroy the model.
    TodoView.prototype.clear = function () {lacuna_lazy_load("js/app.js[7932:7967]", functionData => eval(functionData))};
    TodoView.ENTER_KEY = 13;
    TodoView.ESC_KEY = 27;
    return TodoView;
})(Backbone.View);
// Todo Router
// -----------
var TodoRouter = (function (_super) {
    __extends(TodoRouter, _super);
    function TodoRouter() {
        _super.call(this);
        this.routes = {
            '*filter': 'setFilter'
        };
        this._bindRoutes();
    }
    TodoRouter.prototype.setFilter = function (param) {
        if (param === void 0) { param = ''; }
        // Trigger a collection filter event, causing hiding/unhiding
        // of Todo view items
        Todos.trigger('filter', param);
    };
    return TodoRouter;
})(Backbone.Router);
// The Application
// ---------------
// Our overall **AppView** is the top-level piece of UI.
var AppView = (function (_super) {
    __extends(AppView, _super);
    function AppView() {
        _super.call(this);
        // Delegated events for creating new items, and clearing completed ones.
        this.events = {
            'keypress .new-todo': 'createOnEnter',
            'click .todo-clear button': 'clearCompleted',
            'click .toggle-all': 'toggleAllComplete'
        };
        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        this.setElement($('.todoapp'), true);
        // At initialization we bind to the relevant events on the `Todos`
        // collection, when items are added or changed. Kick things off by
        // loading any preexisting todos that might be saved in *localStorage*.
        _.bindAll(this, 'addOne', 'addAll', 'render', 'toggleAllComplete', 'filter');
        this.input = this.$('.new-todo');
        this.allCheckbox = this.$('.toggle-all')[0];
        this.mainElement = this.$('.main')[0];
        this.footerElement = this.$('.footer')[0];
        this.statsTemplate = _.template($('#stats-template').html());
        Todos.bind('add', this.addOne);
        Todos.bind('reset', this.addAll);
        Todos.bind('all', this.render);
        Todos.bind('change:completed', this.filterOne);
        Todos.bind('filter', this.filter);
        Todos.fetch();
        // Initialize the router, showing the selected view
        var todoRouter = new TodoRouter();
        Backbone.history.start();
    }
    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    AppView.prototype.render = function () {
        var completed = Todos.completed().length;
        var remaining = Todos.remaining().length;
        if (Todos.length) {
            this.mainElement.style.display = 'block';
            this.footerElement.style.display = 'block';
            this.$('.todo-stats').html(this.statsTemplate({
                total: Todos.length,
                completed: completed,
                remaining: remaining
            }));
            this.$('.filters li a')
                .removeClass('selected')
                .filter('[href="#/' + (taskFilter || '') + '"]')
                .addClass('selected');
        }
        else {
            this.mainElement.style.display = 'none';
            this.footerElement.style.display = 'none';
        }
        this.allCheckbox.checked = !remaining;
    };
    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    AppView.prototype.addOne = function (todo) {lacuna_lazy_load("js/app.js[11378:11490]", functionData => eval(functionData))};
    // Add all items in the **Todos** collection at once.
    AppView.prototype.addAll = function () {lacuna_lazy_load("js/app.js[11593:11633]", functionData => eval(functionData))};
    // Filter out completed/remaining tasks
    AppView.prototype.filter = function (criteria) {
        taskFilter = criteria;
        this.filterAll();
    };
    AppView.prototype.filterOne = function (todo) {lacuna_lazy_load("js/app.js[11846:11886]", functionData => eval(functionData))};
    AppView.prototype.filterAll = function () {
        Todos.each(this.filterOne);
    };
    // Generate the attributes for a new Todo item.
    AppView.prototype.newAttributes = function () {lacuna_lazy_load("js/app.js[12081:12227]", functionData => eval(functionData))};
    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    AppView.prototype.createOnEnter = function (e) {lacuna_lazy_load("js/app.js[12397:12567]", functionData => eval(functionData))};
    // Clear all completed todo items, destroying their models.
    AppView.prototype.clearCompleted = function () {lacuna_lazy_load("js/app.js[12684:12790]", functionData => eval(functionData))};
    AppView.prototype.toggleAllComplete = function () {lacuna_lazy_load("js/app.js[12846:12990]", functionData => eval(functionData))};
    return AppView;
})(Backbone.View);
// Load the application once the DOM is ready, using `jQuery.ready`:
$(function () {
    // Finally, we kick things off by creating the **App**.
    new AppView();
});
