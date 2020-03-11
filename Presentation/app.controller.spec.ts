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
    // TODO: mock dependencies
    const app: TestingModule = await Test.createTestingModule({
      imports: [CountersModule, SecureModule],
      providers: [CacheService],
      controllers: [AppController]
    }).compile();

    appController = app.get<AppController>(AppController);
    authUrlRegExp = new AuthorizationUrlRegExp();
  });

  describe("/index", () => {
    it("should get authorization url", () => {
      const model = appController.index();
      const isValidAuthUrl = !authUrlRegExp.test(model.authorizationUrl);
      expect(isValidAuthUrl).toBe(false);
    });
  });

  describe("/oauth2/callback", () => {
    it("should get counters", () => {
      expect(true).toBe(true);
    });
  })

  describe("/renewtoken", () => {
    it("should get authorization response", () => {
      expect(true).toBe(true);
    });
    it("should redirect if no authorization response", () => {
      expect(true).toBe(true);
    });
  })
});
