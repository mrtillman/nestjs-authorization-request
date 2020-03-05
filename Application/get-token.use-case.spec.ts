import { GetTokenUseCase } from './get-token.use-case';
import { Mock, It } from 'moq.ts';
import { CacheService } from '../Services/cache.service';
import { SecureService } from '../Services/secure.service';
import { AuthorizationResponse } from '../Domain/auth-response';
import { KEYS } from '../Common/keys.enum';
import { Result } from '../Common/result';

// TODO: consolidate test doubles
const token = "t0k3n";
const refreshToken = "r3fr3$ht0k3n";
const authorizationUrl = "@uth0r1z@ti0nUrl";
const authResponse = {
  accessToken: token,
  expiresIn: Date.now.toString(),
  refreshToken: refreshToken,
  scope: "openid",
  tokenType: "bearer"
} as AuthorizationResponse;
const code = "@uth0r1z@ti0nc0d3";
const state = "5t@t3";

// TODO: use mock factory to clean up tests
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
