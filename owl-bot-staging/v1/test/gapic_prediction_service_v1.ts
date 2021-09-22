// Copyright 2021 Google LLC
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
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

import * as protos from '../protos/protos';
import * as assert from 'assert';
import * as sinon from 'sinon';
import {SinonStub} from 'sinon';
import { describe, it } from 'mocha';
import * as predictionserviceModule from '../src';

import {protobuf, LROperation, operationsProtos} from 'google-gax';

function generateSampleMessage<T extends object>(instance: T) {
    const filledObject = (instance.constructor as typeof protobuf.Message)
        .toObject(instance as protobuf.Message<T>, {defaults: true});
    return (instance.constructor as typeof protobuf.Message).fromObject(filledObject) as T;
}

function stubSimpleCall<ResponseType>(response?: ResponseType, error?: Error) {
    return error ? sinon.stub().rejects(error) : sinon.stub().resolves([response]);
}

function stubSimpleCallWithCallback<ResponseType>(response?: ResponseType, error?: Error) {
    return error ? sinon.stub().callsArgWith(2, error) : sinon.stub().callsArgWith(2, null, response);
}

function stubLongRunningCall<ResponseType>(response?: ResponseType, callError?: Error, lroError?: Error) {
    const innerStub = lroError ? sinon.stub().rejects(lroError) : sinon.stub().resolves([response]);
    const mockOperation = {
        promise: innerStub,
    };
    return callError ? sinon.stub().rejects(callError) : sinon.stub().resolves([mockOperation]);
}

function stubLongRunningCallWithCallback<ResponseType>(response?: ResponseType, callError?: Error, lroError?: Error) {
    const innerStub = lroError ? sinon.stub().rejects(lroError) : sinon.stub().resolves([response]);
    const mockOperation = {
        promise: innerStub,
    };
    return callError ? sinon.stub().callsArgWith(2, callError) : sinon.stub().callsArgWith(2, null, mockOperation);
}

