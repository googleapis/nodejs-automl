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
  modelId = 'YOUR_MODEL_ID',
  filePath = 'GCS_PATH',
  scoreThreshold = 'SCORE_THRESHOLD'
) {
  // [START automl_vision_object_detection_predict]

  /**
   * Demonstrates using the AutoML client to detect the object in an image.
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = '[PROJECT_ID]' e.g., "my-gcloud-project";
  // const computeRegion = '[REGION_NAME]' e.g., "us-central1";
  // const modelId = '[MODEL_ID]' e.g., "IOD1187015161160925184";
  // const filePath = '[GCS_PATH]' e.g., "/home/ubuntu/salad.jpg",
  // `local text file path of content to be extracted`;
  // const scoreThreshold = '[SCORE_THRESHOLD]', e.g, 0.50 ,
  // `Set the score threshold for Prediction of the created model`;

  //Imports the Google Cloud Automl library
  const {AutomlClient} = require('@google-cloud/automl').v1beta1;

  // Instantiates a client
  const automlClient = new AutomlClient();

  const fs = require(`fs`);

  async function predict() {
    // Get the full path of the model.
    const modelFullId = automlClient.modelPath(
      projectId,
      computeRegion,
      modelId
    );

    // Read the file content for prediction.
    const content = fs.readFileSync(filePath, `base64`);
    let params = {};
    if (scoreThreshold) {
      params = {
        score_threshold: scoreThreshold,
      };
    }

    // Set the payload by giving the content and type of the file.
    const payload = {
      image: {
        imageBytes: content,
      },
    };

    // params is additional domain-specific parameters.
    // currently there is no additional parameters supported.
    automlClient
      .predict({name: modelFullId, payload: payload, params: params})
      .then(responses => {
        console.log(`Prediction results:`);
        for (const result of responses[0].payload) {
          console.log(`\nPredicted class name:  ${result.displayName}`);
          console.log(
            `Predicted class score:  ${result.imageObjectDetection.score}`
          );
        }
      })

      .catch(err => {
        console.error(err);
      });
  }
  predict();
  // [END automl_vision_object_detection_predict]
}
main(...process.argv.slice(2));
