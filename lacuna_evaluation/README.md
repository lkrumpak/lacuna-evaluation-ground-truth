# Introduction

This repo contains all the necessary files to evaluate the performance of [Lacuna](https://github.com/S2-group/Lacuna), a dead code elimination tool, on a set of 39 web applications. These applications originate from the [TodoMVC project](https://todomvc.com/). The LacunaV2 directory is a copy of Lacuna, while the LacunaV2-evaluator contains the files and scripts that execute Lacuna and generate performance metrics and statistics for Lacuna for each subject and across all subjects.

# Requirements
The evaluation of Lacuna was performed using:

- Node v18.12.1
- npm 8.19.2
- Python 3.10.9

# Setup
## Install dependencies
In a terminal, run the following commands:

```
bash setup.sh
```

This script install the dependencies for the Lacuna tool, for the Lacuna evaluator, and for each subject on which Lacuna is assessed.

## Host the target web applications
Now that all the dependencies of the target web applications have been installed, it is time to host them, before Lacuna can be applied on them. To achieve this, run:

```
gulp test-server
```

# Execution
## Step 1. Normlise all the scripts that are tested
In this step, a normalised version of each application is created, meaning no inline scripts and no externally hosted scripts exist after its execution. These new versions are stored in a new directory within the todomvc directory, called examples.normalised.

To nomrlaise the target applications, run the following command in the terminal:

```
node ./LacunaV2-evaluator/todomvc_lacuna_normalizer.js
```

This command assumes that the target web applciations exist one level above the directory in which this README is located. If this is not the case and you would like to adjust the path to the target subjects, you would need to adjust the *TODOMVC_DIR* value within *todomvc_lacuna_normalizer.js*.

## Step 2. Acquite the Lacuna analyser results
In a terminal, run the following command:

```
python3 execute_lacuna.py
```

This script utilises the combination of the TAJS and dynamic analysers, available to Lacuna, to determine which functions are dead and alive. If this combination fails to produce results for any reason (or the process takes more than 30 minutes), then Lacuna is run on the current subject using only the dynamic analyser.

When this scirpt completes, the Lacuna results for all, alive, and dead functions have been generated. For each subject, these results can be found in the *lacuna.log* file, located in the subject's top level directory (e.g. in "todomvc/examples.lacunized/ampersand/lacuna.log" for the ampersand subject). Additionally, any errors occured during the exeuction of the script are written in the *lacuna_execution_errors.csv* file. If no such file was produced, no errors were encountered during the operation of this step.

## Step 3. Performance metrics and statistics generation
Once Lacuna has completed its execution on the target subjects, the performance metrics of precision, recall, and accuracy can be computed for each tool in this step. To get these metric values, along with descriptive statistcs for Lacuna across all subjects, run the following command:

```
python3 data.py
```

The results of this script can be found within the files *_statistics_.csv* and *_descriptive_stats_.csv*.