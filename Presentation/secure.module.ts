import { Module } from '@nestjs/common';
import ConfigModule from '../Common/config.module';
import SecureService from '../Services/secure.service';
import GetTokenUseCase from '../Application/GetToken';
import FetchWrapper from '../Infrastructure/FetchWrapper';

@Module({
  imports: [ConfigModule],
  providers: [FetchWrapper, SecureService, GetTokenUseCase],
  exports: [GetTokenUseCase],
})
export default class SecureModule {}
