import { Injectable } from '@nestjs/common';
import SERVERS from '../Common/servers';
import querystring = require('querystring');
import makeGuid = require('uuid/v1');
import ConfigService from './config.service';
import HttpShim from '../Infrastructure/http-shim';
import AuthorizationRequest from '../Domain/auth-request';
import AuthorizationResponse from '../Domain/auth-response';
import Result from '../Common/result';

let _state = '';

@Injectable()
export default class SecureService {
  
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  constructor(config: ConfigService, 
              private readonly http: HttpShim) {
    this.clientId = config.get('CLIENT_ID');
    this.clientSecret = config.get('CLIENT_SECRET');
    this.redirectUri = config.get('REDIRECT_URI');
  }

  get authorizationUrl(): string {
    let authUrl = `${SERVERS.SECURE}/connect/authorize`;
    _state = makeGuid();
    const parameters = querystring.stringify({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: 'openid',
      state: _state
    });
    return authUrl.concat('?', parameters);
  }

  public async getToken(code: string, state: string): Promise<Result<AuthorizationResponse>> {
    if(state != _state) {
      throw new Error('Forged Authorization Request');
    }

    const authRequest : AuthorizationRequest = {
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      code,
      grantType: 'authorization_code',
      redirectUri: this.redirectUri,
      scope: 'openid'
    };

    const res = await this.http.fetchToken(authRequest);
    
    if (res.ok) {
      const data = await res.json();
      const authResponse : AuthorizationResponse = {
        accessToken: data.access_token,
        expiresIn: data.expires_in,
        scope: data.scope,
        tokenType: data.token_type
      };
      return Result.Ok<AuthorizationResponse>(authResponse);
    }
    
    return Result.Fail<AuthorizationResponse>(res.statusText);
  }
}
