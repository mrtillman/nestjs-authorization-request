import { KeyValuePair } from "../Domain/key-value-pair";
import { Injectable } from '@nestjs/common';
import { KEYS } from "../Common/keys.enum";
import { CacheInterface } from "./cache.interface";

// TODO: consume Redis client
// https://github.com/NodeRedis/node-redis

@Injectable()
export class CacheService implements CacheInterface {
  static self: KeyValuePair<string, any> = { };

  clear(){
    CacheService.self = {}
  }
  
  getValue<T>(key: KEYS){
    return CacheService.self[key] as T;
  };

  setValue<T>(key: KEYS, value: T) {
    CacheService.self[key] = value;
  }
}