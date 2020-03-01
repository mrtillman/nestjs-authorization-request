import { CacheService } from './cache.service';

describe('CacheService', () => {
  let cache : CacheService;
  beforeEach(() => {
    cache = new CacheService();
  })
  it('should work', () => {
    cache.setValue('foo', 'bar');
    expect(cache.getValue('foo')).toEqual('bar');
  })
})