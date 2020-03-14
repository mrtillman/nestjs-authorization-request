const sinon = require('sinon');
const { GetCountersUseCase } = require('../Release/Application/get-counters.use-case');
const { ServiceAgent } = require('../Release/Infrastructure/service-agent');
const { CounterService } = require('../Release/Services/counter.service');

const counters = [
  {
    "_id": "5d16c0cd11ee4a3d6f44b045",
    "name": "alcohol",
    "value": 0,
    "skip": 1,
  },
  {
    "_id": "5d16c0cd11ee4a3d6f44b046",
    "name": "tobacco",
    "value": 0,
    "skip": 1,
  },
  {
    "_id": "5d16c0cd11ee4a3d6f44b047",
    "name": "firearms",
    "value": 0,
    "skip": 1,
  }
];

const serviceAgent = new ServiceAgent();
const fetchCountersMethod = sinon.stub();
fetchCountersMethod.returns({
  ok: true, json: () => Promise.resolve(counters)
});
serviceAgent.fetchCounters = fetchCountersMethod;

const counterService = new CounterService(serviceAgent);

module.exports = class World {
  constructor() {
    this.usecase = new GetCountersUseCase(counterService);
  }
};
