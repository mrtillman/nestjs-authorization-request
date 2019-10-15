import { Controller, Get, Query } from '@nestjs/common';
import { SecureService } from '../services/secure.service';
import GetToken from '../application/GetToken';

@Controller()
export class AppController {
  constructor(private readonly secureService: SecureService) {}

  @Get()
  getAuthUrl(): String {
    return this.secureService.authorizationUrl;
  }

  @Get('/oauth2/callback')
  oauth2Callback(@Query('code') code: String, @Query('state') state: String): String {
    var getToken = new GetToken(code, state);
    var token = getToken.execute();
    return token;
  }
}
