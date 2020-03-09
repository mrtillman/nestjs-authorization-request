import nock = require('nock');
import { SERVERS } from '../../Common/servers';
import { authRequest, refreshTokenRequest, authResponse, counters, token } from './stubs';
import querystring = require('querystring');

export function mockHttpRequests() {
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
}
