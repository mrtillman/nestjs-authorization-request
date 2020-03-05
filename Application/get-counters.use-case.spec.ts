import { GetCountersUseCase } from './get-counters.use-case';
import { Mock } from 'moq.ts';
import { CounterService } from '../Services/counter.service';
import { counters, token } from '../Common/TestDoubles/stubs';
import { Result } from '../Common/result';

// TODO: use mock factory
const countersServiceMock = new Mock<CounterService>();
countersServiceMock.setup(service => service.token)
                   .returns(token);
countersServiceMock.setup(service => service.getCounters())
                   .returns(Result.Ok(counters));

describe('GetCountersUseCase', () => {
  let useCase : GetCountersUseCase;
  beforeEach(() => {    
    useCase = new GetCountersUseCase(countersServiceMock.object());
  })
  it('should get counters', async () => {
    useCase.token = token;
    const _counters = await useCase.execute();
    expect(_counters).toBeDefined();
  })
  it('should get token', async () => {
    const _token = useCase.token;
    expect(_token).toBeDefined();
  })
})
