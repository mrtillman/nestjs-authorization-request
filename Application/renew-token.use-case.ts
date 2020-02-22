import { Injectable } from '@nestjs/common';
import { SecureService } from '../Services/secure.service';
import { UseCase } from './use-case.interface';
import { AuthorizationResponse } from 'Domain/auth-response';

@Injectable()
export class RenewTokenUseCase implements UseCase<AuthorizationResponse> {
  
  constructor(private readonly secureService : SecureService) {}
  
  public refreshToken: string;

  public async execute(): Promise<AuthorizationResponse> {
    const result = await this.secureService.renewToken(this.refreshToken);
    return result.Value;
  }
}
