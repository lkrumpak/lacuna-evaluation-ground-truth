
# Runs npm install on all projects
npm --prefix ./scripts install ./scripts
npm --prefix ./todomvc install ./todomvc
npm --prefix ./todomvc/tests install ./todomvc/tests
npm --prefix ./dynamic-deadfunction-detector install ./dynamic-deadfunction-detector

npm --prefix ./lacuna_evaluation/LacunaV2 install ./lacuna_evaluation/LacunaV2
npm --prefix ./lacuna_evaluation/LacunaV2-evaluator install ./lacuna_evaluation/LacunaV2-evaluator


# apply todomvc diff 
(cd todomvc && git apply ../scripts/todomvc.diff)

