/**
 * Copyright 2019 Google LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

function main(
  operationFullId = 'projects/[projectId]/locations/us-central1/operations/[operationId]'
) {
  // [START automl_get_operation_status]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const operationFullId = 'projects/[projectId]/locations/us-central1/operations/[operationId]';

  // Imports the Google Cloud AutoML library
  const {AutoMlClient} = require(`@google-cloud/automl`);

  // Instantiates a client
  const client = new AutoMlClient();

  async function getOperationStatus() {
    // Construct request
    const request = {
      name: operationFullId,
    };

    const [response] = await client.operationsClient.getOperation(request);

    console.log(`Name: ${response.name}`);
    console.log(`Operation details:`);
    console.log(`${response}`);
  }

  getOperationStatus();
  // [END automl_get_operation_status]
}

main(...process.argv.slice(2));
