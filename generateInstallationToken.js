const fs = require('fs');
const jwt = require("jsonwebtoken")
const https = require('https')
const github = require('@actions/github');

async function generateinstallationtoken(){

var privatePem = fs.readFileSync('./private-key.pem','UTF-8')
var str = '';
var final = '';

payload = {
  iat: Math.floor(Date.now() / 1000) - 30,
  exp: Math.floor(Date.now() / 1000) + (10 * 60),
  iss: process.env.ANKUR_GIT_APP_ID
}
const token = jwt.sign(payload, privatePem, {algorithm: "RS256",})
console.log ('JWT: ' + token);
const post_data = JSON.stringify({ 
	"repository": github.context.repo.repo, 
})

const options = {
  method: 'post',
  headers: {
  	'User-Agent': 'GitHub App',
    'authorization': 'Bearer ' + token,
    'accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version':'2022-11-28'
  }
}

const req = https.request('https://api.github.com/app/installations/'+ process.env.ANKUR_GIT_APP_INSTALL_ID +'/access_tokens',options, function(res) {
  console.log(res.statusCode);
  res.on('data', function(d) {
   str += d;
  })
  res.on('end', function(d) {
    final = JSON.parse(str).token;
    process.env.INSTALLATION_TOKEN = final;
    console.log('Installation token: ' + process.env.INSTALLATION_TOKEN);
  })
})
req.write(post_data)
req.end()
}


generateinstallationtoken();



