import { Test } from '@nestjs/testing';
import { CountersService } from './counters.service';
import { HttpShim } from '../Infrastructure/http-shim';

describe('CountersService', () => {
  let service: CountersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [HttpShim, CountersService]
    }).compile();
    service = module.get<CountersService>(CountersService)
  })

  it('should work', () => {
    expect(service.getCounters).toBeDefined();
  })
})