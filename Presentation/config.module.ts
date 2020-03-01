import { Module } from "@nestjs/common";
import { CacheService } from "../Services/cache.service";
import { ConfigService } from "../Services/config.service";
import * as dotenv from "dotenv";
import * as fs from "fs";

const configJson = dotenv.parse(fs.readFileSync(".env"));

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(configJson)
    },
    {
      provide: CacheService,
      useValue: new CacheService()
    }
  ],
  exports: [CacheService, ConfigService]
})
export class ConfigModule {}
