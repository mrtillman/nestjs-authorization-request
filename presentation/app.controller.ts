import { Controller, Get, Query } from '@nestjs/common';
import SecureService from '../services/secure.service';
import GetTokenUseCase from '../application/GetTokenUseCase';

@Controller()
export class AppController {
  constructor(private readonly secureService: SecureService) {}

  @Get()
  getAuthUrl(): string {
    return this.secureService.AuthorizationUrl;
  }

  @Get('/oauth2/callback')
  async oauth2Callback(@Query('code') code: string, @Query('state') state: string): Promise<string> {
    var getToken = new GetTokenUseCase(this.secureService);
    getToken.code = code;
    getToken.state = state;
    return await getToken.execute();
  }
}
