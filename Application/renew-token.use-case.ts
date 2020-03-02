import { Injectable } from '@nestjs/common';
import { SecureService } from '../Services/secure.service';
import { UseCase } from './use-case.interface';
import { AuthorizationResponse } from '../Domain/auth-response';
import { CacheService } from '../Services/cache.service';

@Injectable()
export class RenewTokenUseCase implements UseCase<AuthorizationResponse> {
  
  constructor(private readonly secureService : SecureService,
              private readonly cacheService: CacheService) {}
  
  public set refreshToken(value: string) {
    this.cacheService.setRefreshToken(value);
  }
  public get refreshToken(): string {
    return this.cacheService.getRefreshToken();
  };

  public async execute(): Promise<AuthorizationResponse> {
    const result = await this.secureService.renewToken(this.refreshToken);
    this.refreshToken = result.Value.refreshToken;
    return result.Value;
  }
}
