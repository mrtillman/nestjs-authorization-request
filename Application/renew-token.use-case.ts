import { Injectable } from '@nestjs/common';
import { SecureService } from '../Services/secure.service';
import { UseCase } from './use-case.interface';
import { AuthorizationResponse } from '../Domain/auth-response';
import { CacheService } from '../Services/cache.service';
import { KEYS } from '../Common/keys.enum';
import { Result } from '../Common/result';

@Injectable()
export class RenewTokenUseCase implements UseCase<Result<AuthorizationResponse>> {
  
  constructor(private readonly secureService : SecureService,
              private readonly cacheService: CacheService) {}
  
  public set refreshToken(value: string) {
    this.cacheService.setValue(KEYS.REFRESH_TOKEN, value);
  }
  public get refreshToken(): string {
    return this.cacheService.getValue(KEYS.REFRESH_TOKEN);
  };

  public async execute(): Promise<Result<AuthorizationResponse>> {
    if(!this.refreshToken){
      return Result.Fail<AuthorizationResponse>("Missing refresh token");
    }
    const result = await this.secureService.renewToken(this.refreshToken);
    if(result.DidSucceed){
      this.refreshToken = result.Value.refresh_token;
    }
    return result;
  }
}
