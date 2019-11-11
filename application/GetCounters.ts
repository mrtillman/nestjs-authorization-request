import { Injectable } from '@nestjs/common';
import IUseCase from './IUseCase';
import CountersService from '../services/counters.service';
import Counter from '../domain/counter';

@Injectable()
export default class GetCountersUseCase implements IUseCase<Array<Counter>> {

  constructor(private readonly countersService: CountersService){}
  
  get token(): string {
    return this.countersService.token;
  }
  set token(value: string) {
    this.countersService.token = value;
  }

  public async execute(): Promise<Array<Counter>> {
    return await this.countersService.GetCounters();
  }
}