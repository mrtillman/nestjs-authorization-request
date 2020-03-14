import querystring = require("querystring");
import { AppController } from "./app.controller";
import { AuthorizationUrlRegExp } from "../Common/auth-url.reg-exp";
import { CacheService } from "../Services/cache.service";
import { Mock, It } from "moq.ts";
import { GetTokenUseCase } from "../Application/get-token.use-case";
import { GetCountersUseCase } from "../Application/get-counters.use-case";
import { RenewTokenUseCase } from "../Application/renew-token.use-case";
import { code, counters, authResponse } from "../Common/TestDoubles/stubs";
import { KEYS } from "../Common/keys.enum";
import { AuthorizationResponse } from "../Domain/auth-response";
import { Response } from "express";
import { called } from "../Common/test-helpers";

export const getTokenUseCaseMock = new Mock<GetTokenUseCase>();
export const getCountersUseCaseMock = new Mock<GetCountersUseCase>();
const cacheMock = new Mock<CacheService>();

let renewTokenUseCaseMock = new Mock<RenewTokenUseCase>();
let responseMock: Mock<Response> = null;

getTokenUseCaseMock
  .setup(useCase => useCase.execute())
  .returns(Promise.resolve(authResponse));
getCountersUseCaseMock
  .setup(useCase => useCase.execute())
  .returns(Promise.resolve(counters));
renewTokenUseCaseMock
  .setup(useCase => useCase.execute())
  .returns(Promise.resolve(authResponse));
cacheMock.setup(cache => cache.getValue(KEYS.ACCESS_TOKEN)).returns(null);
cacheMock
  .setup(cache =>
    cache.setValue(KEYS.ACCESS_TOKEN, It.IsAny<AuthorizationResponse>())
  )
  .returns(null);

describe("AppController", () => {
  let appController: AppController;
  let authUrlRegExp: AuthorizationUrlRegExp;

  beforeEach(async () => {
    appController = new AppController(
      getTokenUseCaseMock.object(),
      getCountersUseCaseMock.object(),
      renewTokenUseCaseMock.object(),
      cacheMock.object()
    );
    authUrlRegExp = new AuthorizationUrlRegExp();
  });

  describe("/index", () => {
    it("should get authorization url", () => {
      const model = appController.index();
      const isValidAuthUrl = !authUrlRegExp.test(model.authorizationUrl);
      expect(isValidAuthUrl).toBe(true);
    });
  });

  describe("/oauth2/callback", () => {
    it("should get counters", async () => {
      const model = appController.index();
      const urlParameters = querystring.parse(model.authorizationUrl);
      const stateValue = <string>urlParameters.state;
      const _counters = await appController.oauth2Callback(code, stateValue);

      expect(Array.isArray(_counters)).toBe(true);
      expect(_counters.length).toBe(3);
    });
  });

  describe("/renewtoken", () => {
    beforeEach(() => {
      responseMock = new Mock<Response>();
      responseMock
        .setup(response => response.json(It.IsAny<any>()))
        .returns(null);
      responseMock
        .setup(response => response.redirect(It.IsAny<string>()))
        .returns(null);
    });
    it("should get authorization response", async () => {
      await appController.renewToken(responseMock.object());

      responseMock.verify(
        response => response.json(It.IsAny<any>()),
        called(1)
      );
      responseMock.verify(response => response.redirect("/"), called(0));
    });
    it("should redirect if no authorization response", async () => {
      renewTokenUseCaseMock = new Mock<RenewTokenUseCase>();
      renewTokenUseCaseMock
        .setup(useCase => useCase.execute())
        .returns(Promise.resolve(null));
      appController = new AppController(
        getTokenUseCaseMock.object(),
        getCountersUseCaseMock.object(),
        renewTokenUseCaseMock.object(),
        cacheMock.object()
      );
      await appController.renewToken(responseMock.object());

      responseMock.verify(
        response => response.json(It.IsAny<any>()),
        called(0)
      );
      responseMock.verify(response => response.redirect("/"), called(1));
    });
  });
});
