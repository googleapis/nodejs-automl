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
  filter = 'FILTER_EXPRESSION'
) {
  // [START automl_vision_object_detection_list_models]
  /**
   * Demonstrates using the AutoML client to list all models.
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = '[PROJECT_ID]' e.g., "my-gcloud-project";
  // const computeRegion = '[REGION_NAME]' e.g., "us-central1";
  // const filter_ = '[FILTER_EXPRESSIONS]'
  // e.g., "imageObjectDetectionModelMetadata:*";

  //Imports the Google Cloud Automl library
  const {AutomlClient} = require('@google-cloud/automl').v1beta1;

  // Instantiates a client
  const automlClient = new AutomlClient();
  async function listModels() {
    // A resource that represents Google Cloud Platform location.
    const projectLocation = automlClient.locationPath(projectId, computeRegion);

    // List all the models available in the region by applying filter.
    automlClient
      .listModels({parent: projectLocation, filter: filter})
      .then(responses => {
        const model = responses[0];

        // Display the model information.
        console.log(`List of models:`);
        for (let i = 0; i < model.length; i++) {
          console.log(`\nModel name: ${model[i].name}`);
          console.log(`Model Id: ${model[i].name.split(`/`).pop(-1)}`);
          console.log(`Model display name: ${model[i].displayName}`);
          console.log(`Dataset Id: ${model[i].datasetId}`);

          if (model[i].modelMetadata === `translationModelMetadata`) {
            console.log(`Translation model metadata:`);
            console.log(
              `\tBase model: ${model[i].translationModelMetadata.baseModel}`
            );
            console.log(
              `\tSource language code: ${
                model[i].translationModelMetadata.sourceLanguageCode
              }`
            );
            console.log(
              `\tTarget language code: ${
                model[i].translationModelMetadata.targetLanguageCode
              }`
            );
          } else if (
            model[i].modelMetadata === `textClassificationModelMetadata`
          ) {
            console.log(
              `Text classification model metadata: , ${
                model[i].textClassificationModelMetadata
              }`
            );
          } else if (
            model[i].modelMetadata === `imageClassificationModelMetadata`
          ) {
            console.log(`Image classification model metadata:`);
            console.log(
              `\tBase model Id: ${
                model[i].imageClassificationModelMetadata.baseModelId
              }`
            );
            console.log(
              `\tTrain budget: ${
                model[i].imageClassificationModelMetadata.trainBudget
              }`
            );
            console.log(
              `\tTrain cost: ${
                model[i].imageClassificationModelMetadata.trainCost
              }`
            );
            console.log(
              `\tStop reason: ${
                model[i].imageClassificationModelMetadata.stopReason
              }`
            );
          } else if (
            model[i].modelMetadata === `imageObjectDetectionModelMetadata`
          ) {
            console.log(`Image Object Detection Model metadata:`);
            console.log(
              `\tModel Type: ${
                model[i].imageObjectDetectionModelMetadata.modelType
              }`
            );
          }

          console.log(`Model deployment state: ${model[i].deploymentState}`);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
  listModels();
  // [END automl_vision_object_detection_list_models]
}
main(...process.argv.slice(2));
