
# Runs npm install on all projects
npm --prefix ./scripts install ./scripts
npm --prefix ./todomvc install ./todomvc
npm --prefix ./todomvc/tests install ./todomvc/tests
npm --prefix ./dynamic-deadfunction-detector install ./dynamic-deadfunction-detector

# apply todomvc diff 
(cd todomvc && git apply ../scripts/todomvc.diff)

