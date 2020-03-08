import { Mock, It } from 'moq.ts';
import { RenewTokenUseCase } from './renew-token.use-case';
import { SecureService } from '../Services/secure.service';
import { CacheService } from '../Services/cache.service';
import { refreshToken, authResponse } from '../Common/TestDoubles/stubs';
import { KEYS } from '../Common/keys.enum';
import { AuthorizationResponse } from '../Domain/auth-response';
import { Result } from '../Common/result';

let secureServiceMock: Mock<SecureService>;
let cacheServiceMock: Mock<CacheService>;

const getUseCase = (): RenewTokenUseCase => {
  return new RenewTokenUseCase(secureServiceMock.object(), cacheServiceMock.object());
};

describe('RenewTokenUseCase', () => {
  beforeEach(() => {
    secureServiceMock = new Mock<SecureService>();
    cacheServiceMock = new Mock<CacheService>();
  })
  it('should return null if refresh token is null', async () => {
    cacheServiceMock
      .setup(service => service.getValue(KEYS.REFRESH_TOKEN))
      .returns(null)
      .setup(service => service.setValue(KEYS.REFRESH_TOKEN, It.IsAny<any>()))
      .returns(null);
    const useCase = getUseCase();

    const response = await useCase.execute();

    expect(response).toBeNull();
  })
  it('should update refresh token', async () => {
    const newAuthResponse = Object.create(authResponse) as AuthorizationResponse;
    newAuthResponse.refreshToken = `new${refreshToken}`;
    cacheServiceMock
      .setup(service => service.getValue(KEYS.REFRESH_TOKEN))
      .returns(authResponse.refreshToken)
      .setup(service => service.setValue(KEYS.REFRESH_TOKEN, It.IsAny<any>()))
      .returns(null);
    secureServiceMock
      .setup(service => service.renewToken(It.IsAny<string>()))
      .returns(Promise.resolve(Result.Ok(newAuthResponse)));
    const useCase = getUseCase();
    useCase.refreshToken = refreshToken;

    const response = await useCase.execute();

    expect(response).toBeDefined();
    expect(response.refreshToken).toBe(newAuthResponse.refreshToken);
  })
})
