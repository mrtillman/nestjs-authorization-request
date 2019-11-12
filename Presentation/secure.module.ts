import { Module } from '@nestjs/common';
import ConfigModule from '../Common/config.module';
import SecureService from '../Services/secure.service';
import GetTokenUseCase from '../Application/get-token.use-case';
import FetchWrapper from '../Infrastructure/fetch-wrapper';

@Module({
  imports: [ConfigModule],
  providers: [FetchWrapper, SecureService, GetTokenUseCase],
  exports: [GetTokenUseCase],
})
export default class SecureModule {}
