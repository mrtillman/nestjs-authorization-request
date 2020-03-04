import { Injectable } from '@nestjs/common';
import { UseCase } from './use-case.interface';
import { CounterService } from '../Services/counter.service';
import { Counter } from '../Domain/counter';

@Injectable()
export class GetCountersUseCase implements UseCase<Array<Counter>> {

  constructor(private readonly countersService: CounterService){}
  
  get token(): string {
    return this.countersService.token;
  }
  set token(value: string) {
    this.countersService.token = value;
  }

  public async execute(): Promise<Array<Counter>> {
    return await this.countersService.getCounters();
  }
}