const fetch = require('isomorphic-unfetch');
const makeGuid = require('uuid/v1');
const { SECURE } = require('../servers');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;
const response_type = "code";
const querystring = require('querystring');

let _state = '';

const getAuthUrl = () => {
  let authUrl = `${SECURE}/connect/authorize`;
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

const getToken = async (code, state) => {

    if(_state != state) {
      throw new Error('Forged Authorization Request');
    }

    const res = await fetch(`${SECURE}/connect/token`, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        'accept': 'application/json'
      },
      body: querystring.stringify({
        code,
        redirect_uri,
        client_id,
        client_secret,
        scope: 'openid',
        grant_type: 'authorization_code',
      }),
    });
    
    if (res.ok) {
      const data = await res.json();
      return data.access_token;
    }
    
    throw new Error(res.statusText);
}

module.exports = {
  getToken,
  get authorizationUrl() {
    return getAuthUrl();
  },
};
