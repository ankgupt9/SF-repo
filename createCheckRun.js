const fs = require('fs');
const readline = require('readline')
const { Octokit } = require("@octokit/core");
const github = require('@actions/github');
const core = require('@actions/core');
const {createAppAuth} = require('@octokit/auth-app');


async function createCheckrun(){

    // get token for octokit
    
    var githubToken = process.env.GITHIB_TOKEN
    const octokit = new Octokit({
      authStrategy: createAppAuth,
      auth: {
              appId: 322743,
              privateKey: githubToken,
              cliendId: "Iv1.5b9fa30bae13a158",
              clientSecret:"81e639ebfd5f56cf63ef708c3ce2e477d147b431",
              installationId:36741506,
            }
    });
   /* const octokit = new Octokit({
      auth: "Bearer " + githubToken
    })*/
    //const octokit = await app.getInstallationOctokit(36741506);
    
      await octokit.request('POST /repos/{owner}/{repo}/check-runs', {
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        name: 'mighty_readme',
        head_sha: github.context.sha,
        status: 'completed',
        conclusion: 'failure',
        output: {
          title: 'Mighty Readme report',
          summary: '',
          text: '',
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
        },
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })

    /*  const check = await octokit.rest.checks.create({
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
          });*/


}

createCheckrun();
