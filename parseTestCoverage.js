const fs = require('fs');
const readline = require('readline')
const { Octokit } = require("@octokit/core");
const github = require('@actions/github');
const core = require('@actions/core');

async function extractTestCoverage(){

    // get token for octokit
    var githubToken = process.env.GITHUB_TOKEN
    const octokit = new Octokit({
      auth: githubToken
    })

    const jsonString = fs.readFileSync('./test-results/coverage/coverage-summary.json')
    var coverage = JSON.parse(jsonString)
    var coveragePercent = coverage.total.lines.pct
    if (coveragePercent < 90 || coveragePercent == 'Unknown'){
            await octokit.request('POST /repos/{owner}/{repo}/statuses/{sha}', {
              owner: github.context.owner,
              repo: github.context.repo,
              sha: github.context.sha,
              state: 'failure',
              target_url: 'https://example.com/build/status',
              description: 'The build succeeded!',
              context: 'continuous-integration/jenkins',
              headers: {
                'X-GitHub-Api-Version': '2022-11-28'
              }
            })

            const check = await octokit.rest.checks.create({
              owner: github.context.repo.owner,
              repo: github.context.repo.repo,
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

          core.setFailed('Low Code Coverage');
    }
}

extractTestCoverage();
