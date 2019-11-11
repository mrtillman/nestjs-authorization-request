import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ConfigModule from '../common/config.module';
import SecureService from '../services/secure.service';
import CountersService from '../services/counters.service';
import FetchWrapper from '../infrastructure/FetchWrapper';

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [AppService, FetchWrapper, SecureService, CountersService],
})
export class AppModule {}
