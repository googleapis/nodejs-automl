// Copyright 2019 Google LLC
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

// DO NOT EDIT! This is a generated sample ("LongRunningPromiseAwait",  "automl_vision_batch_predict")

// sample-metadata:
//   title: AutoML Batch Predict (AutoML Vision)
//   description: AutoML Batch Predict using AutoML Vision
//   usage: node samples/v1beta1/automl_vision_batch_predict.js [--input_uri "gs://[BUCKET-NAME]/path/to/file-with-image-urls.csv"] [--output_uri "gs://[BUCKET-NAME]/directory-for-output-files/"] [--project "[Google Cloud Project ID]"] [--model_id "[Model ID]"]

'use strict';

// [START automl_vision_batch_predict]

const automl = require('@google-cloud/automl').v1beta1;

/**
 * AutoML Batch Predict using AutoML Vision
 *
 * @param inputUri {string} Google Cloud Storage URI to CSV file in your bucket that contains the
 * paths to the images to annotate, e.g. gs://[BUCKET-NAME]/path/to/images.csv
 * Each line specifies a separate path to an image in Google Cloud Storage.
 * @param outputUri {string} Identifies where to store the output of your prediction request
 * in your Google Cloud Storage bucket.
 * You must have write permissions to the Google Cloud Storage bucket.
 * @param project {string} Required. Your Google Cloud Project ID.
 * @param modelId {string} Model ID, e.g. VOT1234567890123456789
 */
async function sampleBatchPredict(inputUri, outputUri, project, modelId) {
  const client = new automl.PredictionServiceClient();
  // const inputUri = 'gs://[BUCKET-NAME]/path/to/file-with-image-urls.csv';
  // const outputUri = 'gs://[BUCKET-NAME]/directory-for-output-files/';
  // const project = '[Google Cloud Project ID]';
  // const modelId = '[Model ID]';
  const formattedName = client.modelPath(project, 'us-central1', modelId);
  const inputUris = [inputUri];
  const gcsSource = {
    inputUris: inputUris,
  };
  const inputConfig = {
    gcsSource: gcsSource,
  };
  const gcsDestination = {
    outputUriPrefix: outputUri,
  };
  const outputConfig = {
    gcsDestination: gcsDestination,
  };

  // A value from 0.0 to 1.0. When the model detects objects on video frames,
  // it will only produce bounding boxes that have at least this confidence score.
  // The default is 0.5.
  const paramsItem = '0.0';
  const params = {'score_threshold' : paramsItem};
  const request = {
    name: formattedName,
    inputConfig: inputConfig,
    outputConfig: outputConfig,
    params: params,
  };

  // Create a job whose results you can either wait for now, or get later
  const [operation] = await client.batchPredict(request);

  // Get a Promise representation of the final result of the job
  const [response] = await operation.promise();

  console.log(`Batch Prediction results saved to specified Cloud Storage bucket.`);
}

// [END automl_vision_batch_predict]
// tslint:disable-next-line:no-any

const argv = require(`yargs`)
  .option('input_uri', {
    default: 'gs://[BUCKET-NAME]/path/to/file-with-image-urls.csv',
    string: true
  })
  .option('output_uri', {
    default: 'gs://[BUCKET-NAME]/directory-for-output-files/',
    string: true
  })
  .option('project', {
    default: '[Google Cloud Project ID]',
    string: true
  })
  .option('model_id', {
    default: '[Model ID]',
    string: true
  })
  .argv;

sampleBatchPredict(argv.input_uri, argv.output_uri, argv.project, argv.model_id).catch(console.error);