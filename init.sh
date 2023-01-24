
# Runs npm install on all projects
npm install
npm --prefix ./todomvc install ./todomvc
npm --prefix ./todomvc/tests install ./todomvc/tests
npm --prefix ./groundtruth/dynamic-deadfunction-detector install ./groundtruth/dynamic-deadfunction-detector

# apply todomvc diff 
(cd todomvc && git apply ../groundTruth/todomvc.diff)

