const hostnames = [
  "localhost:5000",
  "secure.counter-culture.io",
  "counter-culture:5000"
].join("|")

const parameters = [
  "(?=.*(response_type=(.*)))",
  "(?=.*(&client_id=(.*)))",
  "(?=.*(&redirect_uri=(.*)))",
  "(?=.*(&scope=(.*)))",
  "(?=.*(&state=(.*)))",
].join("");

const authorizationUrlPattern = `^((http|https)://(${hostnames})/connect/authorize\\?${parameters})(.*)$`;

module.exports = {
  authorizationUrl: new RegExp(authorizationUrlPattern)
};
