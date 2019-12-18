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

const cp = require('child_process');

const fs = require('fs');

const tempFile = 'temp.txt';
const stderr_output = fs.createWriteStream(tempFile);
const execSync = cmd =>
  cp.execSync(cmd, {encoding: 'utf-8', stdio: ['pipe', 'pipe', stderr_output]});

const DEPLOY_MODEL_REGION_TAG = 'vision_classification_deploy_model_node_count';
const LOCATION = 'us-central1';
const MODEL_ID = 'ICN0000000000000000000';

describe('Automl Vision Classification Deploy Model Test', () => {
  const client = new AutoMlClient();

  it('should deploy a model with a specified node count', async () => {
    // As model deployment can take a long time, instead try to deploy a
    // nonexistent model and confirm that the model was not found, but other
    // elements of the request were valid.
    const projectId = await client.getProjectId();
    execSync(
      `node ${DEPLOY_MODEL_REGION_TAG}.js ${projectId} ${LOCATION} ${MODEL_ID}`
    );

    const contents = fs.readFileSync(tempFile, 'utf8');
    assert.match(contents, /NOT_FOUND/);
    assert.match(contents, /The model does not exist./);
    fs.unlinkSync(tempFile);
  });
});
