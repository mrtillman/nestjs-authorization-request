import { Injectable } from '@nestjs/common';
import { SecureService } from '../Services/secure.service';
import { UseCase } from './use-case.interface';
import { AuthorizationResponse } from '../Domain/auth-response';
import { CacheService } from '../Services/cache.service';
import { KEYS } from '../Common/keys.enum';
import { Result } from '../Common/result';

@Injectable()
export class GetTokenUseCase implements UseCase<Result<AuthorizationResponse>> {
  
  constructor(private readonly secureService : SecureService,
              private readonly cache : CacheService){ }

  public code: string;
  public state: string;

  public get authorizationUrl(): string {
    this.cache.clear();
    return this.secureService.authorizationUrl;
  }

  public async execute(): Promise<Result<AuthorizationResponse>> {
    let authResponse = this.cache.getValue<AuthorizationResponse>(KEYS.ACCESS_TOKEN);
    if(authResponse){
      return Result.Ok(authResponse);
    }
    const result = await this.secureService.getToken(this.code, this.state);
    if(result.DidSucceed){
      this.cache.setValue(KEYS.ACCESS_TOKEN, result.Value);
    }
    return result;
  }
}