describe('v1.PredictionServiceClient', () => {
    it('has servicePath', () => {
        const servicePath = predictionserviceModule.v1.PredictionServiceClient.servicePath;
        assert(servicePath);
    });

    it('has apiEndpoint', () => {
        const apiEndpoint = predictionserviceModule.v1.PredictionServiceClient.apiEndpoint;
        assert(apiEndpoint);
    });

    it('has port', () => {
        const port = predictionserviceModule.v1.PredictionServiceClient.port;
        assert(port);
        assert(typeof port === 'number');
    });

    it('should create a client with no option', () => {
        const client = new predictionserviceModule.v1.PredictionServiceClient();
        assert(client);
    });

    it('should create a client with gRPC fallback', () => {
        const client = new predictionserviceModule.v1.PredictionServiceClient({
            fallback: true,
        });
        assert(client);
    });

    it('has initialize method and supports deferred initialization', async () => {
        const client = new predictionserviceModule.v1.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
        assert.strictEqual(client.predictionServiceStub, undefined);
        await client.initialize();
        assert(client.predictionServiceStub);
    });

    it('has close method', () => {
        const client = new predictionserviceModule.v1.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
        client.close();
    });

    it('has getProjectId method', async () => {
        const fakeProjectId = 'fake-project-id';
        const client = new predictionserviceModule.v1.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
        client.auth.getProjectId = sinon.stub().resolves(fakeProjectId);
        const result = await client.getProjectId();
        assert.strictEqual(result, fakeProjectId);
        assert((client.auth.getProjectId as SinonStub).calledWithExactly());
    });

    it('has getProjectId method with callback', async () => {
        const fakeProjectId = 'fake-project-id';
        const client = new predictionserviceModule.v1.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
        client.auth.getProjectId = sinon.stub().callsArgWith(0, null, fakeProjectId);
        const promise = new Promise((resolve, reject) => {
            client.getProjectId((err?: Error|null, projectId?: string|null) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(projectId);
                }
            });
        });
        const result = await promise;
        assert.strictEqual(result, fakeProjectId);
    });

    describe('predict', () => {
        it('invokes predict without error', async () => {
            const client = new predictionserviceModule.v1.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.automl.v1.PredictRequest());
            request.name = '';
            const expectedHeaderRequestParams = "name=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.cloud.automl.v1.PredictResponse());
            client.innerApiCalls.predict = stubSimpleCall(expectedResponse);
            const [response] = await client.predict(request);
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.predict as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes predict without error using callback', async () => {
            const client = new predictionserviceModule.v1.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.automl.v1.PredictRequest());
            request.name = '';
            const expectedHeaderRequestParams = "name=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.cloud.automl.v1.PredictResponse());
            client.innerApiCalls.predict = stubSimpleCallWithCallback(expectedResponse);
            const promise = new Promise((resolve, reject) => {
                 client.predict(
                    request,
                    (err?: Error|null, result?: protos.google.cloud.automl.v1.IPredictResponse|null) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
            });
            const response = await promise;
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.predict as SinonStub)
                .getCall(0).calledWith(request, expectedOptions /*, callback defined above */));
        });

        it('invokes predict with error', async () => {
            const client = new predictionserviceModule.v1.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.automl.v1.PredictRequest());
            request.name = '';
            const expectedHeaderRequestParams = "name=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedError = new Error('expected');
            client.innerApiCalls.predict = stubSimpleCall(undefined, expectedError);
            await assert.rejects(client.predict(request), expectedError);
            assert((client.innerApiCalls.predict as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });
    });

    describe('batchPredict', () => {
        it('invokes batchPredict without error', async () => {
            const client = new predictionserviceModule.v1.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.automl.v1.BatchPredictRequest());
            request.name = '';
            const expectedHeaderRequestParams = "name=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.longrunning.Operation());
            client.innerApiCalls.batchPredict = stubLongRunningCall(expectedResponse);
            const [operation] = await client.batchPredict(request);
            const [response] = await operation.promise();
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.batchPredict as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes batchPredict without error using callback', async () => {
            const client = new predictionserviceModule.v1.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.automl.v1.BatchPredictRequest());
            request.name = '';
            const expectedHeaderRequestParams = "name=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedResponse = generateSampleMessage(new protos.google.longrunning.Operation());
            client.innerApiCalls.batchPredict = stubLongRunningCallWithCallback(expectedResponse);
            const promise = new Promise((resolve, reject) => {
                 client.batchPredict(
                    request,
                    (err?: Error|null,
                     result?: LROperation<protos.google.cloud.automl.v1.IBatchPredictResult, protos.google.cloud.automl.v1.IOperationMetadata>|null
                    ) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
            });
            const operation = await promise as LROperation<protos.google.cloud.automl.v1.IBatchPredictResult, protos.google.cloud.automl.v1.IOperationMetadata>;
            const [response] = await operation.promise();
            assert.deepStrictEqual(response, expectedResponse);
            assert((client.innerApiCalls.batchPredict as SinonStub)
                .getCall(0).calledWith(request, expectedOptions /*, callback defined above */));
        });

        it('invokes batchPredict with call error', async () => {
            const client = new predictionserviceModule.v1.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.automl.v1.BatchPredictRequest());
            request.name = '';
            const expectedHeaderRequestParams = "name=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedError = new Error('expected');
            client.innerApiCalls.batchPredict = stubLongRunningCall(undefined, expectedError);
            await assert.rejects(client.batchPredict(request), expectedError);
            assert((client.innerApiCalls.batchPredict as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes batchPredict with LRO error', async () => {
            const client = new predictionserviceModule.v1.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const request = generateSampleMessage(new protos.google.cloud.automl.v1.BatchPredictRequest());
            request.name = '';
            const expectedHeaderRequestParams = "name=";
            const expectedOptions = {
                otherArgs: {
                    headers: {
                        'x-goog-request-params': expectedHeaderRequestParams,
                    },
                },
            };
            const expectedError = new Error('expected');
            client.innerApiCalls.batchPredict = stubLongRunningCall(undefined, undefined, expectedError);
            const [operation] = await client.batchPredict(request);
            await assert.rejects(operation.promise(), expectedError);
            assert((client.innerApiCalls.batchPredict as SinonStub)
                .getCall(0).calledWith(request, expectedOptions, undefined));
        });

        it('invokes checkBatchPredictProgress without error', async () => {
            const client = new predictionserviceModule.v1.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const expectedResponse = generateSampleMessage(new operationsProtos.google.longrunning.Operation());
            expectedResponse.name = 'test';
            expectedResponse.response = {type_url: 'url', value: Buffer.from('')};
            expectedResponse.metadata = {type_url: 'url', value: Buffer.from('')}

            client.operationsClient.getOperation = stubSimpleCall(expectedResponse);
            const decodedOperation = await client.checkBatchPredictProgress(expectedResponse.name);
            assert.deepStrictEqual(decodedOperation.name, expectedResponse.name);
            assert(decodedOperation.metadata);
            assert((client.operationsClient.getOperation as SinonStub).getCall(0));
        });

        it('invokes checkBatchPredictProgress with error', async () => {
            const client = new predictionserviceModule.v1.PredictionServiceClient({
              credentials: {client_email: 'bogus', private_key: 'bogus'},
              projectId: 'bogus',
        });
            client.initialize();
            const expectedError = new Error('expected');

            client.operationsClient.getOperation = stubSimpleCall(undefined, expectedError);
            await assert.rejects(client.checkBatchPredictProgress(''), expectedError);
            assert((client.operationsClient.getOperation as SinonStub)
                .getCall(0));
        });
    });

    describe('Path templates', () => {

        describe('annotationSpec', () => {
            const fakePath = "/rendered/path/annotationSpec";
            const expectedParameters = {
                project: "projectValue",
                location: "locationValue",
                dataset: "datasetValue",
                annotation_spec: "annotationSpecValue",
            };
            const client = new predictionserviceModule.v1.PredictionServiceClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            client.pathTemplates.annotationSpecPathTemplate.render =
                sinon.stub().returns(fakePath);
            client.pathTemplates.annotationSpecPathTemplate.match =
                sinon.stub().returns(expectedParameters);

            it('annotationSpecPath', () => {
                const result = client.annotationSpecPath("projectValue", "locationValue", "datasetValue", "annotationSpecValue");
                assert.strictEqual(result, fakePath);
                assert((client.pathTemplates.annotationSpecPathTemplate.render as SinonStub)
                    .getCall(-1).calledWith(expectedParameters));
            });

            it('matchProjectFromAnnotationSpecName', () => {
                const result = client.matchProjectFromAnnotationSpecName(fakePath);
                assert.strictEqual(result, "projectValue");
                assert((client.pathTemplates.annotationSpecPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchLocationFromAnnotationSpecName', () => {
                const result = client.matchLocationFromAnnotationSpecName(fakePath);
                assert.strictEqual(result, "locationValue");
                assert((client.pathTemplates.annotationSpecPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchDatasetFromAnnotationSpecName', () => {
                const result = client.matchDatasetFromAnnotationSpecName(fakePath);
                assert.strictEqual(result, "datasetValue");
                assert((client.pathTemplates.annotationSpecPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchAnnotationSpecFromAnnotationSpecName', () => {
                const result = client.matchAnnotationSpecFromAnnotationSpecName(fakePath);
                assert.strictEqual(result, "annotationSpecValue");
                assert((client.pathTemplates.annotationSpecPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });
        });

        describe('dataset', () => {
            const fakePath = "/rendered/path/dataset";
            const expectedParameters = {
                project: "projectValue",
                location: "locationValue",
                dataset: "datasetValue",
            };
            const client = new predictionserviceModule.v1.PredictionServiceClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            client.pathTemplates.datasetPathTemplate.render =
                sinon.stub().returns(fakePath);
            client.pathTemplates.datasetPathTemplate.match =
                sinon.stub().returns(expectedParameters);

            it('datasetPath', () => {
                const result = client.datasetPath("projectValue", "locationValue", "datasetValue");
                assert.strictEqual(result, fakePath);
                assert((client.pathTemplates.datasetPathTemplate.render as SinonStub)
                    .getCall(-1).calledWith(expectedParameters));
            });

            it('matchProjectFromDatasetName', () => {
                const result = client.matchProjectFromDatasetName(fakePath);
                assert.strictEqual(result, "projectValue");
                assert((client.pathTemplates.datasetPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchLocationFromDatasetName', () => {
                const result = client.matchLocationFromDatasetName(fakePath);
                assert.strictEqual(result, "locationValue");
                assert((client.pathTemplates.datasetPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchDatasetFromDatasetName', () => {
                const result = client.matchDatasetFromDatasetName(fakePath);
                assert.strictEqual(result, "datasetValue");
                assert((client.pathTemplates.datasetPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });
        });

        describe('model', () => {
            const fakePath = "/rendered/path/model";
            const expectedParameters = {
                project: "projectValue",
                location: "locationValue",
                model: "modelValue",
            };
            const client = new predictionserviceModule.v1.PredictionServiceClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            client.pathTemplates.modelPathTemplate.render =
                sinon.stub().returns(fakePath);
            client.pathTemplates.modelPathTemplate.match =
                sinon.stub().returns(expectedParameters);

            it('modelPath', () => {
                const result = client.modelPath("projectValue", "locationValue", "modelValue");
                assert.strictEqual(result, fakePath);
                assert((client.pathTemplates.modelPathTemplate.render as SinonStub)
                    .getCall(-1).calledWith(expectedParameters));
            });

            it('matchProjectFromModelName', () => {
                const result = client.matchProjectFromModelName(fakePath);
                assert.strictEqual(result, "projectValue");
                assert((client.pathTemplates.modelPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchLocationFromModelName', () => {
                const result = client.matchLocationFromModelName(fakePath);
                assert.strictEqual(result, "locationValue");
                assert((client.pathTemplates.modelPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchModelFromModelName', () => {
                const result = client.matchModelFromModelName(fakePath);
                assert.strictEqual(result, "modelValue");
                assert((client.pathTemplates.modelPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });
        });

        describe('modelEvaluation', () => {
            const fakePath = "/rendered/path/modelEvaluation";
            const expectedParameters = {
                project: "projectValue",
                location: "locationValue",
                model: "modelValue",
                model_evaluation: "modelEvaluationValue",
            };
            const client = new predictionserviceModule.v1.PredictionServiceClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            client.initialize();
            client.pathTemplates.modelEvaluationPathTemplate.render =
                sinon.stub().returns(fakePath);
            client.pathTemplates.modelEvaluationPathTemplate.match =
                sinon.stub().returns(expectedParameters);

            it('modelEvaluationPath', () => {
                const result = client.modelEvaluationPath("projectValue", "locationValue", "modelValue", "modelEvaluationValue");
                assert.strictEqual(result, fakePath);
                assert((client.pathTemplates.modelEvaluationPathTemplate.render as SinonStub)
                    .getCall(-1).calledWith(expectedParameters));
            });

            it('matchProjectFromModelEvaluationName', () => {
                const result = client.matchProjectFromModelEvaluationName(fakePath);
                assert.strictEqual(result, "projectValue");
                assert((client.pathTemplates.modelEvaluationPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchLocationFromModelEvaluationName', () => {
                const result = client.matchLocationFromModelEvaluationName(fakePath);
                assert.strictEqual(result, "locationValue");
                assert((client.pathTemplates.modelEvaluationPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchModelFromModelEvaluationName', () => {
                const result = client.matchModelFromModelEvaluationName(fakePath);
                assert.strictEqual(result, "modelValue");
                assert((client.pathTemplates.modelEvaluationPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });

            it('matchModelEvaluationFromModelEvaluationName', () => {
                const result = client.matchModelEvaluationFromModelEvaluationName(fakePath);
                assert.strictEqual(result, "modelEvaluationValue");
                assert((client.pathTemplates.modelEvaluationPathTemplate.match as SinonStub)
                    .getCall(-1).calledWith(fakePath));
            });
        });
    });
});
