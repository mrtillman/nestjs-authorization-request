require('dotenv').config();
var request = require('request');
const makeGuid = require('uuid/v1');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;
const response_type = "code";
const baseUrl = process.env.NODE_ENV == 'production'
                ? "https://secure.counter-culture.io"
                : "http://counter-culture:5000";

const state = makeGuid();

let authorizationUrl = baseUrl + "/connect/authorize?";

// init project
var express = require('express');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/sign-in", function(req,res){
    authorizationUrl = authorizationUrl.concat([
      "response_type=" + response_type,
      "client_id=" + client_id,
      "redirect_uri=" + redirect_uri,
      "scope=openid",
      "state=" + state
    ].join("&"));
    res.redirect(authorizationUrl);
})

app.get("/oauth2/callback", function(req, res) {
  const authorization_code = req.query.code;
  getToken(authorization_code).then(token => {
    res.end(token);
  });
})

function getToken(code){
  return new Promise((resolve, reject) => {
    var form = {
      code,
      redirect_uri,
      client_id,
      client_secret,
      scope: 'openid',
      grant_type: 'authorization_code',
    };
    var options = {
      url: `${baseUrl}/connect/token`,
      form
    }
    request.post(options, (e, r, body) => {
      if(e) reject(e);
      resolve(JSON.parse(body).access_token);
    });
  })
}

// http://expressjs.com/en/starter/basic-routing.html
app.get("*", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 8080, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
