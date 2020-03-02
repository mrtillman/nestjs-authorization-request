import { Injectable } from '@nestjs/common';
import { ServiceAgent } from '../Infrastructure/service-agent';
import { Counter } from '../Domain/counter';

@Injectable()
export class CountersService {

  constructor(private readonly agent: ServiceAgent){}

  get token(): string {
    return this.agent.token;
  }
  set token(value: string) {
    this.agent.token = value;
  }

  public async getCounters(): Promise<Counter[]> {   
    const res =  await this.agent.fetchCounters();
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
