import { GetCountersUseCase } from './get-counters.use-case';
import { Mock } from 'moq.ts';
import { CounterService } from 'Services/counter.service';

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

const countersService = new Mock<CounterService>();
countersService.setup(service => service.token)
               .returns(token);
countersService.setup(service => service.getCounters())
               .returns(counters);

describe('GetCountersUseCase', () => {
  let useCase : GetCountersUseCase;
  beforeEach(() => {    
    useCase = new GetCountersUseCase(countersService.object());
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
