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

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
  auth: 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2ODI2NTE5NjIsImV4cCI6MTY4MjY1MjYyMiwiaXNzIjoiMzIyNzQzIn0.QUvMIL7cKNlQfZiIc8mlunFzzRHLuIwRIsYAHQUaHJ2X5b_n_7hkqP3Kdl0XXhEhSJdiaFh874AX8SjYGWSD385NSRHX9I_yvLIRhSGWFzvR8VO5Nr1A1rZ5Hf5VBXakDBwt4ZJgoLd8nBIzDixfi44k6IfxzcyuUODQEjjvQiF1vLfD9IM2bJ_7Yg6fk-zgknJoSpytmS2cXiJKNyyUFak2Ttss0pRNy-d-Wc8JH1ABPg3rFO2wrlD62pktqcUDJkeQtri8ZJeuv06mRLHzXpU2aLEq2MebQYHDl42UWk99_vJh2AAtXuZACPsTGP2RS1qEeKI131N54882W6DGDA'
})

await octokit.request('POST /repos/{owner}/{repo}/check-runs', {
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
