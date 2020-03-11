import { CounterService } from './counter.service';
import { ServiceAgent } from '../Infrastructure/service-agent';
import { Mock } from 'moq.ts';
import { counters } from '../Common/TestDoubles/stubs';

const agentMock = new Mock<ServiceAgent>();

agentMock.setup(agent => agent.fetchCounters())
         .returns({
           ok: true,
           json: () => counters
         });

describe('CountersService', () => {
  let service: CounterService;

  beforeEach(() => {
    service = new CounterService(agentMock.object());
  })

  it('should get counters', () => {
    const result = service.getCounters();
    
    expect(result).toBeDefined();
  })
})