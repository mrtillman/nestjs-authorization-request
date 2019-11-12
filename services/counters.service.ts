import { Injectable } from '@nestjs/common';
import FetchWrapper from '../infrastructure/FetchWrapper';
import Counter from '../domain/counter';

@Injectable()
export default class CountersService {

  public token: string;

  constructor(private readonly fetch: FetchWrapper){}

  public async GetCounters(): Promise<Array<Counter>> {    
    return await this.fetch.GetCounters(this.token);
  }

}
