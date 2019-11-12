import * as fetchImport from 'isomorphic-unfetch';
import { resolve as join } from 'url';

const fetch = (fetchImport.default || fetchImport) as typeof fetchImport.default;

export default class HttpShim {
  public baseUrl: string;
  public token: string;
  
  async get(path: string) : Promise<Response> {
    const resourceUri = join(this.baseUrl, path);
    return await fetch(resourceUri, {
      method: "GET",
      headers: {
        "authorization": `bearer ${this.token}`,
      }
    });
  }

  async post(path: string, content: BodyInit) : Promise<Response> {
    const resourceUri = join(this.baseUrl, path);
    return await fetch(resourceUri, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        'accept': 'application/json'
      },
      body: content,
    });
  }
}
