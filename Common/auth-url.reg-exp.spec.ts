import { AuthorizationUrlRegExp } from './auth-url.reg-exp';

describe('GetCountersUseCase', () => {
  let regex : AuthorizationUrlRegExp;
  beforeEach(() => {
    regex = new AuthorizationUrlRegExp();
  })
  it('should reject invalid authorization url', () => {
    const url = "";
    expect(regex.test(url)).toBe(false);
  })
  it('should accept valid authorization url', () => {
    const url = "http://localhost:5000/connect/authorize?response_type=code&client_id={client-id}&redirect_uri={redirect_uri}&scope=openid offline_access&state={state}";
    expect(regex.test(url)).toBe(true);
  })
})
