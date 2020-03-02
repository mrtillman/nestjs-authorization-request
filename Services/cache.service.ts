import { KeyValuePair } from "Domain/key-value-pair";
import { Injectable } from '@nestjs/common';
import { KEYS } from "../Common/keys.enum";
import { CacheInterface } from "./cache.interface";

// TODO: consume Redis client
// https://github.com/NodeRedis/node-redis

@Injectable()
export class CacheService implements CacheInterface {
  static _cache: KeyValuePair<string, any> = { };

  getValue(key: string){
    return CacheService._cache[key];
  };

  setValue(key: string, value: any) {
    CacheService._cache[key] = value;
  }

  setRefreshToken(value: string){
    CacheService._cache[KEYS.REFRESH_TOKEN] = value;
  }

  getRefreshToken(): string {
    return CacheService._cache[KEYS.REFRESH_TOKEN];
  }
}