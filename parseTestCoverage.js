const fs = require('fs');
const readline = require('readline')
const { Octokit } = require("@octokit/core");

async function extractTestCoverage(){

    // get token for octokit
    const octokit = new Octokit({
      auth: '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'
    })

    const jsonString = fs.readFileSync('./test-results/coverage/coverage-summary.json')
    var coverage = JSON.parse(jsonString)
    var coveragePercent = coverage.total.lines.pct
    if (coveragePercent < 90 || coveragePercent == 'Unknown'){
            await octokit.request('POST /repos/{owner}/{repo}/statuses/{sha}', {
              owner: github.context.repo.owner,
              repo: github.context.repo.repo,
              sha: github.context.sha,
              state: 'failure',
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
