const fs = require('fs');
const { App } = require("octokit");

async function createCheckrun(){

  const privateKey = fs.readFileSync("./private-key-pkcs8.key",'utf-8');
  
  const app = new App({
    appId: 322743,
    privateKey,
  });
  
  const octokit = await app.getInstallationOctokit(36741506);

  await octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner: "ankgupt9",
    repo: "af-repo",
    per_page: 2
  });
/*
const auth = createAppAuth({
  id: 322743,
  privateKey,
  installationId: 36741506
});

const requestWithAuth = request.defaults({
  request: {
    hook: auth.hook
  }
})

const result = await requestWithAuth("GET /orgs/:org/repos", {
  org: "ankgupt9",
  type: "public"
});*/
   


}

createCheckrun();
