/* eslint-disable no-prototype-builtins */
/**
 * Copyright 2019 Google LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const {assert} = require('chai');
const {describe, it} = require('mocha');
const proxyquire = require('proxyquire');

/** Tests for AutoML Tables "Prediction API" sample. */

const projectId = process.env.AUTOML_PROJECT_ID;
const region = 'us-central1';
const modelId = process.env.TABLE_MODEL_ID;
const gcsInputUri = `gs://${projectId}-tables/predictTest.csv`;
const gcsOutputUriPrefix = `gs://${projectId}-tables/test_outputs/`;
const bqInputUri = 'bq://automl-tables-bg-input';
const bqOutputUriPrefix = 'bq://automl-tables-bg-output';

const pathStub = {};

const samples = {
  predict: {path: '../tables/predict.v1beta1.js'},
  predictGcs: {path: '../tables/predict-gcs-source-gcs-dest.v1beta1.js'},
  predictBq: {path: '../tables/predict-gcs-source-bq-dest.v1beta1.js'},
};

for (const sample of Object.values(samples)) {
  sample.runSample = proxyquire(sample.path, {path: pathStub});
}

describe('Tables PredictionAPI', () => {
  it('should perform single prediction', async () => {
    const inputs = [
      {numberValue: 39}, // Age
      {stringValue: 'technician'}, // Job
      {stringValue: 'married'}, // MaritalStatus
      {stringValue: 'secondary'}, // Education
      {stringValue: 'no'}, // Default
      {numberValue: 52}, // Balance
      {stringValue: 'no'}, // Housing
      {stringValue: 'no'}, // Loan
      {stringValue: 'cellular'}, // Contact
      {numberValue: 12}, // Day
      {stringValue: 'aug'}, // Month
      {numberValue: 96}, // Duration
      {numberValue: 2}, //Campaign
      {numberValue: -1}, // PDays
      {numberValue: 0}, // Previous
      {stringValue: 'unknown'}, // POutcome
    ];

    const payload = await samples.predict.main(
      projectId,
      region,
      modelId,
      inputs
    );

    assert(payload);
    assert.ok(payload.hasOwnProperty('payload'));
  });

  it.skip(`should perform batch prediction using GCS as source and
    GCS as destination`, async () => {
    // Run batch prediction using GCS as source and GCS as destination
    const operation = samples.predictGcs.main(
      projectId,
      region,
      modelId,
      gcsInputUri,
      gcsOutputUriPrefix
    );
    assert(operation);
  });

  it.skip(`should perform batch prediction using BQ as source and
    GCS as destination`, async () => {
    //  Run batch prediction using BQ as source and GCS as destination
    const output = samples.predictBq.main(
      projectId,
      region,
      modelId,
      bqInputUri,
      gcsOutputUriPrefix
    );
    assert(output);
  });

  it.skip(`should perform batch prediction using GCS as source and
    BQ as destination`, async () => {
    // Run batch prediction using GCS as source and BQ as destination
    const output = samples.predictBq.main(
      projectId,
      region,
      modelId,
      gcsInputUri,
      bqOutputUriPrefix
    );

    assert(output);
  });

  it.skip(`should perform batch prediction using BQ as source and
    BQ as destination`, async () => {
    // Run batch prediction using BQ as source and BQ as destination
    const output = samples.predictBq.main(
      projectId,
      region,
      modelId,
      bqInputUri,
      bqOutputUriPrefix
    );

    assert(output);
  });
});
