
	(function () {
		var result = localStorage.getItem('elm-todo-model');
		var savedModel = result ? JSON.parse(result) : null;

		var todomvc = Elm.Todo.fullscreen(savedModel);

		todomvc.ports.save.subscribe(function (model) {
			localStorage.setItem('elm-todo-model', JSON.stringify(model));
		});
	}());
