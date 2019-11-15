import { Test } from '@nestjs/testing';
import SecureService from './secure.service';
import ConfigModule from '../Common/config.module';
import HttpShim from '../Infrastructure/http-shim';

describe('SecureService', () => {
  let service: SecureService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [HttpShim, SecureService]
    }).compile();
    service = module.get<SecureService>(SecureService)
  })

  it('should work', () => {
    expect(service.getToken).toBeDefined();
  })
})