import ConfigService from './config.service';

describe('ConfigService', () => {
  let config : ConfigService;
  beforeEach(() => {
    config = new ConfigService('development.env');
  })
  it('should work', () => {
    expect(config.get).toBeDefined();
  })
})