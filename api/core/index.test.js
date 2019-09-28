require('dotenv').config();
const coreApi = require('./index');
const stubs = require('./index.stubs');
const mock = require('./index.mock');

// mock successful api call to
// api.counter-culture.io/v1/counters
mock.api.ok.getCounters();

describe('Core API', () => {
  it('should get counters', async () => {
    coreApi.token = stubs.token;
    const counters = await coreApi.getCounters();
    expect(counters).toEqual(stubs.counters);
  })
})