const{App} = require ('octokit');

async function createCheckrun(){

  let private_pem = File.read("./private-key.pem");
  let private_key = new openssl.PKey.RSA(private_pem);

  
  const app = new App({
    appId: 322743,
    privateKey: private_pem,
  });

const octokit = await app.getInstallationOctokit(36805855);

await octokit.request("GET /meta")

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
