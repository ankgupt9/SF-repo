const fs = require('fs');
const readline = require('readline')
const { Octokit } = require("@octokit/core");
const github = require('@actions/github');
const core = require('@actions/core');
const {createAppAuth} = require('@octokit/auth-app');


async function createCheckrun(){

    // get token for octokit
    
    var githubToken = process.env.GITHIB_TOKEN
    const octokit = new Octokit({
      authStrategy: createAppAuth,
      auth: {
              appId: 322743,
              privateKey: `-----BEGIN PRIVATE KEY-----
              MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCw/vLT/14pBoTs
              E/18WisL0v1VpnL476wPbSMUJdcuQVRxzFmNdmwilonci7D1Z0VTbkmhFwuUjolT
              6kMa6NlM01kJfuL+EVgzHy+Ks4TloHCJDfhkpJ+1yhCUzc3O2lRjcYWOMoRZLTDk
              LQTbt5V/L6y6KOCvORvzSMVidAwzS7taLgZlNPVNOpfM4D1mDA2rYVvlSsvUjjLd
              DgphyxNn09sUeSHbUlX8MBQUv1OHHhGLBk8dJsg86QhXusQ/uTSkENJ8aH3+9U1K
              ii4+RZec+v8YoDSXavuZH7KCTniy1v4ZjRNLr10QmjBEi6ijtJbC5X8ugEflEY6R
              oGFpAYxBAgMBAAECggEBAJ1CWJSdv5ap8S4kcMOtBbQiye3wzxR5NqIaMOG04WR6
              rUHS8/pprphosqLfBuJz2DfRtN/JLwPWRRPm/6qIGpJU8jYqpBpjZL8/RSlyaXDw
              xSww2nLphfGqUGM2HFdeyz3z3ltCbS8ipN8HVNq3Wb/ApzJcIY3uKvRUwvO/8hsc
              AwLLzSCx4vOGMvawETh+raqMv7TAUFf9XJAJhuII+Lwl0O+G83rKe2VxwsRmChGV
              eXn1YSZBWtAizp8ZJ8Y3dfNr+vmMZzHjlARGXwVs7fAy/p+ztSacSuCEquNRIbkM
              ftpYNPP2/RKP+YHpi5Zy6L1uGo/rmBEDrA2o7Ks73wECgYEA3londR0YFQAQTEO8
              rVf+T/F77sdh/Y79ITVOnc8r5nR724QOwoPJUuvqrde0OfGUbeDNh3SKZ8v1u4Rq
              hCOicBRTYYhmkbeVS12D3OX2zntnyngxQM0T4QejiyXUySuShpaN2dmpJBnc8B7S
              zS6+i71yPqeBdTvqMyV+UayUY7ECgYEAy8e1SVu1KDQMN4csb2QtBoM1BcbEf+QJ
              lyR4RcawfEC/1Tq2QB6dXvwK2wLuoGcHn4+nn1KtCNXwK8BhBxzaVozNsW7vP39l
              ONwnYu1cPLZ9yXOlPXkmOxpN1MUWokE31PjJNn/BL2UPDOKq3Zf0XN9kFZrV+KXO
              B7H6tAD0pZECgYEAqkpBjeAKYYr68G2wQtHxYyh+0hDBa3/nPVemLhZMeOMdOLGa
              3D4yId+sjBd3YCk0lDJnNiZ7GaOLP2HacfkYnt3yPfBJHbCMFnw4USWOL/UzOE10
              6zwkzWMcTaVbofZM8ea8HOwmLg/gtcXljF8Qb9VXecSv0Slh5GoCpGqX+wECgYEA
              o0L7MSyyNOWOLCa2KQBfOmqAXoJjB/uQ23Cyk2SeHM5bYuBJB5H/jwvrPpBY0lX5
              O5MCPpkkXIHai5LzqZkqLFFespsoPv04AZgQTifQ0Ct9F5r5dgjL4moulRraCWCq
              9Ivl2S39fpU+u5oWPrbxZj7rlouYhj+Ak5W6P+DMIKECgYAL/ipz2H2vSjJy4xs4
              h2lTXh14nl/Fst6ZjPgc8LVZE46dVxf0FCHQDFyzoha+rBqaTqKz1nh+KvNI/Dd/
              a9qWAZoWYYLLDKYjIRlpjWQM1xASdv+6IKkQpXVG9/ldL4DbHIL49wW1YGDbh0T/
              K/qIys/CNv8FIZ8cPGD8R2BofA==
              -----END PRIVATE KEY-----
              `,
              cliendId: "Iv1.5b9fa30bae13a158",
              clientSecret:"81e639ebfd5f56cf63ef708c3ce2e477d147b431",
              installationId:36741506,
            }
    });
   /* const octokit = new Octokit({
      auth: "Bearer " + githubToken
    })*/
    //const octokit = await app.getInstallationOctokit(36741506);
    
      await octokit.request('POST /repos/{owner}/{repo}/check-runs', {
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        name: 'mighty_readme',
        head_sha: github.context.sha,
        status: 'completed',
        conclusion: 'failure',
        output: {
          title: 'Mighty Readme report',
          summary: '',
          text: '',
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
        },
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })

    /*  const check = await octokit.rest.checks.create({
              owner: github.context.repo.owner,
              repo: github.context.repo,
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
          });*/


}

createCheckrun();
