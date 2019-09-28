const secureApi = require('./index');

describe('Secure API', () => {
  it('should get authorization url', () => {
    expect(secureApi.authorizationUrl).toBeDefined();
  })
})