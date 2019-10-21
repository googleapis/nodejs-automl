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

function main(
  projectId = 'YOUR_PROJECT_ID',
  location = 'us-central1',
  modelId = 'YOUR_MODEL_ID',
  modelEvaluationId = 'YOUR_MODEL_EVALUATION_ID'
) {
  // [START automl_get_model_evaluation]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const projectId = 'YOUR_PROJECT_ID';
  // const location = 'us-central1';
  // const modelId = 'YOUR_MODEL_ID';
  // const modelEvaluationId = 'YOUR_MODEL_EVALUATION_ID';

  // Imports the Google Cloud AutoML library
  const {AutoMlClient} = require(`@google-cloud/automl`);

  // Instantiates a client
  const client = new AutoMlClient();

  async function getModelEvaluation() {
    // Construct request
    const request = {
      name: client.modelEvaluationPath(
        projectId,
        location,
        modelId,
        modelEvaluationId
      ),
    };

    const [response] = await client.getModelEvaluation(request);

    console.log(`Model evaluation name: ${response.name}`);
    console.log(`Model annotation spec id: ${response.annotationSpecId}`);
    console.log(`Model display name: ${response.displayName}`);
    console.log(`Model create time`);
    console.log(`\tseconds ${response.createTime.seconds}`);
    console.log(`\tnanos ${response.createTime.nanos / 1e9}`);
    console.log(`Evaluation example count: ${response.evaluatedExampleCount}`);
    console.log(
      `Model evaluation metrics: ${response.translationEvaluationMetrics}`
    );
  }

  getModelEvaluation();
  // [END automl_get_model_evaluation]
}

main(...process.argv.slice(2));
