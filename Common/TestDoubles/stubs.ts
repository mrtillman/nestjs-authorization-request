import { AuthorizationResponse } from '../../Domain/auth-response';
import { AuthorizationRequest } from '../../Domain/auth-request';

export const token = "t0k3n";
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
export const refreshToken = "r3fr3$ht0k3n";
export const authorizationUrl = "@uth0r1z@ti0nUrl";
export const authRequest = {
  code: '123',
  redirectUri: 'https://example-app.com/callback',
  clientId: 'a545f608-6583-4bb8-91b9-dbdfdae3dd3e',
  clientSecret: 'e572ba00-6195-11ea-bc55-0242ac130003',
  scope: 'openid',
  grantType: 'authorization_code'
} as AuthorizationRequest
export const refreshTokenRequest = {
  clientId: 'a545f608-6583-4bb8-91b9-dbdfdae3dd3e',
  clientSecret: 'e572ba00-6195-11ea-bc55-0242ac130003',
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
export const code = "@uth0r1z@ti0nc0d3";
export const state = "5t@t3";
