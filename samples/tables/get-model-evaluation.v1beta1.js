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

'use strict';
async function main(
  projectId = 'YOUR_PROJECT_ID',
  computeRegion = 'YOUR_REGION_NAME',
  modelId = 'MODEL_ID',
  modelEvaluationId = 'MODEL_EVALUATION_ID'
) {
  // [START automl_tables_get_model_evaluation]
  const automl = require('@google-cloud/automl');
  const math = require('mathjs');
  const client = new automl.v1beta1.AutoMlClient();

  /**
   * Demonstrates using the AutoML client to get model evaluations.
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = '[PROJECT_ID]' e.g., "my-gcloud-project";
  // const computeRegion = '[REGION_NAME]' e.g., "us-central1";
  // const modelId = '[MODEL_ID]' e.g., "TBL4704590352927948800";
  // const modelEvaluationId = '[MODEL_EVALUATION_ID]'
  // e.g., "8471321031908237216";

  // Get the full path of the model evaluation.
  const modelEvaluationFullId = client.modelEvaluationPath(
    projectId,
    computeRegion,
    modelId,
    modelEvaluationId
  );

  // Get complete detail of the model evaluation.
  client
    .getModelEvaluation({name: modelEvaluationFullId})
    .then(responses => {
      const response = responses[0];

      const classMetrics = response.classificationEvaluationMetrics;
      const regressionMetrics = response.regressionEvaluationMetrics;
      const evaluationId = response.name.split(`/`)[7].split('`')[0];

      // Display the model evaluation information.
      console.log(`Model evaluation name: ${response.name}`);
      console.log(`Model evaluation Id: ${evaluationId}`);
      console.log(
        `Model evaluation annotation spec Id: ${response.annotationSpecId}`
      );
      console.log(`Model evaluation display name: ${response.displayName}`);
      console.log(
        `Model evaluation example count: ${response.evaluatedExampleCount}`
      );
      if (classMetrics) {
        const confidenceMetricsEntries = classMetrics.confidenceMetricsEntry;

        console.log(`Table classification evaluation metrics:`);
        console.log(`\tModel auPrc: ${math.round(classMetrics.auPrc, 6)}`);
        console.log(`\tModel auRoc: ${math.round(classMetrics.auRoc, 6)}`);
        console.log(`\tModel log loss: ${math.round(classMetrics.logLoss, 6)}`);

        if (confidenceMetricsEntries.length > 0) {
          console.log(`\tConfidence metrics entries:`);

          for (const confidenceMetricsEntry of confidenceMetricsEntries) {
            console.log(
              `\t\tModel confidence threshold:  ${math.round(
                confidenceMetricsEntry.confidenceThreshold,
                6
              )}`
            );
            console.log(
              `\t\tModel position threshold: ${math.round(
                confidenceMetricsEntry.positionThreshold,
                4
              )}`
            );
            console.log(
              `\t\tModel recall: ${math.round(
                confidenceMetricsEntry.recall * 100,
                2
              )} %`
            );
            console.log(
              `\t\tModel precision: ${math.round(
                confidenceMetricsEntry.precision * 100,
                2
              )} %`
            );
            console.log(
              `\t\tModel false positive rate: ${confidenceMetricsEntry.falsePositiveRate}`
            );
            console.log(
              `\t\tModel f1 score: ${math.round(
                confidenceMetricsEntry.f1Score * 100,
                2
              )} %`
            );
            console.log(
              `\t\tModel recall@1: ${math.round(
                confidenceMetricsEntry.recallAt1 * 100,
                2
              )} %`
            );
            console.log(
              `\t\tModel precision@1: ${math.round(
                confidenceMetricsEntry.precisionAt1 * 100,
                2
              )} %`
            );
            console.log(
              `\t\tModel false positive rate@1: ${confidenceMetricsEntry.falsePositiveRateAt1}`
            );
            console.log(
              `\t\tModel f1 score@1: ${math.round(
                confidenceMetricsEntry.f1ScoreAt1 * 100,
                2
              )} %`
            );
            console.log(
              `\t\tModel true positive count: ${confidenceMetricsEntry.truePositiveCount}`
            );
            console.log(
              `\t\tModel false positive count: ${confidenceMetricsEntry.falsePositiveCount}`
            );
            console.log(
              `\t\tModel false negative count: ${confidenceMetricsEntry.falseNegativeCount}`
            );
            console.log(
              `\t\tModel true negative count: ${confidenceMetricsEntry.trueNegativeCount}`
            );
            console.log(`\n`);
          }
        }
        console.log(
          `\tModel annotation spec Id: ${classMetrics.annotationSpecId}`
        );
      } else if (regressionMetrics) {
        console.log(`Table regression evaluation metrics:`);
        console.log(
          `\tModel root mean squared error: ${regressionMetrics.rootMeanSquaredError}`
        );
        console.log(
          `\tModel mean absolute error: ${regressionMetrics.meanAbsoluteError}`
        );
        console.log(
          `\tModel mean absolute percentage error: ${regressionMetrics.meanAbsolutePercentageError}`
        );
        console.log(`\tModel rSquared: ${regressionMetrics.rSquared}`);
      }
    })
    .catch(err => {
      console.error(err);
    });
  // [END automl_tables_get_model_evaluation]
}
main(...process.argv.slice(2)).catch(console.error());
