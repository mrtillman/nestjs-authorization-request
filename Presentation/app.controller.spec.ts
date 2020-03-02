import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { CountersModule } from "./counters.module";
import { SecureModule } from "./secure.module";
import { AuthorizationUrlRegExp } from "../Common/auth-url.reg-exp";
import { CacheService } from "../Services/cache.service";

describe("AppController", () => {
  let appController: AppController;
  let authUrlRegExp: AuthorizationUrlRegExp;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CountersModule, SecureModule],
      providers: [CacheService],
      controllers: [AppController]
    }).compile();

    appController = app.get<AppController>(AppController);
    authUrlRegExp = new AuthorizationUrlRegExp();
  });

  describe("index", () => {
    it("should return view model", () => {
      const model = appController.index();
      expect(model).toBeDefined();
    });
    it("view model should have authorization url", () => {
      const model = appController.index();
      expect(model.authorizationUrl).toBeDefined();
    });
    it("authorization url should not be malformed", () => {
      const model = appController.index();
      const isMalformed = !authUrlRegExp.test(model.authorizationUrl);
      expect(isMalformed).toBe(false);
    });
  });
});
