import { Response as RouteResponse } from "express";
import { Controller, Get, Query, Render, Response } from "@nestjs/common";
import { GetTokenUseCase } from "../Application/get-token.use-case";
import { GetCountersUseCase } from "../Application/get-counters.use-case";
import { RenewTokenUseCase } from "../Application/renew-token.use-case";

@Controller()
export class AppController {
  constructor(
    private readonly getTokenUseCase: GetTokenUseCase,
    private readonly getCountersUseCase: GetCountersUseCase,
    private readonly renewTokenUseCase: RenewTokenUseCase
  ) {}

  @Get("/")
  @Render("index")
  index() {
    // 1. Begin Authorization Request
    return { authorizationUrl: this.getTokenUseCase.authorizationUrl };
  }

  // 2. Authorization Grant (inbound)
  @Get("/oauth2/callback")
  async oauth2Callback(
    @Query("code") code: string,
    @Query("state") state: string
  ): Promise<any> {
    // 3. Authorization Grant (outbound)
    this.getTokenUseCase.code = code;
    this.getTokenUseCase.state = state;

    // 4. Access Token (inbound)
    const authResponse = await this.getTokenUseCase.execute();

    // 5. Access Token (outbound)
    this.getCountersUseCase.token = authResponse.accessToken;

    // 6. Protected Resource
    const counters = await this.getCountersUseCase.execute();

    this.renewTokenUseCase.refreshToken = authResponse.refreshToken;

    return counters;
  }

  @Get("/renewtoken")
  async renewToken(@Response() res: RouteResponse): Promise<any> {
    var authResponse = await this.renewTokenUseCase.execute();
    if (authResponse) {
      res.json(authResponse);
    } else {
      res.redirect("/");
    }
  }
}
