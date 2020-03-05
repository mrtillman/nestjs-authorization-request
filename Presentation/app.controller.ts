import { Response as RouteResponse } from "express";
import { Controller, Get, Query, Render, Response } from "@nestjs/common";
import { GetTokenUseCase } from "../Application/get-token.use-case";
import { GetCountersUseCase } from "../Application/get-counters.use-case";
import { RenewTokenUseCase } from "../Application/renew-token.use-case";
import { CacheService } from "../Services/cache.service";
import { KEYS } from "../Common/keys.enum";
import { AuthorizationResponse } from "../Domain/auth-response";

@Controller()
export class AppController {
  constructor(
    private readonly getTokenUseCase: GetTokenUseCase,
    private readonly getCountersUseCase: GetCountersUseCase,
    private readonly renewTokenUseCase: RenewTokenUseCase,
    private readonly cache: CacheService
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
    let authResponse: AuthorizationResponse = this.cache.getValue<
      AuthorizationResponse
    >(KEYS.ACCESS_TOKEN);

    if (!authResponse) {
      // 3. Authorization Grant (outbound)
      this.getTokenUseCase.code = code;
      this.getTokenUseCase.state = state;

      // 4. Access Token (inbound)
      authResponse = await this.getTokenUseCase.execute();
      this.cache.setValue(KEYS.ACCESS_TOKEN, authResponse);
    }

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
