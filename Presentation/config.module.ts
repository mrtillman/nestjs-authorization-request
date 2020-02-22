import { Module } from '@nestjs/common';
import { ConfigService } from '../Services/config.service';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const configJson = dotenv.parse(fs.readFileSync('.env'));

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(configJson),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}