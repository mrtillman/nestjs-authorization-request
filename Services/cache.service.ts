import { KeyValuePair } from "Domain/key-value-pair";
import { Injectable } from '@nestjs/common';
import { KEYS } from "../Common/keys.enum";
import { CacheInterface } from "./cache.interface";

// TODO: consume Redis client
// https://github.com/NodeRedis/node-redis

@Injectable()
export class CacheService implements CacheInterface {
  static _cache: KeyValuePair<string, any> = { };

  getValue<T>(key: KEYS){
    return CacheService._cache[key] as T;
  };

  setValue<T>(key: KEYS, value: T) {
    CacheService._cache[key] = value;
  }

  setRefreshToken(value: string){
    this.setValue(KEYS.REFRESH_TOKEN, value);
  }

  getRefreshToken(): string {
    return this.getValue(KEYS.REFRESH_TOKEN);
  }
}