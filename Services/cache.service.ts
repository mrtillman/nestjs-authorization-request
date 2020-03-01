import { KeyValuePair } from "Domain/key-value-pair";
import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  static _cache: KeyValuePair<string, any> = { };

  getValue(key: string){
    return CacheService._cache[key];
  };

  setValue(key: string, value: any) {
    CacheService._cache[key] = value;
  }
}