import { Test } from '@nestjs/testing';
import { CountersService } from './counters.service';
import { ServiceAgent } from '../Infrastructure/service-agent';

describe('CountersService', () => {
  let service: CountersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServiceAgent, CountersService]
    }).compile();
    service = module.get<CountersService>(CountersService)
  })

  it('should work', () => {
    expect(service.getCounters).toBeDefined();
  })
})