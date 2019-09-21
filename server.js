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
app.get("/oauth2/callback", function(req, res) {
  const authorization_code = req.query.code;
  const handleError = err => res.status(400).json(err);
  // 4. & 5. Access Token
  secureApi.getToken(authorization_code).then(token => {
    
    // 6. Protected Resource
    coreApi.token = token;
    coreApi.getCounters()
           .then(counters => {
             res.json(counters);
           })
           .catch(handleError)
  }).catch(handleError);
})

app.get("*", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});

var listener = app.listen(process.env.PORT || 8080, function () {
  console.log('Magic is happening on port ' + listener.address().port);
});
