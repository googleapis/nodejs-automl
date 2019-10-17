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
const {AutoMlClient} = require('@google-cloud/automl');

const cp = require('child_process');
const uuid = require('uuid');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const DATASET_ID = 'TRL8522556519449886720';
const MODEL_ID = 'TRL1218052175389786112';
const LIST_MODEL_REGION_TAG = 'list_models';
const GET_MODEL_REGION_TAG = 'get_model';
const LIST_MODEL_EVALUATION_REGION_TAG = 'list_model_evaluations';
const GET_MODEL_EVALUATION_REGION_TAG = 'get_model_evaluation';
const LIST_OPERATION_STATUS_REGION_TAG = 'list_operation_status';
const GET_OPERATION_STATUS_REGION_TAG = 'get_operation_status';

const CREATE_MODEL_REGION_TAG = 'translate_create_model';
const DELETE_MODEL_REGION_TAG = 'delete_model';

describe('Automl Translate Model Tests', () => {
  const client = new AutoMlClient();

  it('should list and get model, list and get model evaluations', async () => {
    const projectId = await client.getProjectId();

    // list models
    const list_model_output = execSync(`node ${LIST_MODEL_REGION_TAG}.js ${projectId}`);
    assert.match(list_model_output, /Model id:/);
    const modelId = list_model_output.split('Model id: ')[1].split('\n')[0];

    // get model
    const get_model_output = execSync(`node ${GET_MODEL_REGION_TAG}.js ${projectId} ${modelId}`);
    assert.match(get_model_output, /Model id/);

    // list model evaluations
    const list_model_eval_output = execSync(`node ${LIST_MODEL_EVALUATION_REGION_TAG}.js ${projectId} ${modelId}`);
    assert.match(list_model_eval_output, /Model evaluation name/);
    const modelEvaluationId = list_model_eval_output.split(`${modelId}/modelEvaluations/`)[1].split('\n')[0];

    // get model evaluation
    const get_model_eval_output = execSync(`node ${GET_MODEL_EVALUATION_REGION_TAG}.js ${projectId} ${modelId} ${modelEvaluationId}`);
    assert.match(get_model_eval_output, /Model evaluation name/);
  });

  it('should list / get operation status', async () => {
    const projectId = await client.getProjectId();
    
    const list_output = execSync(`node ${LIST_OPERATION_STATUS_REGION_TAG}.js ${projectId}`)
    assert.match(list_output, /Operation details/);
    const operation_id = list_output.split('Name: ')[1].split('\n')[0];

    const get_output = execSync(`node ${GET_OPERATION_STATUS_REGION_TAG}.js ${operation_id}`)
    assert.match(get_output, /Operation details/);
  });

  // it('should create a model', async () => {
  //   const projectId = await client.getProjectId();
  //   const create_output = execSync(`node ${CREATE_MODEL_REGION_TAG}.js ${projectId} ${DATASET_ID} translation_test_create_model`)

  //   assert.match(create_output, /Training started/);

  //   const operationId = create_output.split('Training operation name: ')[1].split('\n')[0]
  //   client.operationsClient.cancelOperation(operationId);
  // });

  // it('should delete a model', async () => {
  //   // As model creation can take many hours, instead try to delete a
  //   // nonexistent model and confirm that the model was not found, but other
  //   // elements of the request were valid.
  //   const projectId = await client.getProjectId();
  //   const delete_output = execSync(`node ${DELETE_MODEL_REGION_TAG}.js ${projectId} TRL0000000000000000000`)

  //   assert.match(delete_output, /NOT_FOUND/);
  //   assert.match(delete_output, /The model does not exist./);
  // });
});
