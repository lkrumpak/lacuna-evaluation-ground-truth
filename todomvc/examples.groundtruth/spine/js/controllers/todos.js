/** (github.com/dynamic-deadfunction-detector)
* Instrumentation log function used by the instrumenter
* note that the data object is already stringified.
*/
var logHistory = [];
function instrumentation_log(data) {
    
                function exists(e) { return e.file == jData.file && e.range[0] == jData.range[0] && e.range[1] == jData.range[1]; }
                var jData = JSON.parse(data);
                if (logHistory.some(exists)){ return; }
                logHistory.push(jData);
    fetch("http://127.0.0.1:8004/alivefunction", {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: data
            }).then((response) => { });
}


// Generated by CoffeeScript 1.9.1
(function() {instrumentation_log('{"type":"FunctionExpression","bodyRange":[47,2445],"range":[36,2445],"file":"todomvc/examples.lacunized.instrumented/spine/js/controllers/todos.js","index":14,"label":"spine"}');
  var bind = function(fn, me){instrumentation_log('{"type":"FunctionExpression","bodyRange":[78,135],"range":[62,135],"file":"todomvc/examples.lacunized.instrumented/spine/js/controllers/todos.js","index":1,"label":"spine"}'); return function(){instrumentation_log('{"type":"FunctionExpression","bodyRange":[97,132],"range":[87,132],"file":"todomvc/examples.lacunized.instrumented/spine/js/controllers/todos.js","index":0,"label":"spine"}'); return fn.apply(me, arguments); }; },
    extend = function(child, parent) {instrumentation_log('{"type":"FunctionExpression","bodyRange":[174,423],"range":[150,423],"file":"todomvc/examples.lacunized.instrumented/spine/js/controllers/todos.js","index":3,"label":"spine"}'); for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() {instrumentation_log('{"type":"FunctionDeclaration","bodyRange":[277,306],"range":[261,306],"file":"todomvc/examples.lacunized.instrumented/spine/js/controllers/todos.js","index":2,"label":"spine"}'); this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.Todos = (function(superClass) {instrumentation_log('{"type":"FunctionExpression","bodyRange":[498,2422],"range":[477,2422],"file":"todomvc/examples.lacunized.instrumented/spine/js/controllers/todos.js","index":13,"label":"spine"}');
    var ENTER_KEY, ESCAPE_KEY, TPL;

    extend(Todos, superClass);

    ENTER_KEY = 13;

    ESCAPE_KEY = 27;

    TPL = Handlebars.compile($('#todo-template').html());

    Todos.prototype.elements = {
      '.edit': 'editElem'
    };

    Todos.prototype.events = {
      'click    .destroy': 'remove',
      'click    .toggle': 'toggleStatus',
      'dblclick label': 'edit',
      'keydown  .edit': 'revertEditOnEscape',
      'keyup    .edit': 'finishEditOnEnter',
      'blur     .edit': 'finishEdit'
    };

    function Todos() {instrumentation_log('{"type":"FunctionDeclaration","bodyRange":[1037,1239],"range":[1020,1239],"file":"todomvc/examples.lacunized.instrumented/spine/js/controllers/todos.js","index":4,"label":"spine"}');
      this.render = bind(this.render, this);
      Todos.__super__.constructor.apply(this, arguments);
      this.todo.bind('update', this.render);
      this.todo.bind('destroy', this.release);
    }

    Todos.prototype.render = function() {instrumentation_log('{"type":"FunctionExpression","bodyRange":[1281,1343],"range":[1270,1343],"file":"todomvc/examples.lacunized.instrumented/spine/js/controllers/todos.js","index":5,"label":"spine"}');
      this.replace(TPL(this.todo));
      return this;
    };

    Todos.prototype.remove = function() {instrumentation_log('{"type":"FunctionExpression","bodyRange":[1386,1427],"range":[1375,1427],"file":"todomvc/examples.lacunized.instrumented/spine/js/controllers/todos.js","index":6,"label":"spine"}');
      return this.todo.destroy();
    };

    Todos.prototype.toggleStatus = function() {instrumentation_log('{"type":"FunctionExpression","bodyRange":[1476,1558],"range":[1465,1558],"file":"todomvc/examples.lacunized.instrumented/spine/js/controllers/todos.js","index":7,"label":"spine"}');
      return this.todo.updateAttribute('completed', !this.todo.completed);
    };

    Todos.prototype.edit = function() {instrumentation_log('{"type":"FunctionExpression","bodyRange":[1599,1702],"range":[1588,1702],"file":"todomvc/examples.lacunized.instrumented/spine/js/controllers/todos.js","index":8,"label":"spine"}');
      this.el.addClass('editing');
      return this.editElem.val(this.editElem.val()).focus();
    };

    Todos.prototype.finishEdit = function() {instrumentation_log('{"type":"FunctionExpression","bodyRange":[1749,1976],"range":[1738,1976],"file":"todomvc/examples.lacunized.instrumented/spine/js/controllers/todos.js","index":9,"label":"spine"}');
      var val;
      this.el.removeClass('editing');
      val = $.trim(this.editElem.val());
      if (val) {
        return this.todo.updateAttribute('title', val);
      } else {
        return this.remove();
      }
    };

    Todos.prototype.finishEditOnEnter = function(e) {instrumentation_log('{"type":"FunctionExpression","bodyRange":[2031,2115],"range":[2019,2115],"file":"todomvc/examples.lacunized.instrumented/spine/js/controllers/todos.js","index":10,"label":"spine"}');
      if (e.which === ENTER_KEY) {
        return this.finishEdit();
      }
    };

    Todos.prototype.revertEdit = function() {instrumentation_log('{"type":"FunctionExpression","bodyRange":[2162,2256],"range":[2151,2256],"file":"todomvc/examples.lacunized.instrumented/spine/js/controllers/todos.js","index":11,"label":"spine"}');
      this.el.removeClass('editing');
      return this.editElem.val(this.todo.title);
    };

    Todos.prototype.revertEditOnEscape = function(e) {instrumentation_log('{"type":"FunctionExpression","bodyRange":[2312,2397],"range":[2300,2397],"file":"todomvc/examples.lacunized.instrumented/spine/js/controllers/todos.js","index":12,"label":"spine"}');
      if (e.which === ESCAPE_KEY) {
        return this.revertEdit();
      }
    };

    return Todos;

  })(Spine.Controller);

}).call(this);
