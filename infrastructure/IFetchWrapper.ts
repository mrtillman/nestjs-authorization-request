export default interface IFetchWrapper {
  GetToken(querystring : string) : Promise<string>;
}