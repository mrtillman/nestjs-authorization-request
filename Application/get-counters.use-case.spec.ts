import { GetCountersUseCase } from './get-counters.use-case';
import { Mock } from 'moq.ts';
import { CounterService } from '../Services/counter.service';
import { counters, token } from '../Common/TestDoubles/stubs';
import { Result } from '../Common/result';

const counterServiceMock = new Mock<CounterService>();
counterServiceMock.setup(service => service.token)
                   .returns(token);
counterServiceMock.setup(service => service.getCounters())
                   .returns(Result.Ok(counters));

describe('GetCountersUseCase', () => {
  let useCase : GetCountersUseCase;
  beforeEach(() => {    
    useCase = new GetCountersUseCase(counterServiceMock.object());
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
