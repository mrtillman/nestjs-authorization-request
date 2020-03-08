import { Mock, It } from 'moq.ts';
import { RenewTokenUseCase } from './renew-token.use-case';
import { SecureService } from '../Services/secure.service';
import { CacheService } from '../Services/cache.service';
import { refreshToken } from '../Common/TestDoubles/stubs';
import { KEYS } from '../Common/keys.enum';

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
  it('should return null if no refresh token', async () => {
    cacheServiceMock
      .setup(service => service.getValue(KEYS.REFRESH_TOKEN))
      .returns(null)
      .setup(service => service.setValue(KEYS.REFRESH_TOKEN, It.IsAny<any>()))
      .returns(null);
    const useCase = getUseCase();

    const response = await useCase.execute();

    expect(response).toBeNull();
  })
})
