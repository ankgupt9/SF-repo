const fs = require('fs');
const { Octokit } = require("@octokit/core");
const { createAppAuth, createOAuthUserAuth } = require("@octokit/auth-app");

async function createCheckrun(){

  const private_pem = fs.readFileSync("./private-key.pem",{ encoding: 'utf8', flag: 'r' });
  
  const installationOctokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: 322743,
      privateKey: private_pem,
      installationId: 36805855,
    },
  });
  await installationOctokit.request("POST /repos/{owner}/{repo}/issues", {
    owner: "ankgupt9",
    repo: "sf-repo",
    title: "title",
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
