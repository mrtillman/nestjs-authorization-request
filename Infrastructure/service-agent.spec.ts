import { ServiceAgent } from './service-agent';
import { mockHttpRequests } from '../Common/TestDoubles/mocks';
import { authRequest, refreshTokenRequest, token } from '../Common/TestDoubles/stubs';

mockHttpRequests();

describe('HttpShim', () => {
  let agent : ServiceAgent;
  beforeEach(() => {
    agent = new ServiceAgent();
    agent.token = token;
  })
  it('should fetch counters', async () => {
    const response : Response = await agent.fetchCounters();
    expect(response).toBeDefined();
  })
  it('should fetch token', async () => {
    const response : Response = await agent.fetchToken(authRequest);
    expect(response).toBeDefined();
  })
  it('should renew token', async () => {
    const response : Response = await agent.renewToken(refreshTokenRequest);
    expect(response).toBeDefined();
  })
})
