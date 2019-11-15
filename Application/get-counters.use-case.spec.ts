import GetCoutersUseCase from './get-counters.use-case';

describe('GetCountersUseCase', () => {
  let useCase : GetCoutersUseCase;
  beforeEach(() => {
    useCase = new GetCoutersUseCase(null);
  })
  it('should work', () => {
    expect(useCase.execute).toBeDefined();
  })
})
