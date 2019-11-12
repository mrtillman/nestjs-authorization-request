import Counter from '../Domain/counter';

export default interface IFetchWrapper {
  GetToken(querystring : string) : Promise<string>;
  GetCounters(token: string): Promise<Array<Counter>>;
}