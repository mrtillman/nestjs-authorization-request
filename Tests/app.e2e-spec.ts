import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../Presentation/app.module";
import { GetTokenUseCase } from "../Application/get-token.use-case";
import { GetCountersUseCase } from "../Application/get-counters.use-case";
import { RenewTokenUseCase } from "../Application/renew-token.use-case";
import { join } from "path";
import { Mock } from "moq.ts";
import { authResponse, counters } from "../Common/TestDoubles/stubs";

describe("AppController (e2e)", () => {
  let app;
  let getTokenUseCaseMock = new Mock<GetTokenUseCase>();
  let getCountersUseCaseMock = new Mock<GetCountersUseCase>();
  let renewTokenUseCaseMock = new Mock<RenewTokenUseCase>();

  getTokenUseCaseMock
    .setup(useCase => useCase.execute())
    .returns(Promise.resolve(authResponse));

  getCountersUseCaseMock
    .setup(useCase => useCase.execute())
    .returns(Promise.resolve(counters));

  renewTokenUseCaseMock
    .setup(useCase => useCase.execute())
    .returns(Promise.resolve(authResponse));

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideProvider(GetTokenUseCase)
      .useValue(getTokenUseCaseMock.object())
      .overrideProvider(GetCountersUseCase)
      .useValue(getCountersUseCaseMock.object())
      .overrideProvider(RenewTokenUseCase)
      .useValue(renewTokenUseCaseMock.object())
      .compile();

    app = moduleFixture.createNestApplication();
    app.setBaseViewsDir(join(__dirname, "../Presentation", "views"));
    app.set("view engine", "pug");
    await app.init();
  });

  it("/ (GET)", () => {
    return request(app.getHttpServer())
      .get("/")
      .expect(200);
  });

  it("/oauth2/callback (GET)", () => {
    return request(app.getHttpServer())
      .get("/oauth2/callback")
      .expect(200);
  });

  it("/renewtoken (GET)", () => {
    return request(app.getHttpServer())
      .get("/renewtoken")
      .expect(200);
  });
});
