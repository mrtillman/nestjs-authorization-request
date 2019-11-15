import { Module } from '@nestjs/common';
import ConfigService from '../Services/config.service';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const configFilePath = `${process.env.NODE_ENV || 'development'}.env`;
const configJson = dotenv.parse(fs.readFileSync(configFilePath));

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(configJson),
    },
  ],
  exports: [ConfigService],
})
export default class ConfigModule {}