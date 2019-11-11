import { Controller, Get, Query, Render } from '@nestjs/common';
import SecureService from '../services/secure.service';
import CountersService from '../services/counters.service';
import GetTokenUseCase from '../application/GetToken';
import GetCountersUseCase from '../application/GetCounters';
import Counter from '../domain/counter';

@Controller()
export class AppController {
  constructor(private readonly secureService: SecureService,
              private readonly countersService: CountersService){}

  @Get()
  @Render('index')
  root() {
    const { AuthorizationUrl } = this.secureService;
    return { AuthorizationUrl };
  }

  @Get('/oauth2/callback')
  async oauth2Callback(@Query('code') code: string, @Query('state') state: string): Promise<Array<Counter>> {
    const getToken = new GetTokenUseCase(this.secureService);
    getToken.code = code;
    getToken.state = state;
    const token = await getToken.execute();
    const getCounters = new GetCountersUseCase(this.countersService);
    getCounters.token = token;
    return await getCounters.execute();
  }
}
