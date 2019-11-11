import Counter from '../domain/counter';

export default interface IFetchWrapper {
  GetToken(querystring : string) : Promise<string>;
  GetCounters(token: string): Promise<Array<Counter>>;
}