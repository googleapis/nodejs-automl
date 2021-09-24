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

function main(name) {
  // [START automl_v1beta1_generated_AutoMl_GetTableSpec_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The resource name of the table spec to retrieve.
   */
  // const name = 'abc123'
  /**
   *  Mask specifying which fields to read.
   */
  // const fieldMask = ''

  // Imports the Automl library
  const {AutoMlClient} = require('@google-cloud/automl').v1beta1;

  // Instantiates a client
  const automlClient = new AutoMlClient();

  async function getTableSpec() {
    // Construct request
    const request = {
      name,
    };

    // Run request
    const response = await automlClient.getTableSpec(request);
    console.log(response);
  }

  getTableSpec();
  // [END automl_v1beta1_generated_AutoMl_GetTableSpec_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
