import { Injectable } from '@nestjs/common';
import { HttpShim } from '../Infrastructure/http-shim';
import { Counter } from '../Domain/counter';

@Injectable()
export class CountersService {

  constructor(private readonly http: HttpShim){}

  get token(): string {
    return this.http.token;
  }
  set token(value: string) {
    this.http.token = value;
  }

  public async getCounters(): Promise<Array<Counter>> {   
    const res =  await this.http.fetchCounters();
    if (res.ok) {
      const counters = await res.json();
      return Array.from(counters, (counter: Counter) => ({
        _id: counter._id,
        name: counter.name,
        value: counter.value,
        skip: counter.skip,
      }));
    }
    throw new Error(res.statusText);
  }
}
