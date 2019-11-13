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

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const MODEL_ID = 'TODO';
const DEPLOY_MODEL_REGION_TAG = 'deploy_model';
const UNDEPLOY_MODEL_REGION_TAG = 'undeploy_model';
const LOCATION = 'us-central1';

describe('Automl Natural Language Text Classification Model Tests', () => {
  const client = new AutoMlClient();

  it('should deploy and undeploy the model', async () => {
    const projectId = await client.getProjectId();

    const undeploy_output = execSync(
      `node ${UNDEPLOY_MODEL_REGION_TAG}.js ${projectId} ${LOCATION} ${MODEL_ID}`
    );
    assert.match(undeploy_output, /Model undeployment finished/);

    const deploy_output = execSync(
      `node ${DEPLOY_MODEL_REGION_TAG}.js ${projectId} ${LOCATION} ${MODEL_ID}`
    );
    assert.match(deploy_output, /Model deployment finished/);
  });
});
