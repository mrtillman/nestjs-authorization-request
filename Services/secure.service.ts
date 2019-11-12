import { Injectable } from '@nestjs/common';
import SERVERS from '../Common/servers';
import querystring = require('querystring');
import makeGuid = require('uuid/v1');
import ConfigService from '../Common/config.service';
import FetchWrapper from '../Infrastructure/FetchWrapper';

// TODO: cache state values
let _state = '';

@Injectable()
export default class SecureService {
  
  private client_id: string;
  private client_secret: string;
  private redirect_uri: string;
  private fetch: FetchWrapper;

  constructor(config: ConfigService, fetchWrapper: FetchWrapper) {
    this.client_id = config.get('CLIENT_ID');
    this.client_secret = config.get('CLIENT_SECRET');
    this.redirect_uri = config.get('REDIRECT_URI');
    this.fetch = fetchWrapper;
  }

  get AuthorizationUrl(): string {
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

  public async GetToken(code: string, state: string): Promise<string> {
    if(state != _state) {
      throw new Error('Forged Authorization Request');
    }

    const payload = querystring.stringify({
      code,
      redirect_uri: this.redirect_uri,
      client_id: this.client_id,
      client_secret: this.client_secret,
      scope: 'openid',
      grant_type: 'authorization_code',
    });
    
    return await this.fetch.GetToken(payload);
  }

}
