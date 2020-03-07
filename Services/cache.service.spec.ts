import { CacheService } from './cache.service';
import { KEY } from '../Common/keys.enum';
import { token, refreshToken } from '../Common/TestDoubles/stubs';

describe('CacheService', () => {
  let cache : CacheService;
  beforeEach(() => {
    cache = new CacheService();
  })
  it('should cache access token', () => {
    cache.setValue(KEY.ACCESS_TOKEN, token);
    expect(cache.getValue(KEY.ACCESS_TOKEN)).toEqual(token);
  })
  it('should cache refresh token', () => {
    cache.setValue(KEY.REFRESH_TOKEN, refreshToken);
    expect(cache.getValue(KEY.REFRESH_TOKEN)).toBe(refreshToken);
  })
})