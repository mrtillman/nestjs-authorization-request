import { CacheService } from './cache.service';
import { KEYS } from '../Common/keys.enum';

describe('CacheService', () => {
  let cache : CacheService;
  beforeEach(() => {
    cache = new CacheService();
  })
  it('should work', () => {
    const access_token = 'letmein'
    cache.setValue(KEYS.ACCESS_TOKEN, access_token);
    expect(cache.getValue(KEYS.ACCESS_TOKEN)).toEqual(access_token);
  })
})