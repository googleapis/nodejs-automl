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

function main(parent) {
  // [START automl_v1beta1_generated_AutoMl_ListDatasets_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The resource name of the project from which to list datasets.
   */
  // const parent = 'abc123'
  /**
   *  An expression for filtering the results of the request.
   *    * `dataset_metadata` - for existence of the case (e.g.
   *              image_classification_dataset_metadata:*). Some examples of using the filter are:
   *    * `translation_dataset_metadata:*` --> The dataset has
   *                                           translation_dataset_metadata.
   */
  // const filter = 'abc123'
  /**
   *  Requested page size. Server may return fewer results than requested.
   *  If unspecified, server will pick a default size.
   */
  // const pageSize = 1234
  /**
   *  A token identifying a page of results for the server to return
   *  Typically obtained via
   *  ListDatasetsResponse.next_page_token google.cloud.automl.v1beta1.ListDatasetsResponse.next_page_token  of the previous
   *  AutoMl.ListDatasets google.cloud.automl.v1beta1.AutoMl.ListDatasets  call.
   */
  // const pageToken = 'abc123'

  // Imports the Automl library
  const {AutoMlClient} = require('@google-cloud/automl').v1beta1;

  // Instantiates a client
  const automlClient = new AutoMlClient();

  async function callListDatasets() {
    // Construct request
    const request = {
      parent,
    };

    // Run request
    const iterable = await automlClient.listDatasetsAsync(request);
    for await (const response of iterable) {
        console.log(response);
    }
  }

  callListDatasets();
  // [END automl_v1beta1_generated_AutoMl_ListDatasets_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
