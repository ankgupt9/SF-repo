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

const app = new App({
  appId: 322743,
  privateKey,
});
const octokit = await app.getInstallationOctokit(36741506);

const check = await octokit.rest.checks.create({
  owner: github.context.repo.owner,
  repo: github.context.repo,
  name: 'Readme Validator',
  head_sha: github.context.sha,
  status: 'completed',
  conclusion: 'failure',
  output: {
      title: 'README.md must start with a title',
      summary: 'Please use markdown syntax to create a title',
      annotations: [
          {
              path: 'README.md',
              start_line: 1,
              end_line: 1,
              annotation_level: 'failure',
              message: 'README.md must start with a header',
              start_column: 1,
              end_column: 1
          }
      ]
  }
});

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
