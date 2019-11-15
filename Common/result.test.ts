import GetCountersUseCase from '../Application/get-counters.use-case';

describe('GetCountersUseCase', () => {
  let useCase : GetCountersUseCase;
  beforeEach(() => {
    useCase = new GetCountersUseCase(null);
  })
  it('should work', () => {
    expect(useCase.execute).toBeDefined();
  })
})
