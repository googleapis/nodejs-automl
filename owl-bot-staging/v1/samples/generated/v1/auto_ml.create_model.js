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

function main(parent, model) {
  // [START automl_v1_generated_AutoMl_CreateModel_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. Resource name of the parent project where the model is being created.
   */
  // const parent = 'abc123'
  /**
   *  Required. The model to create.
   */
  // const model = ''

  // Imports the Automl library
  const {AutoMlClient} = require('@google-cloud/automl').v1;

  // Instantiates a client
  const automlClient = new AutoMlClient();

  async function createModel() {
    // Construct request
    const request = {
      parent,
      model,
    };

    // Run request
    const [operation] = await automlClient.createModel(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  createModel();
  // [END automl_v1_generated_AutoMl_CreateModel_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
