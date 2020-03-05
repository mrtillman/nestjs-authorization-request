import { Injectable } from '@nestjs/common';
import { SecureService } from '../Services/secure.service';
import { UseCase } from './use-case.interface';
import { AuthorizationResponse } from '../Domain/auth-response';
import { CacheService } from '../Services/cache.service';
import { KEYS } from '../Common/keys.enum';

@Injectable()
export class GetTokenUseCase implements UseCase<AuthorizationResponse> {
  
  constructor(private readonly secureService : SecureService,
              private readonly cache : CacheService){ }

  public code: string;
  public state: string;

  public get authorizationUrl(): string {
    return this.secureService.authorizationUrl;
  }

  public async execute(): Promise<AuthorizationResponse> {
    let authResponse: AuthorizationResponse = this.cache.getValue(KEYS.ACCESS_TOKEN);
    if(authResponse){
      return authResponse;
    }
    const result = await this.secureService.getToken(this.code, this.state);
    if(result.DidSucceed){
      const authResponse = result.Value;
      this.cache.setValue(KEYS.ACCESS_TOKEN, authResponse);
      return authResponse;
    }
    throw new Error(result.ErrorMessage);
  }
}
