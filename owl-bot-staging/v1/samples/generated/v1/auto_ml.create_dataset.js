// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


'use strict';

function main(parent, dataset) {
  // [START automl_v1_generated_AutoMl_CreateDataset_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The resource name of the project to create the dataset for.
   */
  // const parent = 'abc123'
  /**
   *  Required. The dataset to create.
   */
  // const dataset = ''

  // Imports the Automl library
  const {AutoMlClient} = require('@google-cloud/automl').v1;

  // Instantiates a client
  const automlClient = new AutoMlClient();

  async function createDataset() {
    // Construct request
    const request = {
      parent,
      dataset,
    };

    // Run request
    const [operation] = await automlClient.createDataset(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  createDataset();
  // [END automl_v1_generated_AutoMl_CreateDataset_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
