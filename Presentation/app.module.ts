import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { CountersModule } from "./counters.module";
import { SecureModule } from "./secure.module";
import { CacheService } from "../Services/cache.service";

@Module({
  imports: [CountersModule, SecureModule],
  providers: [CacheService],
  controllers: [AppController]
})
export class AppModule {}
