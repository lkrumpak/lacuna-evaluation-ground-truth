# Intro
The following repo is a modified version of the Lacuna evalutor. The purpose of this repo is to generate the ground truth using the current modern hardware. Specifically:

- node version: 18.12.1
- npm version: 8.19.2
- hardware: Macbook pro (M1 chip)


# How it works
The ground truth values of the todomvc project are gathered with the help of
extensive test-cases and the dynamic-deadfunction-detector repo; which 
automatically logs all alive functions.


# Execution
Lets get down to business.

**Setup**
1. Run `init.sh`
2. In the todomvc folder run `git apply ../todomvc.diff`

## Step 1. Normalize all scripts that will be tested 
This step will create a normalized version of the application:
no inline scripts, no externally hosted scripts.

~~`node todomvc_lacuna_normalizer.js`~~

```diff
- The following command does not work since the file "lacunaV2/lacuna_runner" is missing. 
- The subjects which are not used for the evaluation of our experiment have been removed
+ The normalized versions of the application is already provided
```

Creates the examples.normalized

## Step 2. Acquire the Lacuna analyzer results
```diff
- This step is not needed for the ground truth
```

## Step 3. Getting the ground truth values [OPTIONAL]
Creates examples.lacunized.instrumented
`node todomvc_instrumenter.js`

```diff
+ Rename the example.lacunized.instrumented to examples
```

_This step only needs to be ran once_
Fetch _all_functions.txt by running the instrumenter

Get _alive_functions by running the following commands:

In the todomvc folder:
- `gulp test-server`
```diff
! gulp version have been updated within package.json

    "gulp": "^4.0.2",
    "gulp-autoprefixer": "^8.0.0",
    "gulp-cache": "^1.1.3",
    "gulp-if": "^3.0.0",
    "gulp-imagemin": "8.0.0",
    "gulp-jshint": "^2.1.0",
    "gulp-load-plugins": "^2.0.8",
    "gulp-rename": "^2.0.0",
    "gulp-replace": "^1.1.4",
    "gulp-size": "^4.0.1",
    "gulp-uncss": "^1.0.6",
    "gulp-useref": "^5.0.0",
    "gulp-vulcanize": "^8.0.0",

- removed the following from gulpfile.js

gulp.task('default', ['clean'], function (cb) {
	runSequence(['styles', 'copy'], ['jshint', 'html', 'images'], cb);
});

```

In the main project folder
- `node todomvc_instrumentation_server.js`

```diff
+ this command is needed in order for dynamic-deadfuncation-detector to work properly
```
in tests folder

- `npm run test`
```diff
! updated chromedriver to match the system version of chrome
    "chromedriver": "^108.0.0", 
```
The chromedriver might needed changing as this is depends on the current version of chrome installed on your system

## Step 4 & Step 5.
```diff
- not used
```