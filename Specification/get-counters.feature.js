const GetCountersUseCaseImport = require('../dist/Application/get-counters.use-case');
const GetCountersUseCase = GetCountersUseCaseImport.default;
const BaseFeature = require('./base.feature');

module.exports = class GetCountersFeature extends BaseFeature {
  constructor(){
    super();
    const service = { getCounters: () => Promise.resolve(this.counters) };
    this.usecase = new GetCountersUseCase(service);
  }
};
