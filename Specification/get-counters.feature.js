const { GetCountersUseCase } = require('../Release/Application/get-counters.use-case');
const BaseFeature = require('./base.feature');

module.exports = class GetCountersFeature extends BaseFeature {
  constructor(){
    super();
    const service = { getCounters: () => Promise.resolve(this.counters) };
    this.usecase = new GetCountersUseCase(service);
  }
};
