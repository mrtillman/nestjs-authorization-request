import querystring = require('querystring');
import { SecureService } from './secure.service';
import { ServiceAgent } from '../Infrastructure/service-agent';
import { ConfigService } from './config.service';
import { Mock, It } from 'moq.ts';
import { authRequest, authResponse, code, refreshToken } from '../Common/TestDoubles/stubs';
import { AuthorizationUrlRegExp } from '../Common/auth-url.reg-exp';
import { AuthorizationRequest } from '../Domain/auth-request';

const agentMock = new Mock<ServiceAgent>();

const mockTokenResponse = {
  ok: true,
  json: () => ({
    access_token: authResponse.accessToken,
    expires_in: authResponse.expiresIn,
    scope: authResponse.scope,
    token_type: authResponse.tokenType,
    refresh_toke: authResponse.refreshToken
  })
};

agentMock.setup(agent => agent.fetchToken(It.IsAny<AuthorizationRequest>()))
          .returns(Promise.resolve(Object.assign({}, mockTokenResponse)));
agentMock.setup(agent => agent.renewToken(It.IsAny<AuthorizationRequest>()))
          .returns(Promise.resolve(Object.assign({}, mockTokenResponse)));

const configMock = {
  "CLIENT_ID": authRequest.clientId,
  "CLIENT_SECRET": authRequest.clientSecret,
  "REDIRECT_URI": authRequest.redirectUri
};

describe('SecureService', () => {
  let service: SecureService;

  beforeEach(async () => {
    service = new SecureService(new ConfigService(configMock), agentMock.object())
  })

  it('should get authorization url', () => {
    const rgx = new AuthorizationUrlRegExp();
    const isValidAuthUrl = rgx.test(service.authorizationUrl);

    expect(isValidAuthUrl).toBe(true);
  })
  it('should get token', async () => { 
    const urlParameters = querystring.parse(service.authorizationUrl);
    const stateValue = <string>urlParameters.state;
    
    const result = await service.getToken(code, stateValue);

    expect(result).toBeDefined();
  })
  it('should renew token', async () => { 
    const result = await service.renewToken(refreshToken);
    expect(result).toBeDefined();
  })
})