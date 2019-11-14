import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import CountersModule from './counters.module';
import SecureModule from './secure.module';

@Module({
  imports: [CountersModule, SecureModule],
  controllers: [AppController],
})
export class AppModule {}
