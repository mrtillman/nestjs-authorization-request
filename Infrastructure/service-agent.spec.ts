import { ServiceAgent } from './service-agent';

describe('HttpShim', () => {
  let agent : ServiceAgent;
  beforeEach(() => {
    agent = new ServiceAgent();
  })
  it('should work', () => {
    expect(agent.fetchCounters).toBeDefined();
  })
})