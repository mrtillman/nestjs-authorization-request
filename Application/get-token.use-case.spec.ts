import { GetTokenUseCase } from './get-token.use-case';
import { Mock, It } from 'moq.ts';
import { CacheService } from '../Services/cache.service';
import { SecureService } from '../Services/secure.service';
import { AuthorizationResponse } from '../Domain/auth-response';
import { KEYS } from '../Common/keys.enum';
import { Result } from '../Common/result';
import { authResponse, authorizationUrl, code, state } from '../Common/test-doubles';
import { called } from '../Common/test-helpers';

let secureServiceMock: Mock<SecureService>;
let cacheServiceMock: Mock<CacheService>;

const getUseCase = (): GetTokenUseCase => {
  const useCase = new GetTokenUseCase(secureServiceMock.object(), cacheServiceMock.object());
  useCase.code = code;
  useCase.state = state;
  return useCase;
};

const mockSecureService = (): Mock<SecureService> => {
  const secureServiceMock = new Mock<SecureService>();
  secureServiceMock.setup(service => service.getToken(It.IsAny<string>(), It.IsAny<string>()))
                   .returns(Result.Ok(authResponse))
                   .setup(service => service.authorizationUrl)
                   .returns(authorizationUrl);
  return secureServiceMock;
}

describe('GetTokenUseCase', () => {
  beforeEach(() => {
    secureServiceMock = mockSecureService();
    cacheServiceMock = new Mock<CacheService>();
  })
  it('should get authorization response', async () => {
    cacheServiceMock.setup(service => service.getValue<AuthorizationResponse>(KEYS.ACCESS_TOKEN))
                    .returns(null)
                    .setup(service => service.setValue(KEYS.ACCESS_TOKEN, It.IsAny()))
                    .returns(null);
    const useCase = getUseCase();

    const response = await useCase.execute();
    
    expect(response.DidSucceed).toBe(true);
    secureServiceMock.verify(service => service.getToken(It.IsAny<string>(), It.IsAny<string>()), called(1));
  })
  it('should get cached authorization response', async () => {
    cacheServiceMock.setup(service => service.getValue<AuthorizationResponse>(KEYS.ACCESS_TOKEN))
                    .returns(authResponse);
    const useCase = getUseCase();

    const response = await useCase.execute();

    expect(response.DidSucceed).toBe(true);
    secureServiceMock.verify(service => service.getToken(It.IsAny<string>(), It.IsAny<string>()), called(0));
  })
})
