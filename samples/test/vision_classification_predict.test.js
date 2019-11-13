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

const {assert} = require('chai');
const {AutoMlClient} = require('@google-cloud/automl').v1;
const {Storage} = require('@google-cloud/storage');

const cp = require('child_process');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const MODEL_ID = 'TODO';
const PREDICT_REGION_TAG = 'vision_classification_predict';
const BATCH_PREDICT_REGION_TAG = 'vision_batch_predict';
const LOCATION = 'us-central1';

describe('Automl Vision Classification Predict Tests', () => {
  const client = new AutoMlClient();

  it('should predict', async () => {
    const projectId = await client.getProjectId();
    const filePath = 'resources/test.png';

    const predictOutput = execSync(
      `node ${PREDICT_REGION_TAG}.js ${projectId} ${LOCATION} ${MODEL_ID} ${filePath}`
    );
    assert.match(predictOutput, /Predicted class name/);
  });

  it('should batch predict', async () => {
    const projectId = await client.getProjectId();
    const inputUri = `gs://${projectId}-vcm/classification/batch_predict.csv`;
    const prefix = 'TEST_BATCH_PREDICT';
    const outputUri = `gs://${projectId}-lcm/${prefix}/`;


    const batchPredictOutput = execSync(
      `node ${BATCH_PREDICT_REGION_TAG}.js ${projectId} ${LOCATION} ${MODEL_ID} ${inputUri} ${outputUri}`
    );
    assert.match(batchPredictOutput, /Batch Prediction results saved to Cloud Storage bucket/);

    // Delete created files
    const storageClient = new Storage();
    const options = {
      prefix: prefix,
    };
    const [files] = await storageClient
      .bucket(`gs://${projectId}-lcm`)
      .getFiles(options);
    files.forEach(file => {
      storageClient
        .bucket(`gs://${bucketName}-lcm`)
        .file(file.name)
        .delete();
    });
  });
});
