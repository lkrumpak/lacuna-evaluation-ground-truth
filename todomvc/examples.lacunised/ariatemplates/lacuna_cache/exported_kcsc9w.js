
			// Update the path to the Todo module here when necessary
			aria.core.DownloadMgr.updateRootMap({
				js: {
				'*': './'
				}
			});
			// Here be todos
			Aria.loadTemplate({
				div: 'todoapp',
				classpath: 'js.view.Todo',
				moduleCtrl: {
					classpath: 'js.TodoCtrl'
				}
			});
		