import { KEYS } from "Common/keys.enum";

export interface CacheInterface {
  getValue<T>(key: KEYS): T;
  setValue<T>(key: KEYS, value: T);
  setRefreshToken(value: string);
  getRefreshToken(): string;
}