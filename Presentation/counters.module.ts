import { Module } from "@nestjs/common";
import { CounterService } from "../Services/counter.service";
import { GetCountersUseCase } from "../Application/get-counters.use-case";
import { ServiceAgent } from "../Infrastructure/service-agent";

@Module({
  providers: [ServiceAgent, CounterService, GetCountersUseCase],
  exports: [GetCountersUseCase]
})
export class CountersModule {}
