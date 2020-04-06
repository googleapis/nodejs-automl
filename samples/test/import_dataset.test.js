// Copyright 2019 Google LLC
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

const {assert} = require('chai');
const {describe, it, before, after} = require('mocha');
const {AutoMlClient} = require('@google-cloud/automl').v1;

const cp = require('child_process');
const uuid = require('uuid');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const IMPORT_DATASET_REGION_TAG = 'import_dataset';
const LOCATION = 'us-central1';

// If two suites of tests are running parallel, importing and creating
// datasets can fail, with:
// No other operations should be working on projects/1046198160504/*.
const delay = async test => {
  const retries = test.currentRetry();
  if (retries === 0) return; // no retry on the first failure.
  // see: https://cloud.google.com/storage/docs/exponential-backoff:
  const ms = Math.pow(2, retries) * 1000 + Math.random() * 2000;
  return new Promise(done => {
    console.info(`retrying "${test.title}" in ${ms}ms`);
    setTimeout(done, ms);
  });
};

describe('Automl Import Dataset Test', () => {
  const client = new AutoMlClient();
  let datasetId;

  before('should create a dataset', async function() {
    this.retries(5);
    await delay(this.test);
    const projectId = await client.getProjectId();
    const displayName = `test_${uuid
      .v4()
      .replace(/-/g, '_')
      .substring(0, 26)}`;
    const request = {
      parent: client.locationPath(projectId, LOCATION),
      dataset: {
        displayName: displayName,
        translationDatasetMetadata: {
          sourceLanguageCode: 'en',
          targetLanguageCode: 'ja',
        },
      },
    };
    const [operation] = await client.createDataset(request);
    const [response] = await operation.promise();
    datasetId = response.name
      .split('/')
      [response.name.split('/').length - 1].split('\n')[0];
  });

  it('should create, import, and delete a dataset', async function() {
    this.retries(5);
    await delay(this.test);
    const projectId = await client.getProjectId();
    const data = `gs://${projectId}-automl-translate/en-ja-short.csv`;
    const import_output = execSync(
      `node ${IMPORT_DATASET_REGION_TAG}.js ${projectId} ${LOCATION} ${datasetId} ${data}`
    );
    assert.match(import_output, /Dataset imported/);
  });

  after('delete created dataset', async () => {
    const projectId = await client.getProjectId();
    const request = {
      name: client.datasetPath(projectId, LOCATION, datasetId),
    };
    try {
      const [operation] = await client.deleteDataset(request);
      await operation.promise();
    } catch (err) {
      console.error(err);
    }
  });
});
