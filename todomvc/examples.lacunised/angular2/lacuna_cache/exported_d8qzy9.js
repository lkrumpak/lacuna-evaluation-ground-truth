
			System.config({
				packages: {
					'app': {
						format: 'cjs',
						defaultExtension: 'js'
					}
				}
			});
			System.import('app/bootstrap');
		