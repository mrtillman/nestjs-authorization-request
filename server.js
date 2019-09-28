require('dotenv').config();
const express = require('express');
const app = express();
const secureApi = require('./api/secure');
const coreApi = require('./api/core');
const { handleError } = require('./utils');

app.use(express.static('public'));

// 1. Begin Authorization Request
app.get("/sign-in", function(req,res){
    res.redirect(secureApi.authorizationUrl);
});

// 2. Authorization Grant
app.get("/oauth2/callback", async function(req, res) {

  // 3. Authorization Grant
  const { code, state } = req.query;

  // 4. Access Token
  const [token, tokenErr] = await handleError(secureApi.getToken(code, state));

  if(tokenErr) {
    return res.status(401).end(tokenErr.message);
  };

  // 5. Access Token
  coreApi.token = token;
  
  const [counters, countersErr] = await handleError(coreApi.getCounters());

  if(countersErr) {
    return res.status(400).end(countersErr.message);
  };
  
  // 6. Protected Resource
  res.json(counters);

})

app.get("*", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});

var listener = app.listen(process.env.PORT || 8080, function () {
  console.log('Magic is happening on port ' + listener.address().port);
});
