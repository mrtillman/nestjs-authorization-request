import { Mock, It } from 'moq.ts';
import { RenewTokenUseCase } from './renew-token.use-case';
import { SecureService } from '../Services/secure.service';
import { CacheService } from '../Services/cache.service';
import { refreshToken, authResponse } from '../Common/test-doubles';
import { KEYS } from '../Common/keys.enum';
import { Result } from '../Common/result';
import { called } from '../Common/test-helpers';

let secureServiceMock: Mock<SecureService>;
let cacheServiceMock: Mock<CacheService>;

describe('RenewTokenUseCase', () => {
  beforeEach(() => {
    secureServiceMock = new Mock<SecureService>();
    cacheServiceMock = new Mock<CacheService>();
  })
  it('should fail when refresh token is null', async () => {
    cacheServiceMock
      .setup(service => service.getValue(KEYS.REFRESH_TOKEN))
      .returns(null)
      .setup(service => service.setValue(KEYS.REFRESH_TOKEN, It.IsAny()))
      .returns(null);
    const useCase = new RenewTokenUseCase(secureServiceMock.object(), cacheServiceMock.object());

    const result = await useCase.execute();

    expect(result.DidFail).toBe(true);
    secureServiceMock.verify(service => service.renewToken(It.IsAny<string>()), called(0))
  })
  it('should renew token', async () => {
    cacheServiceMock
      .setup(service => service.getValue(KEYS.REFRESH_TOKEN))
      .returns(authResponse.refresh_token)
      .setup(service => service.setValue(KEYS.REFRESH_TOKEN, It.IsAny()))
      .returns(null);
    secureServiceMock
      .setup(service => service.renewToken(It.IsAny<string>()))
      .returns(Promise.resolve(Result.Ok(authResponse)));
    const useCase = new RenewTokenUseCase(secureServiceMock.object(), cacheServiceMock.object());
    useCase.refreshToken = refreshToken;

    const response = await useCase.execute();

    expect(response.DidSucceed).toBe(true);
    secureServiceMock.verify(service => service.renewToken(It.IsAny<string>()), called(1))
    cacheServiceMock.verify(cache => cache.getValue(KEYS.REFRESH_TOKEN), called(2));
    cacheServiceMock.verify(cache => cache.setValue(KEYS.REFRESH_TOKEN, It.IsAny()), called(2));
  })
})
