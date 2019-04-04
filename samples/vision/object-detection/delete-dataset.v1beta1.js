/**
 * Copyright 2019, Google LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

`use strict`;
function main(
  projectId = 'YOUR_PROJECT_ID',
  computeRegion = 'YOUR_REGION_NAME',
  datasetId = 'YOUR_DATASET_ID'
) {
  // [START automl_vision_object_detection_delete_dsataset]
  /**
   * Demonstrates using the AutoML client to delete a dataset.
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = '[PROJECT_ID]' e.g., "my-gcloud-project";
  // const computeRegion = '[REGION_NAME]' e.g., "us-central1";
  // const datasetId = '[DATASET_ID]' e.g., "IOD34216801856389120";

  //Imports the Google Cloud Automl library
  const {AutomlClient} = require('@google-cloud/automl').v1beta1;

  // Instantiates a client
  const automlClient = new AutomlClient();

  async function deleteDataset() {
    // Get the full path of the dataset.
    const datasetFullId = automlClient.datasetPath(
      projectId,
      computeRegion,
      datasetId
    );

    // Delete a dataset.
    automlClient
      .deleteDataset({name: datasetFullId})
      .then(responses => {
        const operation = responses[0];
        return operation.promise();
      })
      .then(responses => {
        // The final result of the operation.
        const operationDetails = responses[2];

        // Get the Dataset delete details.
        console.log('Dataset delete details:');
        console.log(`\tOperation details:`);
        console.log(`\t\tName: ${operationDetails.name}`);
        console.log(`\t\tDone: ${operationDetails.done}`);
      })
      .catch(err => {
        console.error(err);
      });
  }
  deleteDataset();
  // [END automl_vision_object_detection_delete_dataset]
}
main(...process.argv.slice(2));
