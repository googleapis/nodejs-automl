/**
 * Copyright 2019, Google LLC
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
const execa = require('execa');

/** Tests for AutoML Vision Object Detection "Model API" sample. */

const cmdModel = 'node automlVisionObjectDetectionModel.js';

// TODO(developer): Before running the test cases,
// set the environment variables PROJECT_ID, REGION_NAME and
// change the value of datasetId, deployModelId and  undeployModelId
//const projectId = process.env.PROJECT_ID;
//const computeRegion = process.env.REGION_NAME;
const filter = 'imageObjectDetectionModelMetadata:*';
const datasetId = 'IOD5253923954350882816';
const testModelName = 'test_vision_model';
const deployModelId = 'IOD1728502647608049664';
const undeployModelId = 'IOD3348109663601164288';

const exec = async cmd => (await execa.shell(cmd)).stdout;

describe.skip(' Vision Object Detection ModelAPI', () => {
  it(`should create a model`, async () => {
    let output = await exec(
      `${cmdModel} create-model "${datasetId}" "${testModelName}"`
    );
    const operationName = output
      .split('\n')[0]
      .split(':')[1]
      .trim();
    assert.match(output, /Training started.../);

    output = await exec(`${cmdModel} get-operation-status "${operationName}"`);
    assert.match(output, /Operation details:/);
  });

  it(`should list models, get and delete a model. list, get and display model
    evaluations from preexisting models`, async () => {
    // List models
    let output = await exec(`${cmdModel} list-models "${filter}"`);
    const parsedOut = output.split('\n');
    const outputModelId = parsedOut[3].split(':')[1].trim();
    assert.match(output, /List of models:/);

    // Get Model
    output = await exec(`${cmdModel} get-model "${outputModelId}"`);
    assert.match(output, /Model name:/);

    // List model evaluation
    output = await exec(
      `${cmdModel} list-model-evaluations "${outputModelId}"`
    );
    const parsedModelEvaluation = output.split('\n');
    const modelEvaluationId = parsedModelEvaluation[3].split(':')[1].trim();
    assert.match(output, /Model evaluation Id:/);

    // Get model evaluation
    output = await exec(
      `${cmdModel} get-model-evaluation "${outputModelId}"` +
        ` "${modelEvaluationId}"`
    );
    assert.match(output, /Model evaluation Id:/);

    // Display evaluation
    output = await exec(`${cmdModel} display-evaluation "${outputModelId}" `);
    assert.match(output, /Model Evaluation ID:/);

    // Delete Model
    output = await exec(`${cmdModel} delete-model "${outputModelId}"`);
    assert.match(output, /Model delete details:/);
  });

  it(`should list and get operation status`, async () => {
    // List operation status
    let output = await exec(`${cmdModel} list-operations-status`);
    const parsedOut = output.split('\n');
    const operationFullId = parsedOut[3].split(':')[1].trim();

    // Get operation status
    // Poll operation status, here confirming that operation is not complete yet
    output = await exec(
      `${cmdModel} get-operation-status "${operationFullId}"`
    );
    assert.match(output, /Operation details:/);
  });

  it(`should deploy the model`, async () => {
    // Deploy the model
    const output = await exec(`${cmdModel} deploy-model ${deployModelId}`);
    assert.match(output, /Name:/);
  });

  it(`should undeploy the model`, async () => {
    // Undeploy the model
    const output = await exec(`${cmdModel} undeploy-model ${undeployModelId}`);
    assert.match(output, /Name:/);
  });
});
