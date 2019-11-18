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

const DELETE_MODEL_REGION_TAG = 'delete_model';
const LOCATION = 'us-central1';

describe('Automl Delete Model Tests', () => {
  const client = new AutoMlClient();

  it('should delete a model', async () => {
    // As model creation can take many hours, instead try to delete a
    // nonexistent model and confirm that the model was not found, but other
    // elements of the request were valid.
    try {
      const projectId = await client.getProjectId();
      const delete_output = execSync(`node ${DELETE_MODEL_REGION_TAG}.js ${projectId} ${LOCATION} TRL0000000000000000000`)

      assert.match(delete_output, /NOT_FOUND/);
      assert.match(delete_output, /The model does not exist./);
    } catch(e) {
      assert.match(e, /NOT_FOUND/);
      assert.match(e, /The model does not exist./);
    }
  });
});
