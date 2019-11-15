import GetTokenUseCase from './get-token.use-case';

describe('GetTokenUseCase', () => {
  let useCase : GetTokenUseCase;
  beforeEach(() => {
    useCase = new GetTokenUseCase(null);
  })
  it('should work', () => {
    expect(useCase.execute).toBeDefined();
  })
})
