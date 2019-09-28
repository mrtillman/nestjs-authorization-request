require('dotenv').config();
const coreApi = require('./index');
const nock = require('nock');
const SERVERS = require('../servers');

const fakeCounters = [
  {
    _id: 1,
    name: 'thing 1',
    value: 0,
    skip: 1
  },
  {
    _id: 1,
    name: 'thing 2',
    value: 0,
    skip: 1
  }
];

const fakeToken = 'fakeToken';

const request = nock(SERVERS.API, {
  reqheaders: { 'authorization' : `bearer ${fakeToken}` }
}).get('/v1/counters');

request.reply(200, fakeCounters);

describe('Core API', () => {
  it('should get counters', async () => {
    coreApi.token = fakeToken;
    const counters = await coreApi.getCounters();
    expect(counters).toEqual(fakeCounters);
  })
})