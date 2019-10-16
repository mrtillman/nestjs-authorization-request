import { Injectable } from '@nestjs/common';
import SecureService from '../services/secure.service';
import IUseCase from './IUseCase';

@Injectable()
export default class GetTokenUseCase implements IUseCase<string> {
  
  public code: string;
  public state: string;
  
  private _secureService: SecureService;

  constructor(secureService : SecureService){
    this._secureService = secureService;
  }

  public async execute(): Promise<string> {
    return await this._secureService
                     .GetToken(this.code, this.state);  
  }
}
