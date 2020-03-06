import { KEYS } from "../Common/keys.enum";

export interface CacheInterface {
  clear();
  getValue<T>(key: KEYS): T;
  setValue<T>(key: KEYS, value: T);
}