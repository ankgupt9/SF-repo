const fs = require('fs');
const readline = require('readline')
const { Octokit } = require("@octokit/core");
const github = require('@actions/github');
const core = require('@actions/core');
const {createAppAuth} = require('@octokit/auth-app');
const{App} = require ('octokit');
const {request} = require('@octokit/request');
const privateKey = fs.readFileSync('./private-key.pem');
const jwt = require('jwt')
const openssl = require('openssl')

async function createCheckrun(){

  let private_pem = File.read("./private-key.pem");
  let private_key = new openssl.PKey.RSA(private_pem);
  
  // Generate the JWT
  let payload = {
    // issued at time, 60 seconds in the past to allow for clock drift
    iat: parseInt(Time.now) - 60,
  
    // JWT expiration time (10 minute maximum)
    exp: parseInt(Time.now) + (10 * 60),
  
    // GitHub App's identifier
    iss: "322743"
  };
  
  let jwtToken = JWT.encode(payload, private_key, "RS256");

  const octokit = new Octokit({
    auth: jwtToken
  })

const respone = await octokit.request('POST /repos/{owner}/{repo}/commits/{commit_sha}/comments', {
  owner: github.context.repo.owner,
  repo: github.context.repo,
  body: 'Great stuff',
  path: 'file1.txt',
  position: 4,
  line: 1,
  commit_sha: github.context.sha,
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})

/*
const auth = createAppAuth({
  id: 322743,
  privateKey,
  installationId: 36741506
});

const requestWithAuth = request.defaults({
  request: {
    hook: auth.hook
  }
})

const result = await requestWithAuth("GET /orgs/:org/repos", {
  org: "ankgupt9",
  type: "public"
});*/
   


}

createCheckrun();
