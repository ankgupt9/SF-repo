const app = Require('octokit')
const github = require('@actions/github');

async function createCheckrun(){

  const repoName = github.context.repo.repo;
  const owner = github.context.repo.owner
  var privateKey = fs.readFileSync('./private-key.pem','UTF-8')
  const app = new App({
    appId: process.env.ANKUR_GIT_APP_ID,
    privateKey,
  });
  const octokit = await app.getInstallationOctokit(process.env.ANKUR_GIT_APP_INSTALL_ID);
  await octokit.request("GET /meta")
}

newCheckrun();
