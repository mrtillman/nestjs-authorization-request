import { GetCountersUseCase } from './get-counters.use-case';
import { Mock } from 'moq.ts';
import { CounterService } from '../Services/counter.service';
import { Result } from '../Common/result';
import { counters, token } from '../Common/test-doubles';
import { called } from '../Common/test-helpers';

const counterServiceMock = new Mock<CounterService>();
counterServiceMock.setup(service => service.token)
                  .returns(token);
counterServiceMock.setup(service => service.getCounters())
                  .returns(Result.Ok(counters));
const useCase = new GetCountersUseCase(counterServiceMock.object());

describe('GetCountersUseCase', () => {
  it('should get counters', () => {
    useCase.token = token;
    useCase.execute();
    counterServiceMock.verify(service => service.getCounters(), called(1));
  })
  it('should get token', () => {
    useCase.token;
    counterServiceMock.verify(service => service.token, called(1));
  })
})
