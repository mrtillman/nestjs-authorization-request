import { RenewTokenUseCase } from './renew-token.use-case';

describe('RenewTokenUseCase', () => {
  let useCase : RenewTokenUseCase;
  beforeEach(() => {
    useCase = new RenewTokenUseCase(null);
  })
  it('should work', () => {
    expect(useCase.execute).toBeDefined();
  })
})
