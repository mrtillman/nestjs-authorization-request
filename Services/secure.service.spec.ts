import { SecureService } from './secure.service';
import { ServiceAgent } from '../Infrastructure/service-agent';
import { ConfigService } from './config.service';
import { Mock } from 'moq.ts';
import { authRequest } from '../Common/TestDoubles/stubs';
import { AuthorizationUrlRegExp } from '../Common/auth-url.reg-exp';

const agentMock = new Mock<ServiceAgent>();

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
})