import { Module } from "@nestjs/common";
import { ConfigModule } from "./config.module";
import { SecureService } from "../Services/secure.service";
import { GetTokenUseCase } from "../Application/get-token.use-case";
import { RenewTokenUseCase } from "../Application/renew-token.use-case";
import { ServiceAgent } from "../Infrastructure/service-agent";

@Module({
  imports: [ConfigModule],
  providers: [ServiceAgent, SecureService, GetTokenUseCase, RenewTokenUseCase],
  exports: [GetTokenUseCase, RenewTokenUseCase]
})
export class SecureModule {}
