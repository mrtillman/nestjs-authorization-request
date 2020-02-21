import { Module } from '@nestjs/common';
import { CountersService } from '../Services/counters.service';
import { GetCountersUseCase } from '../Application/get-counters.use-case';
import { HttpShim } from '../Infrastructure/http-shim';

@Module({
  providers: [HttpShim, CountersService, GetCountersUseCase],
  exports: [GetCountersUseCase],
})
export class CountersModule {}
