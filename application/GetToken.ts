import { Injectable } from '@nestjs/common';
import IUseCase from '../application/IUseCase';

@Injectable()
export default class GetToken implements IUseCase<String> {
  private _code: String;
  private _state: String;
  constructor(code, state) {
    this._code = code;
    this._state = state;
  }
  execute(): String {
    return `${this._code}+${this._state}`;
  }
}