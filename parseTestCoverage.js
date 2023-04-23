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
              owner: 'ankgupt9',
              repo: 'sf-repo',
              sha: github.context.sha,
              state: 'failure',
              target_url: 'https://example.com/build/status',
              description: 'The build succeeded!',
              context: 'continuous-integration/jenkins',
              headers: {
                'X-GitHub-Api-Version': '2022-11-28'
              }
            })
            core.setFailed('Low Code Coverage');
    }
}

extractTestCoverage();
