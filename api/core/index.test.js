require('dotenv').config();
const coreApi = require('./index');
const stubs = require('./index.stubs');
const mocks = require('./index.mocks');

describe('Core API', () => {

  it('should get counters', async () => {

    // mock successful HTTP request:
    // api.counter-culture.io/v1/counters
    mocks._mock.api.ok.getCounters();

    coreApi.token = stubs.token;
    
    const counters = await coreApi.getCounters();
    
    expect(counters).toEqual(stubs.counters);
  })
})