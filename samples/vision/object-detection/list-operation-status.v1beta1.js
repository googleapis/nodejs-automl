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
  filter = 'FILTER_EXPRESSION'
) {
  // [START automl_vision_object_detection_list_operations_status]

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = '[PROJECT_ID]' e.g., "my-gcloud-project";
  // const computeRegion = '[REGION_NAME]' e.g., "us-central1";
  // const filter = '[FILTER_EXPRESSIONS]';

  //Imports the Google Cloud Automl library
  const {AutomlClient} = require('@google-cloud/automl').v1beta1;

  // Instantiates a client
  const automlClient = new AutomlClient();
  async function listOperationStatus() {
    // A resource that represents Google Cloud Platform location.
    const projectLocation = automlClient.locationPath(projectId, computeRegion);

    // List all the operations available in the region by applying filter.
    automlClient.operationsClient
      .listOperations({
        name: projectLocation,
        filter: filter,
      })
      .then(responses => {
        const response = responses[0];
        console.log(`List of operations:`);
        for (let i = 0; i < response.length; i++) {
          console.log(`\n\tOperation details:`);
          console.log(`\t\tName: ${response[i].name}`);
          console.log(`\t\tMetadata:`);
          console.log(`\t\t\tType Url: ${response[i].metadata.typeUrl}`);
          console.log(`\t\tDone: ${response[i].done}`);

          if (response[i].response) {
            console.log(`\t\tResponse:`);
            console.log(`\t\t\tType Url: ${response[i].response.typeUrl}`);
          }

          if (response[i].error) {
            console.log(`\t\tResponse:`);
            console.log(`\t\t\tError code: ${response[i].error.code}`);
            console.log(`\t\t\tError message: ${response[i].error.message}`);
          }
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
  listOperationStatus();
  // [END automl_vision_object_detection_list_operations_status]
}
main(...process.argv.slice(2));
