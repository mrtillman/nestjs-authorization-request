import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '../common/config.module';
import SecureService from '../services/secure.service';

// TODO: add FetchWrapper

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [AppService, SecureService],
})
export class AppModule {}
