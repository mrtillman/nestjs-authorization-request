import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../Presentation/app.module';
import { GetTokenUseCase } from '../Application/get-token.use-case';
import { GetCountersUseCase } from '../Application/get-counters.use-case';
import { join } from 'path';

describe('AppController (e2e)', () => {
  let app;
  let getTokenUseCase = { execute: () => 'tokenValue' };
  let getCountersUseCase = { execute: () => [] };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(GetTokenUseCase)
    .useValue(getTokenUseCase)
    .overrideProvider(GetCountersUseCase)
    .useValue(getCountersUseCase)
    .compile();
    
    app = moduleFixture.createNestApplication();
    app.useStaticAssets(join(__dirname, '../Presentation', 'public'));
    app.setBaseViewsDir(join(__dirname, '../Presentation', 'views'));
    app.set('view engine', 'pug');
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200);
  });
});
