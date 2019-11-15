const hostNames : string = [
  "counter-culture:5000",
  "localhost:5000",
  "secure.counter-culture.io"
].join('|');

const requestParameters : string = [
  "(?=.*(response_type=(.*)))",
  "(?=.*(&client_id=(.*)))",
  "(?=.*(&redirect_uri=(.*)))",
  "(?=.*(&scope=(.*)))",
  "(?=.*(&state=(.*)))",
].join('');

export default class AuthorizationUrlRegExp extends RegExp {
  constructor(){
    super(`^((http|https)://(${hostNames})/connect/authorize\\?${requestParameters})(.*)$`);
  }
}