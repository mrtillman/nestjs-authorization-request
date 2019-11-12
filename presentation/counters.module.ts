import { Module } from '@nestjs/common';
import CountersService from '../services/counters.service';
import GetCountersUseCase from '../application/GetCounters';
import FetchWrapper from '../infrastructure/FetchWrapper';

@Module({
  providers: [FetchWrapper, CountersService, GetCountersUseCase],
  exports: [GetCountersUseCase],
})
export default class CountersModule {}
