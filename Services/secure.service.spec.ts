import { Test } from '@nestjs/testing';
import { SecureService } from './secure.service';
import { ConfigModule } from '../Presentation/config.module';
import { ServiceAgent } from '../Infrastructure/service-agent';

describe('SecureService', () => {
  let service: SecureService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [ServiceAgent, SecureService]
    }).compile();
    service = module.get<SecureService>(SecureService)
  })

  it('should work', () => {
    expect(service.getToken).toBeDefined();
  })
})