import * as fetchImport from 'isomorphic-unfetch';
import IFetchWrapper from './IFetchWrapper';
import SERVERS from '../common/servers';

const fetch = (fetchImport.default || fetchImport) as typeof fetchImport.default;

export default class FetchWrapper implements IFetchWrapper {

  async GetToken(parameters: string): Promise<string> {
    const res = await fetch(`${SERVERS.SECURE}/connect/token`, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        'accept': 'application/json'
      },
      body: parameters,
    });
    
    if (res.ok) {
      const data = await res.json();
      return data.access_token;
    }
    
    throw new Error(res.statusText);
  }
  
}