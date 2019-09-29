module.exports = {
  queryParams: (url) => {
    return (new URL(url)).searchParams;
  }
};
