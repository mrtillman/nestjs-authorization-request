import { Injectable } from '@nestjs/common';
import { ServiceAgent } from '../Infrastructure/service-agent';
import { Counter } from '../Domain/counter';
import { Result } from '../Common/result';

@Injectable()
export class CounterService {

  constructor(private readonly agent: ServiceAgent){}

  get token(): string {
    return this.agent.token;
  }
  set token(value: string) {
    this.agent.token = value;
  }

  public async getCounters(): Promise<Result<Counter[]>> {
    const res =  await this.agent.fetchCounters();
    if (res.ok) {
      const countersResponse = await res.json();
      const counters = Array.from(countersResponse, (counter: Counter) => ({
        _id: counter._id,
        name: counter.name,
        value: counter.value,
        skip: counter.skip,
      }));
      return Result.Ok(counters);
    }
    return Result.Fail(res.statusText);
  }
}
