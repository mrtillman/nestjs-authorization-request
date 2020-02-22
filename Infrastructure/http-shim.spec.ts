import { HttpShim } from './http-shim';

describe('HttpShim', () => {
  let http : HttpShim;
  beforeEach(() => {
    http = new HttpShim();
  })
  it('should work', () => {
    expect(http.fetchCounters).toBeDefined();
  })
})