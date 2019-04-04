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

`use strict`;
function main(
  projectId = 'YOUR_PROJECT_ID',
  computeRegion = 'YOUR_REGION_NAME',
  modelId = 'MODEL_ID'
) {
  // [START automl_vision_object_detection_get_model]
  /**
   * Demonstrates using the AutoML client to get model details.
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = '[PROJECT_ID]' e.g., "my-gcloud-project";
  // const computeRegion = '[REGION_NAME]' e.g., "us-central1";
  // const modelId = '[MODEL_ID]' e.g., "IOD1187015161160925184";

  //Imports the Google Cloud Automl library
  const {AutomlClient} = require('@google-cloud/automl').v1beta1;

  // Instantiates a client
  const automlClient = new AutomlClient();

  async function getModel() {
    // Get the full path of the model.
    const modelFullId = automlClient.modelPath(
      projectId,
      computeRegion,
      modelId
    );

    // Get complete detail of the model.
    automlClient
      .getModel({name: modelFullId})
      .then(responses => {
        const model = responses[0];

        // Display the model information.
        console.log(`Model name: ${model.name}`);
        console.log(`Model Id: ${model.name.split(`/`).pop(-1)}`);
        console.log(`Model display name: ${model.displayName}`);
        console.log(`Dataset Id: ${model.datasetId}`);

        if (model.modelMetadata === `translationModelMetadata`) {
          console.log(`Translation model metadata:`);
          console.log(
            `\tBase model: ${model.translationModelMetadata.baseModel}`
          );
          console.log(
            `\tSource language code: ${
              model.translationModelMetadata.sourceLanguageCode
            }`
          );
          console.log(
            `\tTarget language code: ${
              model.translationModelMetadata.targetLanguageCode
            }`
          );
        } else if (model.modelMetadata === `textClassificationModelMetadata`) {
          console.log(
            `Text classification model metadata: , ${
              model.textClassificationModelMetadata
            }`
          );
        } else if (model.modelMetadata === `imageClassificationModelMetadata`) {
          console.log(`Image classification model metadata:`);
          console.log(
            `\tBase model Id: ${
              model.imageClassificationModelMetadata.baseModelId
            }`
          );
          console.log(
            `\tTrain budget: ${
              model.imageClassificationModelMetadata.trainBudget
            }`
          );
          console.log(
            `\tTrain cost: ${model.imageClassificationModelMetadata.trainCost}`
          );
          console.log(
            `\tStop reason: ${
              model.imageClassificationModelMetadata.stopReason
            }`
          );
        } else if (
          model.modelMetadata === `imageObjectDetectionModelMetadata`
        ) {
          console.log(`Image Object Detection Model metadata:`);
          console.log(
            `\tModel Type: ${model.imageObjectDetectionModelMetadata.modelType}`
          );
        }
        console.log(`Model deployment state: ${model.deploymentState}`);
      })
      .catch(err => {
        console.error(err);
      });
  }
  getModel();
  // [END automl_vision_object_detection_get_model]
}
main(...process.argv.slice(2));
