const github = require('@actions/github');
const fs = require('fs');
const App = require('octokit');
const privateKey = fs.readFileSync('./private-key.pem','UTF-8');

async function newCheckrun(){

  const repoName = github.context.repo.repo;
  const owner = github.context.repo.owner

  const app = new App({
    appId: 322743,
    privateKey,
  });
  const octokit = await app.getInstallationOctokit(36805855);
  await octokit.request("GET /meta")
}

newCheckrun();
