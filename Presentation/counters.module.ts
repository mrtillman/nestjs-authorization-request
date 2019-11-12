import { Module } from '@nestjs/common';
import CountersService from '../Services/counters.service';
import GetCountersUseCase from '../Application/GetCounters';
import FetchWrapper from '../Infrastructure/FetchWrapper';

@Module({
  providers: [FetchWrapper, CountersService, GetCountersUseCase],
  exports: [GetCountersUseCase],
})
export default class CountersModule {}
