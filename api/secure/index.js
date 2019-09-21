const fetch = require('isomorphic-unfetch');
const makeGuid = require('uuid/v1');
const baseUrl = process.env.NODE_ENV == 'production'
                ? "https://secure.counter-culture.io"
                : "http://counter-culture:5000";

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;
const response_type = "code";
const state = makeGuid();

let authorizationUrl = baseUrl + "/connect/authorize?";

const getAuthUrl = () => {
  authorizationUrl = authorizationUrl.concat([
    "response_type=" + response_type,
    "client_id=" + client_id,
    "redirect_uri=" + redirect_uri,
    "scope=openid",
    "state=" + state
  ].join("&"));
  return authorizationUrl;
};

const getToken = async (code) => {
  return new Promise((resolve, reject) => {
    const url = `${baseUrl}/connect/token`;
    var form = {
      code,
      redirect_uri,
      client_id,
      client_secret,
      scope: 'openid',
      grant_type: 'authorization_code',
    };
    var formEncoded = Object.keys(form)
                            .map(key => `${key}=${form[key]}`)
                            .join('&');
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        'accept': 'application/json'
      },
      body: formEncoded,
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      reject(res.statusText);
    }).then(res => {
      resolve(res.access_token);
    }).catch(reject);
  })
}

module.exports = {
  getToken,
  get authorizationUrl() {
    return getAuthUrl();
  }
};
