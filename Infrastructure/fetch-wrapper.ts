import * as fetchImport from 'isomorphic-unfetch';
import IFetchWrapper from './fetch-wrapper.interface';
import SERVERS from '../Common/servers';
import Counter from '../Domain/counter';

const fetch = (fetchImport.default || fetchImport) as typeof fetchImport.default;

export default class FetchWrapper implements IFetchWrapper {

  async GetToken(parameters: string): Promise<string> {
    const res = await fetch(`${SERVERS.SECURE}/connect/token`, {
      method: "POST",
      headers: {
        "content-type": "Application/x-www-form-urlencoded",
        'accept': 'Application/json'
      },
      body: parameters,
    });
    
    if (res.ok) {
      const data = await res.json();
      return data.access_token;
    }
    
    throw new Error(res.statusText);
  }

  async GetCounters(token: string): Promise<Array<Counter>> {
    const res = await fetch(`${SERVERS.API}/v1/counters`, {
      method: "GET",
      headers: {
        "authorization": `bearer ${token}`,
      }
    });
    
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    
    throw new Error(res.statusText);
  }
  
}