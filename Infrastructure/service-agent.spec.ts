import nock = require('nock');
import querystring = require('querystring');
import { ServiceAgent } from './service-agent';
import { authRequest, refreshTokenRequest, authResponse, counters, token } from '../Common/test-doubles';
import { SERVERS } from '../Common/servers';

nock(SERVERS.API)
  .get('/v1/counters')
  .matchHeader("authorization", `bearer ${token}`)
  .reply(200, counters);
nock(SERVERS.SECURE)
  .post('/connect/token', querystring.stringify({
    code: authRequest.code,
    redirect_uri: authRequest.redirectUri,
    client_id: authRequest.clientId,
    client_secret: authRequest.clientSecret,
    scope: authRequest.scope,
    grant_type: authRequest.grantType,
  }))
  .matchHeader('content-type','application/x-www-form-urlencoded')
  .matchHeader('accept','application/json')
  .reply(200, authResponse)
nock(SERVERS.SECURE)
  .post('/connect/token', querystring.stringify({
    client_id: refreshTokenRequest.clientId,
    client_secret: refreshTokenRequest.clientSecret,
    grant_type: refreshTokenRequest.grantType,
    refresh_token: refreshTokenRequest.refreshToken
  }))
  .matchHeader('content-type','application/x-www-form-urlencoded')
  .matchHeader('accept','application/json')
  .reply(200, authResponse)

describe('ServiceAgent', () => {
  let agent : ServiceAgent;
  beforeEach(() => {
    agent = new ServiceAgent();
    agent.token = token;
  })
  it('should fetch counters', async () => {
    const response : Response = await agent.fetchCounters();
    expect(response).toBeDefined();
  })
  it('should fetch token', async () => {
    const response : Response = await agent.fetchToken(authRequest);
    expect(response).toBeDefined();
  })
  it('should renew token', async () => {
    const response : Response = await agent.renewToken(refreshTokenRequest);
    expect(response).toBeDefined();
  })
})
