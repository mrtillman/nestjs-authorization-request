import { GetTokenUseCase } from './get-token.use-case';
import { Mock, It } from 'moq.ts';
import { CacheService } from '../Services/cache.service';
import { SecureService } from '../Services/secure.service';
import { AuthorizationResponse } from '../Domain/auth-response';
import { KEYS } from '../Common/keys.enum';
import { Result } from '../Common/result';
import { authResponse, authorizationUrl, code, state } from '../Common/TestDoubles/stubs';

// TODO: use mock factory; clean up tests
describe('GetTokenUseCase', () => {
  it('should get authorization response', () => {
    let useCase : GetTokenUseCase;
    const secureServiceMock = new Mock<SecureService>();
    secureServiceMock.setup(service => service.getToken(It.IsAny<string>(), It.IsAny<string>()))
                    .returns(Result.Ok(authResponse))
                    .setup(service => service.authorizationUrl)
                    .returns(authorizationUrl);
    const cacheServiceMock = new Mock<CacheService>();
    cacheServiceMock.setup(service => service.getValue<AuthorizationResponse>(KEYS.ACCESS_TOKEN))
                    .returns(null)
                    .setup(service => service.setValue(It.IsAny<KEYS>(), It.IsAny<any>()))
                    .returns(null);
    useCase = new GetTokenUseCase(secureServiceMock.object(), cacheServiceMock.object());
    useCase.code = code;
    useCase.state = state;
    const response = useCase.execute();
    expect(response).toBeDefined();
    secureServiceMock.verify(service => service.getToken(It.IsAny<string>(), It.IsAny<string>()));
  })
  it('should get authorization response from cache', () => {
    let useCase : GetTokenUseCase;
    const secureServiceMock = new Mock<SecureService>();
    secureServiceMock.setup(service => service.getToken(It.IsAny<string>(), It.IsAny<string>()))
                    .returns(Result.Ok(authResponse))
                    .setup(service => service.authorizationUrl)
                    .returns(authorizationUrl);
    const cacheServiceMock = new Mock<CacheService>();
    cacheServiceMock.setup(service => service.getValue<AuthorizationResponse>(KEYS.ACCESS_TOKEN))
                    .returns(authResponse);
    useCase = new GetTokenUseCase(secureServiceMock.object(), cacheServiceMock.object());
    useCase.code = code;
    useCase.state = state;
    const response = useCase.execute();
    expect(response).toBeDefined();
  })
})
