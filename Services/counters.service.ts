import { Injectable } from '@nestjs/common';
import SERVERS from '../Common/servers';
import HttpShim from '../Infrastructure/http-shim';
import Counter from '../Domain/counter';

@Injectable()
export default class CountersService {

  constructor(private readonly httpShim: HttpShim){}

  get token(): string {
    return this.httpShim.token;
  }
  set token(value: string) {
    this.httpShim.token = value;
  }

  public async GetCounters(): Promise<Array<Counter>> {   
    this.httpShim.baseUrl = SERVERS.API;
    const res =  await this.httpShim.get('v1/counters');
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    throw new Error(res.statusText);
  }

}
