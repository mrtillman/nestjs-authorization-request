const fetch = require('isomorphic-unfetch');
const makeGuid = require('uuid/v1');
const baseUrl = process.env.NODE_ENV == 'production'
                ? "https://secure.counter-culture.io"
                : "http://counter-culture:5000";

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;
const response_type = "code";
const querystring = require('querystring');

let _state = '';

const getAuthUrl = () => {
  let authUrl = `${baseUrl}/connect/authorize`;
  _state = makeGuid();
  const parameters = querystring.stringify({
    response_type,
    client_id,
    redirect_uri,
    scope: 'openid',
    state: _state
  });
  return authUrl.concat('?', parameters);
};

const getToken = (code, state) => {
  return new Promise((resolve, reject) => {
    if(_state != state) {
      reject('Forged Authorization Request');
    }
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
  },
};
