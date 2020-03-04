import { GetCountersUseCase } from './get-counters.use-case';
import { Mock } from 'moq.ts';
import { CounterService } from '../Services/counter.service';

// TODO: consolidate test doubles
const token = "t0k3n";
const counters = [
  {
    "_id": "5e3691dda2de8e05241a60a5",
    "name": "alcohol",
    "value": 0,
    "skip": 1
  },
  {
    "_id": "5e3691dda2de8e05241a60a6",
    "name": "tobacco",
    "value": 0,
    "skip": 1
  },
  {
    "_id": "5e3691dda2de8e05241a60a7",
    "name": "firearms",
    "value": 0,
    "skip": 1
  }
];

const countersServiceMock = new Mock<CounterService>();
countersServiceMock.setup(service => service.token)
                   .returns(token);
countersServiceMock.setup(service => service.getCounters())
                   .returns(counters);

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
