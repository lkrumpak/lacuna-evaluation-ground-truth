# Intro

The following repo is a modified version of the Lacuna evalutor. The purpose of this repo is to generate the ground truth and lacuna results using the following specifications:

- node version: 18.12.1
- npm version: 8.19.2
- python: 3.10.9
- Hardware: Macbook pro (M1 chip), 16GB ram
- Chrome: 108.0.0


# How it works
The ground truth values of the todomvc project are gathered with the help of extensive test-cases and the dynamic-deadfunction-detector repo; which  automatically logs all alive functions.

# Execution
Lets get down to business.

**Setup**
The following command will download all of the nessesary dependencies.
Run `init.sh`


## Step 1. Acquire the Ground Truth Values [OPTIONAL]
This step is optional as the values from the ground truth are already provided. The values can be found at `todomvc\examples.groundtruth`

If you wish to acquire the ground truth values yourself, then first step is to instrument the examples with the following command.

`node todomvc_instrumenter.js`

Once the files are intrumented you will now see a new folder "examples.instrumented" within todomvc. In order to proceed we recommend renaming the original examples folder to "examples.original" becuase we now need to rename "examples.instrumented"  to "examples".

Once the you renamed the folders you may proceed to the next step!


To get the _alive_functions the following command need to be run

In the "todomvc" folder:
- `gulp test-server`

In the "scripts" folder
- `node todomvc_instrumentation_server.js`

And finally within the "todomvc/tests" folder

- `npm run test`

Important Note: running the test will take a while, so now is the time to go grab a coffee!

Also, in order to run the tests you must have chrome installed. Depending on the date of execution the chromedriver might need changing as this depends on the current version of chrome installed on your system

## Step 2. Lacuna Stuff
