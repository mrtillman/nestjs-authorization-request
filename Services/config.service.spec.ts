import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let config : ConfigService;
  beforeEach(() => {
    config = new ConfigService({'foo': 'bar'});
  })
  it('should work', () => {
    expect(config.get('foo')).toEqual('bar');
  })
})