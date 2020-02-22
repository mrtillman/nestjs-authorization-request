import { Module } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { SecureService } from '../Services/secure.service';
import { GetTokenUseCase } from '../Application/get-token.use-case';
import { RenewTokenUseCase } from '../Application/renew-token.use-case';
import { HttpShim } from '../Infrastructure/http-shim';

@Module({
  imports: [ConfigModule],
  providers: [HttpShim, SecureService, GetTokenUseCase, RenewTokenUseCase],
  exports: [GetTokenUseCase, RenewTokenUseCase],
})
export class SecureModule {}
