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

await octokit.request('GET /repos/{owner}/{repo}/commits/{commit_sha}/comments', {
  owner: github.context.repo.owner,
  repo: github.context.repo,
  name: 'mighty_readdme',
  commit_sha: github.context.sha,
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})

try{
const temp = await octokit.request('POST /repos/{owner}/{repo}/check-runs', {
  owner: github.context.repo.owner,
  repo: github.context.repo,
  name: 'mighty_readme',
  head_sha: github.context.sha,
  status: 'in_progress',
  external_id: '42',
  started_at: '2018-05-04T01:14:52Z',
  output: {
    title: 'Mighty Readme report',
    summary: '',
    text: ''
  },
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})
}catch (error){
  throw(error);
}
throw('Exit');
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
