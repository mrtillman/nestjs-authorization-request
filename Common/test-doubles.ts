import { AuthorizationResponse } from '../Domain/auth-response';
import { AuthorizationRequest } from '../Domain/auth-request';

export const token = "a2a3fa68-658a-4916-94ad-f1170a649839";
export const clientId = "10ae9344-e599-4c49-ab0c-2891521ccc46";
export const clientSecret = "013e6077-5ef1-4679-b353-a5792f9faabf";
export const refreshToken = "8681bade-6c3a-4b86-a38a-378da2bf1181";
export const code = "3bd5b7a0-876b-4a06-9aa8-903fe4d7e8e6";
export const state = "54719797-8ee7-488c-824a-f40fd9fab348";

export const authorizationUrl = "https://secure.counter-culture.io/connect/authorize";
export const redirectUri = "https://secure.counter-culture.io/oauth2/callback";

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
  code,
  redirectUri,
  clientId,
  clientSecret,
  scope: 'openid',
  grantType: 'authorization_code'
} as AuthorizationRequest;
export const refreshTokenRequest = {
  clientId,
  clientSecret,
  grantType: 'authorization_code',
  refreshToken,
} as AuthorizationRequest;
export const authResponse = {
  access_token: token,
  expires_in: Date.now.toString(),
  refresh_token: refreshToken,
  scope: "openid",
  token_type: "bearer"
} as AuthorizationResponse;
