import { GetTokenUseCase } from './get-token.use-case';
import { Mock, It } from 'moq.ts';
import { CacheService } from '../Services/cache.service';
import { SecureService } from '../Services/secure.service';
import { AuthorizationResponse } from '../Domain/auth-response';
import { KEYS } from '../Common/keys.enum';
import { Result } from '../Common/result';
import { authResponse, authorizationUrl, code, state } from '../Common/TestDoubles/stubs';

let secureServiceMock: Mock<SecureService>;
let cacheServiceMock: Mock<CacheService>;

const getUseCase = (
    secureServiceMock: Mock<SecureService>,
    cacheServiceMock: Mock<CacheService>
  ): GetTokenUseCase => {
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
  it('should get authorization response', () => {
    cacheServiceMock.setup(service => service.getValue<AuthorizationResponse>(KEYS.ACCESS_TOKEN))
                    .returns(null)
                    .setup(service => service.setValue(KEYS.ACCESS_TOKEN, It.IsAny<any>()))
                    .returns(null);
    const useCase = getUseCase(secureServiceMock, cacheServiceMock);

    const response = useCase.execute();
    
    expect(response).toBeDefined();
    secureServiceMock.verify(service => service.getToken(It.IsAny<string>(), It.IsAny<string>()));
  })
  it('should get authorization response from cache', () => {
    cacheServiceMock.setup(service => service.getValue<AuthorizationResponse>(KEYS.ACCESS_TOKEN))
                    .returns(authResponse);
    const useCase = getUseCase(secureServiceMock, cacheServiceMock);

    const response = useCase.execute();

    expect(response).toBeDefined();
  })
})
