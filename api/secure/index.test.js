const secureApi = require('./index');
const regexes = require('./regexes');
const utils = require('../../utils');
const stubs = require('./index.stubs');
const mocks = require('./index.mocks');

describe('Secure API', () => {

  it('should get authorization url', () => {
    expect(regexes.authorizationUrl
                  .test(secureApi.authorizationUrl))
                  .toBe(true);
  })

  it('should get token', async () => {

    // mock successful HTTP request:
    // secure.counter-culture.io/connect/token
    mocks._mock.secure.ok.getToken();

    const state = utils.queryParams(secureApi.authorizationUrl)
                       .get('state');

    const access_token = await secureApi.getToken(stubs.authorization_code, state);
    
    expect(access_token).toBe(stubs.authResponse.access_token);
  })
})