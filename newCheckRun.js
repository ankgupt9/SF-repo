const github = require('@actions/github');
const fs = require('fs');
const {App} = require('octokit');

async function newCheckrun(){

  const repoName = github.context.repo.repo;
  const owner = github.context.repo.owner
  var privateKey = fs.readFileSync('./private-key.pem','UTF-8');
  const app = new App({
    appId: process.env.ANKUR_GIT_APP_ID,
    privateKey,
  });
  const octokit = await app.getInstallationOctokit(process.env.ANKUR_GIT_APP_INSTALL_ID);
  await octokit.request('POST /repos/{owner}/{repo}/check-runs', {
    owner: owner,
    repo: repoName,
    name: 'mighty_readme',
    head_sha: github.context.sha,
    status: 'completed',
    started_at: '2023-04-30T19:39:10Z',
    conclusion: 'success',
    completed_at: '2023-04-30T19:49:10Z',
    output: {
      title: 'Mighty Readme report',
      summary: 'There are 0 failures, 2 warnings, and 1 notices.',
      text: 'You may have some misspelled words on lines 2 and 4. You also may want to add a section in your README about how to install your app.',
      annotations: [
        {
          path: 'README.md',
          annotation_level: 'warning',
          title: 'Spell Checker',
          message: 'Check your spelling for \'banaas\'.',
          raw_details: 'Do you mean \'bananas\' or \'banana\'?',
          start_line: 2,
          end_line: 2
        },
        {
          path: 'README.md',
          annotation_level: 'warning',
          title: 'Spell Checker',
          message: 'Check your spelling for \'aples\'',
          raw_details: 'Do you mean \'apples\' or \'Naples\'',
          start_line: 4,
          end_line: 4
        }
      ],
      images: [
        {
          alt: 'Super bananas',
          image_url: 'http://example.com/images/42'
        }
      ]
    },
    actions: [
      {
        label: 'Fix',
        identifier: 'fix_errors',
        description: 'Allow us to fix these errors for you'
      }
    ],
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
}

newCheckrun();
