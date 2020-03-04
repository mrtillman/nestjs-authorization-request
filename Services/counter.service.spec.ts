import { Test } from '@nestjs/testing';
import { CounterService } from './counter.service';
import { ServiceAgent } from '../Infrastructure/service-agent';

describe('CountersService', () => {
  let service: CounterService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServiceAgent, CounterService]
    }).compile();
    service = module.get<CounterService>(CounterService)
  })

  it('should work', () => {
    expect(service.getCounters).toBeDefined();
  })
})