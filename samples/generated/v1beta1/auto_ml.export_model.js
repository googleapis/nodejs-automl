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

function main(name, outputConfig) {
  // [START automl_v1beta1_generated_AutoMl_ExportModel_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The resource name of the model to export.
   */
  // const name = 'abc123'
  /**
   *  Required. The desired output location and configuration.
   */
  // const outputConfig = {}

  // Imports the Automl library
  const {AutoMlClient} = require('@google-cloud/automl').v1beta1;

  // Instantiates a client
  const automlClient = new AutoMlClient();

  async function callExportModel() {
    // Construct request
    const request = {
      name,
      outputConfig,
    };

    // Run request
    const [operation] = await automlClient.exportModel(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  callExportModel();
  // [END automl_v1beta1_generated_AutoMl_ExportModel_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
