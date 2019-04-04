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
  datasetId = 'YOUR_DATASET_ID',
  gcsOutputUri = 'GCS_DIRECTORY'
) {
  // [START automl_vision_object_detection_export_data]
  /**
   * Demonstrates using the AutoML client to export a dataset to a
   * Google Cloud Storage bucket.
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = '[PROJECT_ID]' e.g., "my-gcloud-project";
  // const computeRegion = '[REGION_NAME]' e.g., "us-central1";
  // const datasetId = '[DATASET_ID]' e.g.,"IOD34216801856389120";
  // const gcsOutputUri = '[GCS_OUTPUT_URI]' e.g., "gs://<bucket-name>/<folder-name>",
  // `Google Cloud Storage URI for the export directory`;

  //Imports the Google Cloud Automl library
  const {AutomlClient} = require('@google-cloud/automl').v1beta1;

  // Instantiates a client
  const automlClient = new AutomlClient();

  async function exportData() {
    // Get the full path of the dataset.
    const datasetFullId = automlClient.datasetPath(
      projectId,
      computeRegion,
      datasetId
    );

    // Set the output URI
    const outputConfig = {
      gcsDestination: {
        outputUriPrefix: gcsOutputUri,
      },
    };

    // Export the data to the output URI.
    automlClient
      .exportData({name: datasetFullId, outputConfig: outputConfig})
      .then(responses => {
        const operation = responses[0];
        console.log(`Processing export...`);
        return operation.promise();
      })
      .then(responses => {
        // The final result of the operation.
        const operationDetails = responses[2];

        // Get the data export details.
        console.log('Data export details:');
        console.log(`\tOperation details:`);
        console.log(`\t\tName: ${operationDetails.name}`);
        console.log(`\t\tDone: ${operationDetails.done}`);
      })
      .catch(err => {
        console.error(err);
      });
  }
  exportData();
  // [END automl_vision_object_detection_export_data]
}
main(...process.argv.slice(2));
