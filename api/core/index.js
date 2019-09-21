const fetch = require('isomorphic-unfetch');
const baseUrl = process.env.NODE_ENV == 'production'
                ? "https://api.counter-culture.io"
                : "http://counter-culture:4000";

let _token = '';

const getCounters = async () => {
  const url = `${baseUrl}/v1/counters`
  return new Promise((resolve, reject) => {
    fetch(url, {
      headers: {
        'authorization': `bearer ${_token}`,
      },
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      reject(res.statusText);
    }).then(res => {
      resolve(res);
    }).catch(reject);
  })
}

module.exports = {
  set token(value) {
    _token = value;
  },
  getCounters,
};
