import { Injectable } from '@nestjs/common';
import FetchWrapper from '../Infrastructure/fetch-wrapper';
import Counter from '../Domain/counter';

@Injectable()
export default class CountersService {

  public token: string;

  constructor(private readonly fetch: FetchWrapper){}

  public async GetCounters(): Promise<Array<Counter>> {    
    return await this.fetch.GetCounters(this.token);
  }

}
