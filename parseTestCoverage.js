const fs = require('fs');
const readline = require('readline')

async function extractTestCoverage(){

    const jsonString = fs.readFileSync('./test-results/coverage/coverage-summary.json')
    var coverage = JSON.parse(jsonString)
    var coveragePercent = coverage.total.lines.pct
    if (coveragePercent < 90 || coveragePercent == 'Unknown'){
        throw "Low test coverage"
    }
   // await fs.promises.writeFile('./coverage-percentage.txt',coveragePercent);
}

extractTestCoverage();
