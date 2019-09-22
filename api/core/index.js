const fetch = require('isomorphic-unfetch');
const baseUrl = process.env.NODE_ENV == 'production'
                ? "https://api.counter-culture.io"
                : "http://counter-culture:4000";

let _token = '';

const getCounters = async () => {
  const res = await fetch(`${baseUrl}/v1/counters`, {
    headers: {
      'authorization': `bearer ${_token}`,
    },
  })

  if (res.ok) {
    const counters = await res.json();
    return counters;
  }
  
  throw res.statusText;
}

module.exports = {
  set token(value) {
    _token = value;
  },
  getCounters,
};
