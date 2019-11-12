import { Controller, Get, Query, Render } from '@nestjs/common';
import GetTokenUseCase from '../application/GetToken';
import GetCountersUseCase from '../application/GetCounters';
import Counter from '../domain/counter';

@Controller()
export class AppController {
  constructor(private readonly getToken: GetTokenUseCase,
              private readonly getCounters: GetCountersUseCase){}

  @Get()
  @Render('index')
  root() {
    const { AuthorizationUrl } = this.getToken;
    return { AuthorizationUrl };
  }

  @Get('/oauth2/callback')
  async oauth2Callback(@Query('code') code: string, @Query('state') state: string): Promise<Array<Counter>> {
    const { getToken, getCounters } = this;
    getToken.code = code;
    getToken.state = state;
    getCounters.token = await getToken.execute();
    return await getCounters.execute();
  }
}
