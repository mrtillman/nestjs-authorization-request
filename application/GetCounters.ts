import { Injectable } from '@nestjs/common';
import IUseCase from '../application/IUseCase';

@Injectable()
export default class GetCounters implements IUseCase<String> {
  private _token: String;
  constructor(token: String) {
    this._token = token;   
  }
  execute(): String {
    return "";
  }
}