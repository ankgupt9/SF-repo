const github = require('@actions/github');
const fs = require('fs');
const {App} = require('octokit');

async function newCheckrun(){

  var privateKey = fs.readFileSync('./private-key.pem','UTF-8');
  const app = new App({
    appId: process.env.ANKUR_GIT_APP_ID,
    privateKey,
  });

  console.log('SHA' + github.context.sha)
  const octokit = await app.getInstallationOctokit(process.env.ANKUR_GIT_APP_INSTALL_ID);
  await octokit.request('POST /repos/{owner}/{repo}/check-runs', {
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    name: 'mighty_readme',
    head_sha: github.context.head_sha,
    status: 'completed',
    started_at: '2023-04-30T09:39:10Z',
    conclusion: 'success',
    completed_at: '2023-04-30T09:49:10Z',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
}

newCheckrun();
