const https = require('https')
const github = require('@actions/github');

async function createCheckrun(){

  var str = '';
  const repoName = github.context.repo.repo;
  const owner = github.context.repo.owner

  const options = {
    method: 'post',
    headers: {
      'User-Agent': 'GitHub App',
      'authorization': 'Bearer ' + process.env.INSTALLATION_TOKEN,
      'accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version':'2022-11-28'
    }
  }
  
  const post_data = JSON.stringify({ 
      "name": "mighty_readme",
      "head_sha": github.context.sha,
      "status": "completed",
      "started_at": "2023-04-29T19:39:10Z",
      "conclusion": "success",
      "completed_at": "2023-04-29T19:49:10Z"
  })
  
  const req = https.request('https://api.github.com/repos/' + owner + '/' + repoName + '/check-runs',options, function(res) {
    console.log(res.statusCode);
    res.on('data', function(d) {
     str += d;
  
    })
    res.on('end', function(d) {
      console.log(str);
    })
  })
  req.write(post_data2)
  req.end()


}

createCheckrun();
