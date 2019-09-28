const nock = require('nock');
const SERVERS = require('../servers');
const { counters, token } = require('./index.stubs');

const api = {
  ok: {
    getCounters: () => {
      nock(SERVERS.API, {
        reqheaders: { 'authorization' : `bearer ${token}` }
      }).get('/v1/counters')
        .reply(200, counters);
    }
  }
}

module.exports = {
  _mock: { api }
};
