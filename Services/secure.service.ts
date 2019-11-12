import { Injectable } from '@nestjs/common';
import SERVERS from '../Common/servers';
import querystring = require('querystring');
import makeGuid = require('uuid/v1');
import ConfigService from '../Common/config.service';
import HttpShim from '../Infrastructure/http-shim';

let _state = '';

@Injectable()
export default class SecureService {
  
  private client_id: string;
  private client_secret: string;
  private redirect_uri: string;

  constructor(config: ConfigService, 
              private readonly httpShim: HttpShim) {
    this.client_id = config.get('CLIENT_ID');
    this.client_secret = config.get('CLIENT_SECRET');
    this.redirect_uri = config.get('REDIRECT_URI');
  }

  get authorizationUrl(): string {
    let authUrl = `${SERVERS.SECURE}/connect/authorize`;
    _state = makeGuid();
    const parameters = querystring.stringify({
      response_type: 'code',
      client_id: this.client_id,
      redirect_uri: this.redirect_uri,
      scope: 'openid',
      state: _state
    });
    return authUrl.concat('?', parameters);
  }

  public async getToken(code: string, state: string): Promise<string> {
    if(state != _state) {
      throw new Error('Forged Authorization Request');
    }

    const content = querystring.stringify({
      code,
      redirect_uri: this.redirect_uri,
      client_id: this.client_id,
      client_secret: this.client_secret,
      scope: 'openid',
      grant_type: 'authorization_code',
    });

    this.httpShim.baseUrl = SERVERS.SECURE;

    const res = await this.httpShim.post('connect/token', content);

    if (res.ok) {
      const data = await res.json();
      return data.access_token;
    }
    
    throw new Error(res.statusText);
  }

}
