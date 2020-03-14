import { Injectable } from '@nestjs/common';
import { SecureService } from '../Services/secure.service';
import { UseCase } from './use-case.interface';
import { AuthorizationResponse } from '../Domain/auth-response';
import { CacheService } from '../Services/cache.service';
import { KEYS } from '../Common/keys.enum';

@Injectable()
export class RenewTokenUseCase implements UseCase<AuthorizationResponse> {
  
  constructor(private readonly secureService : SecureService,
              private readonly cacheService: CacheService) {}
  
  public set refreshToken(value: string) {
    this.cacheService.setValue(KEYS.REFRESH_TOKEN, value);
  }
  public get refreshToken(): string {
    return this.cacheService.getValue(KEYS.REFRESH_TOKEN);
  };

  public async execute(): Promise<AuthorizationResponse> {
    if(!this.refreshToken) return null;
    const result = await this.secureService.renewToken(this.refreshToken);
    if(result.DidSucceed){
      this.refreshToken = result.Value.refresh_token;
      return result.Value;
    }
    throw new Error(result.ErrorMessage);
  }
}
