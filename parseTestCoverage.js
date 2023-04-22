const fs = require('fs');
const readline = require('readline')

async function extractTestCoverage(){

    //by default we specify that all tests should run
    const jsonString = fs.readFileSync('./test-results/coverage/coverage-summary.json')
    var coverage = JSON.parse(jsonString)
    var coveragePercent = coverage.total.lines.pct
    if (coveragePercent < 90)
        core.setFailed("Low Test Coverage")
   // await fs.promises.writeFile('./coverage-percentage.txt',coveragePercent);
}

extractTestCoverage();
