import AuthorizationUrlRegExp from './auth-url.reg-exp';

describe('GetCountersUseCase', () => {
  let regex : AuthorizationUrlRegExp;
  beforeEach(() => {
    regex = new AuthorizationUrlRegExp();
  })
  it('should work', () => {
    expect(regex.test).toBeDefined();
  })
})
