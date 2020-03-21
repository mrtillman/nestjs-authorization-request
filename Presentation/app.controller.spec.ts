import querystring = require("querystring");
import { AppController } from "./app.controller";
import { AuthorizationUrlRegExp } from "../Common/auth-url.reg-exp";
import { CacheService } from "../Services/cache.service";
import { Mock, It } from "moq.ts";
import { GetTokenUseCase } from "../Application/get-token.use-case";
import { GetCountersUseCase } from "../Application/get-counters.use-case";
import { RenewTokenUseCase } from "../Application/renew-token.use-case";
import { code, counters, authResponse } from "../Common/test-doubles";
import { KEYS } from "../Common/keys.enum";
import { AuthorizationResponse } from "../Domain/auth-response";
import { Response } from "express";
import { called } from "../Common/test-helpers";
import { Result } from "../Common/result";

const getTokenUseCaseMock = new Mock<GetTokenUseCase>();
const getCountersUseCaseMock = new Mock<GetCountersUseCase>();
const cacheMock = new Mock<CacheService>();
let renewTokenUseCaseMock = new Mock<RenewTokenUseCase>();

const mockHttpResponse = () => {
  const responseMock = new Mock<Response>();
  responseMock
    .setup(response => response.json(It.IsAny()))
    .returns(null);
  responseMock
    .setup(response => response.redirect(It.IsAny<string>()))
    .returns(null);
  return responseMock;
};

getTokenUseCaseMock
  .setup(useCase => useCase.execute())
  .returns(Promise.resolve(Result.Ok(authResponse)));
getCountersUseCaseMock
  .setup(useCase => useCase.execute())
  .returns(Promise.resolve(Result.Ok(counters)));
renewTokenUseCaseMock
  .setup(useCase => useCase.execute())
  .returns(Promise.resolve(Result.Ok(authResponse)));
cacheMock.setup(cache => cache.getValue(KEYS.ACCESS_TOKEN)).returns(null);
cacheMock
  .setup(cache =>
    cache.setValue(KEYS.ACCESS_TOKEN, It.IsAny<AuthorizationResponse>())
  )
  .returns(null);

describe("AppController", () => {
  let appController = new AppController(
    getTokenUseCaseMock.object(),
    getCountersUseCaseMock.object(),
    renewTokenUseCaseMock.object(),
    cacheMock.object()
  );
  const authUrlRegExp = new AuthorizationUrlRegExp();

  it("should get authorization url", () => {
    const model = appController.index();
    const isValidAuthUrl = !authUrlRegExp.test(model.authorizationUrl);
    expect(isValidAuthUrl).toBe(true);
  });

  it("should get counters", async () => {
    const model = appController.index();
    const urlParameters = querystring.parse(model.authorizationUrl);
    const stateValue = <string>urlParameters.state;
    const _counters = await appController.oauth2Callback(code, stateValue);

    expect(Array.isArray(_counters)).toBe(true);
    expect(_counters.length).toBe(3);
  });

  it("should get authorization response", async () => {
    const responseMock = mockHttpResponse();
    await appController.renewToken(responseMock.object());

    responseMock.verify(
      response => response.json(It.IsAny()),
      called(1)
    );
    responseMock.verify(response => response.redirect("/"), called(0));
  });

  it("should redirect home if token renewal fails", async () => {
    const responseMock = mockHttpResponse();
    renewTokenUseCaseMock = new Mock<RenewTokenUseCase>();
    renewTokenUseCaseMock
      .setup(useCase => useCase.execute())
      .returns(Promise.resolve(Result.Fail("Missing token")));
    appController = new AppController(
      getTokenUseCaseMock.object(),
      getCountersUseCaseMock.object(),
      renewTokenUseCaseMock.object(),
      cacheMock.object()
    );

    await appController.renewToken(responseMock.object());

    responseMock.verify(
      response => response.json(It.IsAny()),
      called(0)
    );
    responseMock.verify(response => response.redirect("/"), called(1));
  });
});
