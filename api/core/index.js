const fetch = require('isomorphic-unfetch');
const { API } = require('../servers');

let _token = '';

const getCounters = async () => {
  const res = await fetch(`${API}/v1/counters`, {
    headers: {
      'authorization': `bearer ${_token}`,
    },
  })

  if (res.ok) {
    return await res.json();
  }
  
  throw new Error(res.statusText);
}

module.exports = {
  set token(value) {
    _token = value;
  },
  getCounters,
};
