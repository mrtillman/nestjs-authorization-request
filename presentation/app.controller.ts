import { Controller, Get } from '@nestjs/common';
import { SecureService } from '../services/secure.service'

@Controller()
export class AppController {
  constructor(private readonly secureService: SecureService) {}

  @Get()
  getAuthUrl(): String {
    return this.secureService.authorizationUrl;
  }
}
