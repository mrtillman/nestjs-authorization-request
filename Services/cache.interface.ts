export interface CacheInterface {
  getValue<T>(key: string): T;
  setValue<T>(key: string, value: T);
  setRefreshToken(value: string);
  getRefreshToken(): string;
}