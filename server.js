require('dotenv').config();
const express = require('express');
const app = express();
const secureApi = require('./api/secure');
const coreApi = require('./api/core');

app.use(express.static('public'));

// 1. Begin Authorization Request
app.get("/sign-in", function(req,res){
    res.redirect(secureApi.authorizationUrl);
});

// 2. & 3. Authorization Grant
app.get("/oauth2/callback", async function(req, res) {

  const authorization_code = req.query.code;
  const state = req.query.state;

  const handleError = err => {
    res.status(400).end(err);
  }

  // 4. & 5. Access Token
  const token = await secureApi.getToken(authorization_code, state)
                               .catch(handleError);
  
  if(!token) return;

  coreApi.token = token;
  
  // 6. Protected Resource
  const counters = await coreApi.getCounters()
                                .catch(handleError);

  res.json(counters);

})

app.get("*", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});

var listener = app.listen(process.env.PORT || 8080, function () {
  console.log('Magic is happening on port ' + listener.address().port);
});
