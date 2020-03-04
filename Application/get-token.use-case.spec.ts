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

const secureServiceMock = new Mock<SecureService>();
secureServiceMock.setup(service => service.getToken(It.IsAny<string>(), It.IsAny<string>()))
                 .returns(Result.Ok(authResponse))
                 .setup(service => service.authorizationUrl)
                 .returns(authorizationUrl);
const cacheServiceMock = new Mock<CacheService>();
cacheServiceMock.setup(service => service.getValue<AuthorizationResponse>(KEYS.ACCESS_TOKEN))
                .returns(authResponse);

describe('GetTokenUseCase', () => {
  let useCase : GetTokenUseCase;
  beforeEach(() => {
    useCase = new GetTokenUseCase(secureServiceMock.object(), cacheServiceMock.object());
  })
  it('should get authorization response', () => {
    useCase.code = "authorization code";
    useCase.state = "$t@t3";
    const response = useCase.execute();
    expect(response).toBeDefined();
  })
})
