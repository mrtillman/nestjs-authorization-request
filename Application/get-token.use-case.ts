import { Injectable } from '@nestjs/common';
import SecureService from '../Services/secure.service';
import UseCase from './use-case.interface';

@Injectable()
export default class GetTokenUseCase implements UseCase<string> {
  
  constructor(private readonly secureService : SecureService){ }

  public code: string;
  public state: string;

  public get authorizationUrl(): string {
    return this.secureService.authorizationUrl;
  }

  public async execute(): Promise<string> {
    return await this.secureService
                     .getToken(this.code, this.state);  
  }
}