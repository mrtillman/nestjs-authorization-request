import { Controller, Get, Query, Render } from '@nestjs/common';
import { GetTokenUseCase } from '../Application/get-token.use-case';
import { GetCountersUseCase } from '../Application/get-counters.use-case';
import { Counter } from '../Domain/counter';

@Controller()
export class AppController {
  constructor(private readonly getToken: GetTokenUseCase,
              private readonly getCounters: GetCountersUseCase){}

  @Get('/')
  @Render('index')
  index() {
    // 1. Begin Authorization Request
    return { authorizationUrl: this.getToken.authorizationUrl };
  }

  // 2. Authorization Grant
  @Get('/oauth2/callback')
  async oauth2Callback(@Query('code') code: string, @Query('state') state: string): Promise<Array<Counter>> {
    const { getToken, getCounters } = this;
    
    // 3. Authorization Grant
    getToken.code = code;
    getToken.state = state;
    
    // 4. & 5. Access Token
    getCounters.token = await getToken.execute();
    
    // 6. Protected Resource
    return await getCounters.execute();
  }
}
