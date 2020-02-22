import { Controller, Get, Query, Render } from '@nestjs/common';
import { GetTokenUseCase } from '../Application/get-token.use-case';
import { GetCountersUseCase } from '../Application/get-counters.use-case';
import { RenewTokenUseCase } from '../Application/renew-token.use-case';
import { Counter } from '../Domain/counter';
import { AuthorizationResponse } from 'Domain/auth-response';

let authResponse: AuthorizationResponse = null;

@Controller()
export class AppController {
  constructor(private readonly getTokenUseCase: GetTokenUseCase,
              private readonly getCountersUseCase: GetCountersUseCase,
              private readonly renewTokenUseCase: RenewTokenUseCase){}

  @Get('/')
  @Render('index')
  index() {
    // 1. Begin Authorization Request
    return { authorizationUrl: this.getTokenUseCase.authorizationUrl };
  }

  // 2. Authorization Grant (inbound)
  @Get('/oauth2/callback')
  async oauth2Callback(@Query('code') code: string, @Query('state') state: string): Promise<any> {
    const { 
      getTokenUseCase, 
      getCountersUseCase, 
      renewTokenUseCase } = this;
    
    // 3. Authorization Grant (outbound)
    getTokenUseCase.code = code;
    getTokenUseCase.state = state;
    
    // 4. Access Token (inbound)
    authResponse = await getTokenUseCase.execute();

    // 5. Access Token (outbound)
    getCountersUseCase.token = authResponse.accessToken;
    
    // 6. Protected Resource
    const counters = await getCountersUseCase.execute();

    renewTokenUseCase.refreshToken = authResponse.refreshToken;

    return counters;
  }

  @Get('/renew')
  async renewToken(){
    if(!authResponse) return;
    return await this.renewTokenUseCase.execute();
  }
}
