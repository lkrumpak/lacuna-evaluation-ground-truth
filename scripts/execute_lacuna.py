import os
import sys
import subprocess
import multiprocessing
import signal
import datetime
import csv

script_dir = os.path.dirname(__file__)  # Absolute dir path the script is in
SUBJECTS_PATH = "../todomvc/examples"
subjects = [f.name for f in os.scandir(f"{script_dir}/{SUBJECTS_PATH}/") if f.is_dir()]


def invoke_lacuna(subject, onlyDynamic=False):
    print(
        f"++++++++++ Invoking Lacuna on {subject} with onlyDynamic set to {onlyDynamic} ++++++++++"
    )
    if not onlyDynamic:
        toCall = [
            "node",
            "./lacuna_evaluation/LacunaV2/lacuna",
            f"./todomvc/examples/{subject}",
            "-a",
            "tajs",
            "dynamic",
            "-o",
            "1",
            "-d",
            f"./todomvc/examples.lacunised/{subject}",
            "-f",
        ]
    else:
        toCall = [
            "node",
            "./lacuna_evaluation/LacunaV2/lacuna",
            f"./todomvc/examples/{subject}",
            "-a",
            "dynamic",
            "-o",
            "1",
            "-d",
            f"../todomvc/examples.lacunised/{subject}",
            "-f",
        ]

    print("Adding timer for 30 minutes...")
    result = subprocess.call(toCall, timeout=1800)

    return (
        None
        if result == 0
        else f"onlyDynamic {onlyDynamic} failed with result {result}"
    )


if __name__ == "__main__":
    for subject in subjects:
        lacuna_error = None
        for onlyDynamicBool in [False, True]:
            try:
                print(
                    f"========== Invocation for {subject} with {'combination' if not onlyDynamicBool else 'dynamic'} started on {datetime.datetime.now().time()} =========="
                )
                lacuna_error = invoke_lacuna(subject, onlyDynamicBool)

                if not lacuna_error:
                    break
                else:
                    with open("lacuna_execution_errors.csv", "a") as logs:
                        print("Writing to logs...")
                        writer = csv.writer(logs)
                        writer.writerow(
                            [
                                subject,
                                lacuna_error,
                                onlyDynamicBool,
                                datetime.datetime.now(),
                            ]
                        )
            except subprocess.TimeoutExpired as e:
                print("Writing to logs...")
                with open("lacuna_execution_errors.csv", "a") as logs:
                    print("Timeout error!")
                    writer = csv.writer(logs)

                    writer.writerow(
                        [
                            subject,
                            "TimeLimitViolation",
                            onlyDynamicBool,
                            datetime.datetime.now(),
                        ]
                    )
            except Exception as e:
                print("IN EXCEPTION", e)
                with open("lacuna_execution_errors.csv", "a") as logs:
                    print("Writing to logs...")
                    writer = csv.writer(logs)

                    writer.writerow(
                        [
                            subject,
                            e.__class__.__name__,
                            onlyDynamicBool,
                            datetime.datetime.now(),
                        ]
                    )
        print(
            f"========== Invocation for {subject} stopped on {datetime.datetime.now().time()} =========="
        )
