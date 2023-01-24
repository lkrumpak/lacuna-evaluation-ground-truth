import csv
import json
import os
import re
import glob
import numpy as np

examples_groundtruth_path = '../todomvc/examples.groundtruth/'
examples_path = '../todomvc/examples.lacunised/'

'''
Lacuna stores the body range within the object key. This functions extracts that 
data
'''
def get_body_range(string):
  bodyRange = string.split('[')[-1].replace(']','').split(':')
  bodyRange = [int(n) for n in bodyRange]
  return bodyRange

'''
The following function creates a list of dead functions and stores the object
within the _dead_functions.json file. If the file already exists, the file will
be overwritten.
'''
def create_gt_dead_functions(subject):
  print('Creating gt dead functions')
  ALL_PATH   = examples_groundtruth_path + subject + '/_all_functions.json'
  ALIVE_PATH = examples_groundtruth_path + subject + '/_alive_functions.json'
  DEAD_PATH  = examples_groundtruth_path + subject + '/_dead_functions.json'

  with open(ALIVE_PATH, 'r') as f1:
    alive_data = json.load(f1)
  with open(ALL_PATH, 'r') as f2:
    all_data = json.load(f2)
    dead_data = all_data
  
  # Retrieve the number of alive and all functions from the ground truth
  num_alive_func = len(alive_data)
  num_all_func = len(all_data)

  for obj1 in alive_data:
    for obj2 in dead_data:
      # Break the inner loop if objects match and remove the object from all_data
      if obj1['bodyRange'] == obj2['bodyRange']:
        obj1['file'] = obj2['file']
        dead_data.remove(obj2)
        break


  # Create or delete dead data
  with open(DEAD_PATH, 'w') as f:
    json.dump(dead_data, f)

  # Modify alive data file paths to match the rest
  with open(ALIVE_PATH, 'w') as f:
    json.dump(alive_data, f)
 
  num_dead_func = len(dead_data)
 
  return num_all_func, num_alive_func, num_dead_func


'''
Getting lacuna dead functions stats <3
'''
def get_dead_functions_stats(subject):
  dead_path_gt = examples_groundtruth_path + subject + '/_dead_functions.json'
  dead_path_lc = examples_path + subject + '/lacuna_lazyload_storage.json'

  if not os.path.exists(dead_path_lc):
    return -1, -1 , -1

  with open(dead_path_lc, 'r') as f:
    lc_obj = json.load(f)

  with open(dead_path_gt, 'r') as f:
    gt_data = json.load(f)

  true_positives = 0
  for key in lc_obj.keys():
    for gt_obj in gt_data:
      lc_bodyRange = get_body_range(key)

      if lc_bodyRange == gt_obj['bodyRange']:
        true_positives += 1

  false_positives = len(lc_obj.keys()) - true_positives
  false_negatives = len(gt_data) - true_positives
  return true_positives, false_positives,false_negatives
      
'''
Creates a _statistics_.csv with stats related to the true_positives, 
false_positives, false_negatives for each subject
'''
def create_table(subject, true_positives, false_positives, false_negatives):
  data = []
  if not os.path.exists('_statistics_.csv'):
    data.append(['Subject','Precision','Recall','f_score'])
    
  with open('_statistics_.csv', 'a', newline='') as f:
    writer = csv.writer(f)

    # Precision = TruePositives / (TruePositives + FalsePositives)
    precision = round(float(true_positives / (true_positives + false_positives)),3)

    # Recall = TruePositives / (TruePositives + FalseNegatives)
    recall = round(float(true_positives / (true_positives + false_negatives)),3)

    # F-score = (2 * Precision * Recall) / (Precision + Recall)
    f_score = round(float((2 * precision * recall) / (precision + recall)),3)
    
    data.append([subject,precision,recall,f_score])
    writer.writerows(data)

def get_desriptive_stats(name, array):
  sd = np.std(array)
  mean = np.mean(array)
  median = np.median(array)
  max_value = np.max(array)
  min_value = np.min(array)
  # CV = (standard deviation / mean) * 100
  cv = (sd / mean) * 100
  return [name,min_value,max_value,median,mean,sd,cv]

  
def create_descriptive_stats():
  # Open the CSV file
  with open('_statistics_.csv', 'r') as f:
    csv_data = list(csv.reader(f, delimiter=','))
    # Skip the header row
    csv_data = csv_data[1:]

    # Get a list of values from the column of interest
    precision = [float(row[1]) for row in csv_data]
    recall = [float(row[2]) for row in csv_data]
    f_score = [float(row[3]) for row in csv_data]

  data = [['-','Min','Max','Median','Mean','SD','CV']]
  with open('_descriptive_stats_.csv', 'a', newline='') as f:
    writer = csv.writer(f)

    data.append(get_desriptive_stats('precision', precision))
    data.append(get_desriptive_stats('recall', recall))
    data.append(get_desriptive_stats('f_score', f_score))

    writer.writerows(data)

def get_lacuna_stats():
  SUBJECTS = next(os.walk(examples_groundtruth_path))[1]

  skipped_count = 0
  total_count = 0
  subject_skipped = []
  #loop through all of the available subjects in the groundtruth!
  for subject in sorted(SUBJECTS):
    total_count += 1
    print('--- Current Subject: %s ---' % subject)

    # check if subject contains dead_code results 
    dead_path_lc = examples_path + subject + '/lacuna_lazyload_storage.json'
    if not os.path.exists(dead_path_lc):
      print('Data is missing for: %s'% subject)
      print('Skipping')
      skipped_count += 1
      subject_skipped.append(subject)
      continue

    create_gt_dead_functions(subject)
    true_positives, false_positives,false_negatives = get_dead_functions_stats(subject)

    create_table(subject, true_positives, false_positives, false_negatives)
  create_descriptive_stats()

  print('--- Final Stats ---')
  print('Total Subjects Analysed: %d' % total_count)
  print('Total Subjects Skipped: %d' % skipped_count)
  print(subject_skipped)

if __name__ == '__main__':
  get_lacuna_stats()
  