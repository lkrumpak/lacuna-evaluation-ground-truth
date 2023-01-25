# Introduction

This repo contains all the necessary files to obtain the groundtruth for the analysis of the following dead code eliminations tools, [Muzeel](https://github.com/S2-group/Lacuna) and [UFFRemover](https://github.com/lkrumpak/UFFRemover). Additionally, you will find the necessary files to evaluate the performance of [Lacuna](https://github.com/S2-group/Lacuna), a dead code elimination tool, on a set of 39 web applications. These applications originate from the [TodoMVC project](https://todomvc.com/). However, the repository has not been updated for a few years, so we took the time to update the necessary dependencies to be able to execute the web applications on modern hardware (see Requirements Section). The LacunaV2 directory is a copy of Lacuna, while the LacunaV2-evaluator contains the files and scripts that execute Lacuna and generate performance metrics and statistics for Lacuna for each subject and across all subjects.

# Requirements

The purpose of this repo is to re-generate the ground truth and lacuna results using modern software and harware specifications:

- node version: 18.12.1
- npm version: 8.19.2
- python: 3.10.9
- Hardware: Macbook pro (M1 chip), 16GB ram
- Chrome: 108.0.0


# How it works
The ground truth values of the todomvc project are gathered with the help of extensive test-cases and the [dynamic-deadfunction-detector](https://github.com/Kishanjay/dynamic-deadfunction-detector) repo, which  automatically logs all alive functions.

# Setup
## Install dependencies
In a terminal, run the following command:

```
bash setup.sh
```
or 
```
./setup.sh
```

This script installs all required dependencies for this project.

## Host the target web applications
Now that all the dependencies of the target web applications have been installed, it is time to host them, before obtaining the groundtruth or executing Lacuna on the selectied web applications. To achieve this, run the following command within the todomvc folder:

```
gulp test-server
```
**_NOTE:_**  We recommend runing the command in a seperate terminal or you can use something like [tmux](https://github.com/tmux/tmux).
# Execution
Lets get down to business.


## Step 1. Acquire the Ground Truth Values [OPTIONAL]
**_NOTE:_** This step is optional as the values from the ground truth are already provided. The values can be found at `todomvc/examples.groundtruth`

If you wish to acquire the ground truth values yourself, the first step is to instrument the examples (subjects) with the following command withing the *scripts* directory:

```
node todomvc_instrumenter.js
```

Once the files are intrumented you will now see a new folder "examples.instrumented" within todomvc. In order to proceed we recommend renaming the original examples folder to "examples.original" becuase we now need to rename "examples.instrumented"  to "examples".

Once the folders have been renamed you may proceed.

**_NOTE:_** To get the _alive_functions the following commands need to be run in seperate terminals or with tmux.


Next, in the *scripts* folder run:
```
node todomvc_instrumentation_server.js
```

And finally within the "todomvc/tests" folder run:
```
npm run test
```

**_NOTE:_** Running the tests ensure that all functions of the website are run. That being said this will a while and you wont be able to use your computer in the meantime, so now is the time to go grab a coffee!

Also, in order to run the tests you must have chrome installed. Depending on the date of execution the chromedriver might need changing as this depends on the current version of chrome installed on your system

<!-- ## Step 2. Normlise all the scripts that are tested
In this step, a normalised version of each application is created, meaning no inline scripts and no externally hosted scripts exist after its execution. These new versions are stored in a new directory within the todomvc directory, called examples.normalised.

To normalise the target applications, within the *scripts* directory run the following command in the terminal:

```
node todomvc_lacuna_normalizer.js
```

This command assumes that the target web applciations exist one level above the directory in which this README is located. If this is not the case and you would like to adjust the path to the target subjects, you would need to adjust the *TODOMVC_DIR* value within *todomvc_lacuna_normalizer.js*. -->

## Step 2. Acquire the Lacuna analyser results
In a terminal, run the following command:

```
python3 execute_lacuna.py
```

This script utilises the combination of the TAJS and dynamic analysers, available to Lacuna, to determine which functions are dead and alive. If this combination fails to produce results for any reason (or the process takes more than 30 minutes), then Lacuna is run on the current subject using only the dynamic analyser.

When this scirpt completes, the Lacuna results for all, alive, and dead functions have been generated. For each subject, these results can be found in the *lacuna.log* file, located in the subject's top level directory (e.g. in "todomvc/examples.lacunized/ampersand/lacuna.log" for the ampersand subject). Additionally, any errors occured during the exeuction of the script are written in the *lacuna_execution_errors.csv* file. If no such file was produced, no errors were encountered during the operation of this step.

## Step 4. Performance metrics and statistics generation
Once Lacuna has completed its execution on the target subjects, the performance metrics of precision, recall, and accuracy can be computed for each tool in this step. To get these metric values, along with descriptive statistcs for Lacuna across all subjects, run the following command:

```
python3 ./scripts/data.py
```

The results of this script can be found within the files *_statistics_.csv* and *_descriptive_stats_.csv*.
