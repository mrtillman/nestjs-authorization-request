import { Module } from '@nestjs/common';
import ConfigModule from '../common/config.module';
import SecureService from '../services/secure.service';
import GetTokenUseCase from '../application/GetToken';
import FetchWrapper from '../infrastructure/FetchWrapper';

@Module({
  imports: [ConfigModule],
  providers: [FetchWrapper, SecureService, GetTokenUseCase],
  exports: [GetTokenUseCase],
})
export default class SecureModule {}
