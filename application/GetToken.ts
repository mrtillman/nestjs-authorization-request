import { Injectable } from '@nestjs/common';
import SecureService from '../services/secure.service';
import IUseCase from './IUseCase';

@Injectable()
export default class GetTokenUseCase implements IUseCase<string> {
  
  constructor(secureService : SecureService){
    this.secureService = secureService;
  }

  public code: string;
  public state: string;
  private secureService: SecureService;

  public async execute(): Promise<string> {
    return await this.secureService
                     .GetToken(this.code, this.state);  
  }
}
