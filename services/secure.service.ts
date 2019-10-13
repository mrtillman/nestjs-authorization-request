import { Injectable } from '@nestjs/common';
import { SERVERS } from '../common/servers';
import querystring = require('querystring');
import makeGuid = require('uuid/v1');
import { ConfigService } from '../common/config.service';

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;
const response_type = "code";

let _state = '';

@Injectable()
export class SecureService {
  
  private client_id: String;
  private client_secret: String;
  private redirect_uri: String;

  constructor(config: ConfigService) {
    this.client_id = config.get('CLIENT_ID')
    this.client_secret = config.get('CLIENT_SECRET')
    this.redirect_uri = config.get('REDIRECT_URI')
  }
  get authorizationUrl(): String {
    let authUrl = `${SERVERS.SECURE}/connect/authorize`;
    _state = makeGuid();
    const parameters = querystring.stringify({
      response_type,
      client_id: this.client_id,
      redirect_uri: this.redirect_uri,
      scope: 'openid',
      state: _state
    });
    return authUrl.concat('?', parameters);
  }
}
