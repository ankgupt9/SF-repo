const fs = require('fs');
const readline = require('readline')
const { Octokit } = require("@octokit/core");
const github = require('@actions/github');
const core = require('@actions/core');
const {createAppAuth} = require('@octokit/auth-app');
const{App} = require ('octokit');
const {request} = require('@octokit/request');
const privateKey = fs.readFileSync('./private-key.pem');

async function createCheckrun(){

    // get token for octokit
    
   // var githubToken = process.env.GITHIB_TOKEN
/*

   const auth = createAppAuth({
    appId: 322743,
    privateKey,
    cliendId: "Iv1.5b9fa30bae13a158",
    clientSecret:"81e639ebfd5f56cf63ef708c3ce2e477d147b431",
    installationId:36741506,
});*/

const app = new App({
  appId: 322743,
  privateKey,
});
const octokit = await app.getInstallationOctokit(36741506);

await octokit.graphql(`
  query {
    viewer {
      login
    }
  }
  `)

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
