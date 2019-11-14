import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import CountersModule from './counters.module';
import SecureModule from './secure.module';
import authUrlRegEx from '../Common/auth-url.reg-exp';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CountersModule, SecureModule],
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('index', () => {
    it('should return view model', () => {
      const model = appController.index();
      expect(model).toBeDefined();
    });
    it('view model should have authorization url', () => {
      const model = appController.index();
      expect(model.authorizationUrl).toBeDefined();
    });
    it('authorization url should not be malformed', () => {
      const model = appController.index();
      const { authorizationUrl } = model;
      expect(authUrlRegEx.test(authorizationUrl)).toBe(true);
    });
  });
});
