
			rAppid.bootStrap('app/Todo.xml', 'config.json', function (err, systemManager, application) {
				if (!err) {
					application.start(null, function () {
						application.render(document.body);
					});
				} else {
					console.warn(err);
				}
			});
		