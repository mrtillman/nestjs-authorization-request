const nock = require('nock');
const SERVERS = require('../servers');
const stubs = require('./index.stubs');

const secure = {
  ok: {
    getToken: () => {
      nock(SERVERS.SECURE, {
        reqheaders: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }).post('/connect/token')
        .reply(200, stubs.authResponse);
    }
  }
}

module.exports = {
  _mock: { secure }
};
