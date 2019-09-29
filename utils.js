const utils = {
  handleError: (promise) => {
    return promise
      .then(data => ([data, null]))
      .catch(error => Promise.resolve([null, error]));
  },
  queryParams: (url) => {
    return (new URL(url)).searchParams;
  }
};

module.exports = utils;