import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import CountersModule from './counters.module';
import SecureModule from './secure.module';

@Module({
  imports: [CountersModule, SecureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
