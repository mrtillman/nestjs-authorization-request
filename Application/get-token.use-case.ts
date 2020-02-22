import { Injectable } from '@nestjs/common';
import { SecureService } from '../Services/secure.service';
import { UseCase } from './use-case.interface';
import { AuthorizationResponse } from 'Domain/auth-response';

@Injectable()
export class GetTokenUseCase implements UseCase<AuthorizationResponse> {
  
  constructor(private readonly secureService : SecureService){ }

  public code: string;
  public state: string;

  public get authorizationUrl(): string {
    return this.secureService.authorizationUrl;
  }

  public async execute(): Promise<AuthorizationResponse> {
    const result = await this.secureService.getToken(this.code, this.state);
    return result.Value;
  }
}
