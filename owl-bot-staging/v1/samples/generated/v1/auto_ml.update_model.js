// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **



'use strict';

function main(model, updateMask) {
  // [START automl_v1_generated_AutoMl_UpdateModel_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The model which replaces the resource on the server.
   */
  // const model = {}
  /**
   *  Required. The update mask applies to the resource.
   */
  // const updateMask = {}

  // Imports the Automl library
  const {AutoMlClient} = require('@google-cloud/automl').v1;

  // Instantiates a client
  const automlClient = new AutoMlClient();

  async function callUpdateModel() {
    // Construct request
    const request = {
      model,
      updateMask,
    };

    // Run request
    const response = await automlClient.updateModel(request);
    console.log(response);
  }

  callUpdateModel();
  // [END automl_v1_generated_AutoMl_UpdateModel_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
