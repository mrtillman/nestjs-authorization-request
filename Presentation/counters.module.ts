import { Module } from '@nestjs/common';
import CountersService from '../Services/counters.service';
import GetCountersUseCase from '../Application/get-counters.use-case';
import FetchWrapper from '../Infrastructure/fetch-wrapper';

@Module({
  providers: [FetchWrapper, CountersService, GetCountersUseCase],
  exports: [GetCountersUseCase],
})
export default class CountersModule {}
