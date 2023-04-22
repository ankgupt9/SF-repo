const fs = require('fs');
const readline = require('readline')
const { Octokit } = require("@octokit/core");

async function extractTestCoverage(){

    // get token for octokit
    const token = core.getInput('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');
    const octokit = new github.getOctokit(token);

    const jsonString = fs.readFileSync('./test-results/coverage/coverage-summary.json')
    var coverage = JSON.parse(jsonString)
    var coveragePercent = coverage.total.lines.pct
    if (coveragePercent < 90 || coveragePercent == 'Unknown'){
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
        throw "Low test coverage"
    }
}

extractTestCoverage();
