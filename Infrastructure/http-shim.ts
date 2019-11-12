import SERVERS from '../Common/servers';
import * as fetchImport from 'isomorphic-unfetch';
import AuthorizationRequest from '../Domain/authorization-request';
import querystring = require('querystring');

const fetch = (fetchImport.default || fetchImport) as typeof fetchImport.default;

export default class HttpShim {
  public token: string;
  
  async fetchCounters() : Promise<Response> {
    return await fetch(`${SERVERS.API}/v1/counters`, {
      method: "GET",
      headers: {
        "authorization": `bearer ${this.token}`,
      }
    });
  }

  async fetchToken(authRequest: AuthorizationRequest) : Promise<Response> {
    const requestParameters = querystring.stringify({
      code: authRequest.code,
      redirect_uri: authRequest.redirectUri,
      client_id: authRequest.clientId,
      client_secret: authRequest.clientSecret,
      scope: authRequest.scope,
      grant_type: authRequest.grantType,
    });
    return await fetch(`${SERVERS.SECURE}/connect/token`, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        'accept': 'application/json'
      },
      body: requestParameters,
    });
  }
}
