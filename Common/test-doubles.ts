import { AuthorizationResponse } from '../Domain/auth-response';
import { AuthorizationRequest } from '../Domain/auth-request';
import { v1 as guid } from 'uuid';
import { SERVERS } from './servers';

export const token = guid();
export const clientId = guid();
export const clientSecret = guid();
export const refreshToken = guid();
export const code = guid();
export const state = guid();

export const authorizationUrl = `${SERVERS.SECURE}/connect/authorize`;
export const redirectUri = `${SERVERS.API}/oauth2/callback`;

export const counters = [
  {
    "_id": "5e3691dda2de8e05241a60a5",
    "name": "alcohol",
    "value": 0,
    "skip": 1
  },
  {
    "_id": "5e3691dda2de8e05241a60a6",
    "name": "tobacco",
    "value": 0,
    "skip": 1
  },
  {
    "_id": "5e3691dda2de8e05241a60a7",
    "name": "firearms",
    "value": 0,
    "skip": 1
  }
];
export const authRequest = {
  code: guid(),
  redirectUri,
  clientId,
  clientSecret,
  scope: 'openid',
  grantType: 'authorization_code'
} as AuthorizationRequest
export const refreshTokenRequest = {
  clientId,
  clientSecret,
  grantType: 'authorization_code',
  refreshToken,
}
export const authResponse = {
  access_token: token,
  expires_in: Date.now.toString(),
  refresh_token: refreshToken,
  scope: "openid",
  token_type: "bearer"
} as AuthorizationResponse;
