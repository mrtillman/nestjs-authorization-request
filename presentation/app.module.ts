import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecureService } from '../services/secure.service';
import { ConfigModule } from '../common/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [AppService, SecureService],
})
export class AppModule {}
