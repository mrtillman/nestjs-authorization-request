import { Injectable } from '@nestjs/common';
import SecureService from '../Services/secure.service';
import IUseCase from './IUseCase';

@Injectable()
export default class GetTokenUseCase implements IUseCase<string> {
  
  constructor(private readonly secureService : SecureService){ }

  public code: string;
  public state: string;

  public get AuthorizationUrl(): string {
    return this.secureService.AuthorizationUrl;
  }

  public async execute(): Promise<string> {
    return await this.secureService
                     .GetToken(this.code, this.state);  
  }
}
