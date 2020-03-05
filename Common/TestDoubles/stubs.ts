import { AuthorizationResponse } from '../../Domain/auth-response';

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
export const authResponse = {
  accessToken: token,
  expiresIn: Date.now.toString(),
  refreshToken: refreshToken,
  scope: "openid",
  tokenType: "bearer"
} as AuthorizationResponse;
export const code = "@uth0r1z@ti0nc0d3";
export const state = "5t@t3";
