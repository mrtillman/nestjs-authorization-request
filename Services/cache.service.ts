import { KeyValuePair } from "../Domain/key-value-pair";
import { Injectable } from '@nestjs/common';
import { KEY } from "../Common/keys.enum";
import { CacheInterface } from "./cache.interface";

// TODO: consume Redis client
// https://github.com/NodeRedis/node-redis

@Injectable()
export class CacheService implements CacheInterface {
  static self: KeyValuePair<string, any> = { };

  clear(){
    CacheService.self = {}
  }
  
  remove(key: KEY){
    delete CacheService.self[key];
  }

  getValue<T>(key: KEY){
    return CacheService.self[key] as T;
  };

  setValue<T>(key: KEY, value: T) {
    CacheService.self[key] = value;
  }
}