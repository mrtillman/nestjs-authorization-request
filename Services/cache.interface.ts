import { KEY } from "../Common/keys.enum";

export interface CacheInterface {
  clear();
  remove(key: KEY);
  getValue<T>(key: KEY): T;
  setValue<T>(key: KEY, value: T);
}