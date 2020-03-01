import { Module } from "@nestjs/common";
import { CountersService } from "../Services/counters.service";
import { GetCountersUseCase } from "../Application/get-counters.use-case";
import { ServiceAgent } from "../Infrastructure/service-agent";

@Module({
  providers: [ServiceAgent, CountersService, GetCountersUseCase],
  exports: [GetCountersUseCase]
})
export class CountersModule {}
