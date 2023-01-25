/**
 * @description
 * Runs lacuna on all todomvc applications for each analyzer combination
 */
require("./prototype_extension");

const path = require("path");
const fs = require("fs-extra");
const lacuna = require("../lacuna_evaluation/LacunaV2/lacuna_runner");

const TODOMVC_DIR = "../todomvc";
const EXAMPLES_DIR = "examples";
const EXAMPLES_OUTPUT_DIR = "examples.normalised";


start().then((result) => {
    console.log("Finished");
}).catch((e) => {
    console.log(e);
    console.log("catch error");
});
async function start() {
    let frameworks = getFrameworks();
    assert(frameworks, "Invalid frameworks");

    createDestinationFolder(); // should work with EXAMPLES_OUTPUT_DIR after this
    return lacunaNormalizeFrameworks(frameworks)
}

/**
 * Fetches the todomvc- frameworks that will be used
 */
function getFrameworks() {
    const tests_dir = path.join(TODOMVC_DIR, "tests")
    const cwd = process.cwd(); // fixes relative path issue
    process.chdir(tests_dir);
    const frameworkPathLookup = require("./" + path.join(tests_dir, 'framework-path-lookup'));
    const frameworks = frameworkPathLookup();
    process.chdir(cwd);

    return frameworks;
}

/**
 * Creates and clears the new examples folder (that will be normalized)
 */
function createDestinationFolder() {
    examplesSource = path.join(TODOMVC_DIR, EXAMPLES_DIR);
    examplesDestination = path.join(TODOMVC_DIR, EXAMPLES_OUTPUT_DIR);

    if (fs.existsSync(examplesDestination) && fs.lstatSync(examplesDestination).isDirectory()) {
        fs.removeSync(examplesDestination);
    }

    fs.copySync(examplesSource, examplesDestination);
}

/**
 * Lacuna normalizes the frameworks 
 * - exports inline JS
 * - imports externally hosted JS
 * - exports eventAttributes to a file
 */
async function lacunaNormalizeFrameworks(frameworks) {
    for (framework of frameworks){
        let directory = generateFrameworkDirectory(framework);
        /* Create new object for every setup */
        let normalizeRunOption = { 
            directory: directory,
            entry: "index.html",
            normalizeOnly: true,
            force: true
        };

        /* Handle exceptions on the folder structure */
        if (framework.name == 'angular-dart') {
            normalizeRunOption.directory = normalizeRunOption.directory.slice(0, -4);
            normalizeRunOption.entry = 'web/index.html';
        }
        if (framework.name == 'chaplin-brunch') {
            normalizeRunOption.directory = normalizeRunOption.directory.slice(0, -7);
            normalizeRunOption.entry = 'public/index.html';
        }
        if (framework.name == 'duel') {
            normalizeRunOption.directory = normalizeRunOption.directory.slice(0, -4);
            normalizeRunOption.entry = 'www/index.html';
        }
        if (framework.name == 'vanilladart') {
            normalizeRunOption.directory = normalizeRunOption.directory.slice(0, -10);
            normalizeRunOption.entry = 'build/web/index.html';
        }

        try {
            await lacunaRunPromise(normalizeRunOption); // async doesn't seem to work
        } catch (e) { console.log(e); }
    }
}

/**
 * Fetches the directory for a framework
 */
function generateFrameworkDirectory({path: frameworkPath}) {
    frameworkPath = frameworkPath.splice(0, 8, EXAMPLES_OUTPUT_DIR); // append to examples    
    let pwdFrameworkPath = path.join(TODOMVC_DIR, frameworkPath);
    return pwdFrameworkPath;
}


function lacunaRunPromise (lacunaRunOption) {
    return new Promise((resolve, reject) => {
        try { lacuna.run(lacunaRunOption, resolve); } 
        catch (e) { reject(); }
    })
}

function assert(assertion, msg) {
    if (!assertion) {
        console.log(msg);
        process.exit(1);
    }
}
