import { CacheService } from './cache.service';
import { KEYS } from '../Common/keys.enum';
import { token, refreshToken } from '../Common/test-doubles';

describe('CacheService', () => {
  let cache : CacheService;
  beforeEach(() => {
    cache = new CacheService();
  })
  it('should cache access token', () => {
    cache.setValue(KEYS.ACCESS_TOKEN, token);
    expect(cache.getValue(KEYS.ACCESS_TOKEN)).toEqual(token);
  })
  it('should cache refresh token', () => {
    cache.setValue(KEYS.REFRESH_TOKEN, refreshToken);
    expect(cache.getValue(KEYS.REFRESH_TOKEN)).toBe(refreshToken);
  })
})