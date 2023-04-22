const fs = require('fs');
const readline = require('readline')
const { Octokit } = require("@octokit/core");

async function extractTestCoverage(){

    const octokit = new Octokit({
        auth: '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-TOKEN'
      })
    const jsonString = fs.readFileSync('./test-results/coverage/coverage-summary.json')
    var coverage = JSON.parse(jsonString)
    var coveragePercent = coverage.total.lines.pct
    if (coveragePercent < 90 || coveragePercent == 'Unknown'){
        await octokit.request('POST /repos/{owner}/{repo}/statuses/{sha}', {
            owner: 'OWNER',
            repo: 'REPO',
            sha: 'SHA',
            state: 'success',
            target_url: 'https://example.com/build/status',
            description: 'The build succeeded!',
            context: 'continuous-integration/jenkins',
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          })
        throw "Low test coverage"
    }
}

extractTestCoverage();
