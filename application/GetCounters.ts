import { Injectable } from '@nestjs/common';
import IUseCase from './IUseCase';

@Injectable()
export default class GetCountersUseCase implements IUseCase<string> {
  private _token: string;
  constructor(token: string) {
    this._token = token;   
  }
  execute(): Promise<string> {
    return Promise.resolve("");
  }
}