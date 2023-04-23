const fs = require('fs');
const readline = require('readline')
const { Octokit } = require("@octokit/core");
const github = require('@actions/github');
const core = require('@actions/core');
const {createAppAuth} = require('@octokit/auth-app');


async function createCheckrun(){

    // get token for octokit
    
   // var githubToken = process.env.GITHIB_TOKEN
    const octokit = new Octokit({
      authStrategy: createAppAuth,
      auth: {
              appId: 322743,
              privateKey: `-----BEGIN RSA PRIVATE KEY-----
              MIIEpQIBAAKCAQEAsP7y0/9eKQaE7BP9fForC9L9VaZy+O+sD20jFCXXLkFUccxZ
              jXZsIpaJ3Iuw9WdFU25JoRcLlI6JU+pDGujZTNNZCX7i/hFYMx8virOE5aBwiQ34
              ZKSftcoQlM3NztpUY3GFjjKEWS0w5C0E27eVfy+suijgrzkb80jFYnQMM0u7Wi4G
              ZTT1TTqXzOA9ZgwNq2Fb5UrL1I4y3Q4KYcsTZ9PbFHkh21JV/DAUFL9Thx4RiwZP
              HSbIPOkIV7rEP7k0pBDSfGh9/vVNSoouPkWXnPr/GKA0l2r7mR+ygk54stb+GY0T
              S69dEJowRIuoo7SWwuV/LoBH5RGOkaBhaQGMQQIDAQABAoIBAQCdQliUnb+WqfEu
              JHDDrQW0Isnt8M8UeTaiGjDhtOFkeq1B0vP6aa6YaLKi3wbic9g30bTfyS8D1kUT
              5v+qiBqSVPI2KqQaY2S/P0Upcmlw8MUsMNpy6YXxqlBjNhxXXss9895bQm0vIqTf
              B1Tat1m/wKcyXCGN7ir0VMLzv/IbHAMCy80gseLzhjL2sBE4fq2qjL+0wFBX/VyQ
              CYbiCPi8JdDvhvN6yntlccLEZgoRlXl59WEmQVrQIs6fGSfGN3Xza/r5jGcx45QE
              Rl8FbO3wMv6fs7UmnErghKrjUSG5DH7aWDTz9v0Sj/mB6YuWcui9bhqP65gRA6wN
              qOyrO98BAoGBAN5aJ3UdGBUAEExDvK1X/k/xe+7HYf2O/SE1Tp3PK+Z0e9uEDsKD
              yVLr6q3XtDnxlG3gzYd0imfL9buEaoQjonAUU2GIZpG3lUtdg9zl9s57Z8p4MUDN
              E+EHo4sl1MkrkoaWjdnZqSQZ3PAe0s0uvou9cj6ngXU76jMlflGslGOxAoGBAMvH
              tUlbtSg0DDeHLG9kLQaDNQXGxH/kCZckeEXGsHxAv9U6tkAenV78CtsC7qBnB5+P
              p59SrQjV8CvAYQcc2laMzbFu7z9/ZTjcJ2LtXDy2fclzpT15JjsaTdTFFqJBN9T4
              yTZ/wS9lDwziqt2X9FzfZBWa1filzgex+rQA9KWRAoGBAKpKQY3gCmGK+vBtsELR
              8WMoftIQwWt/5z1Xpi4WTHjjHTixmtw+MiHfrIwXd2ApNJQyZzYmexmjiz9h2nH5
              GJ7d8j3wSR2wjBZ8OFElji/1MzhNdOs8JM1jHE2lW6H2TPHmvBzsJi4P4LXF5Yxf
              EG/VV3nEr9EpYeRqAqRql/sBAoGBAKNC+zEssjTljiwmtikAXzpqgF6CYwf7kNtw
              spNknhzOW2LgSQeR/48L6z6QWNJV+TuTAj6ZJFyB2ouS86mZKixRXrKbKD79OAGY
              EE4n0NArfRea+XYIy+JqLpUa2glgqvSL5dkt/X6VPruaFj628WY+65aLmIY/gJOV
              uj/gzCChAoGAC/4qc9h9r0oycuMbOIdpU14deJ5fxbLemYz4HPC1WROOnVcX9BQh
              0Axcs6IWvqwamk6is9Z4firzSPw3f2valgGaFmGCywymIyEZaY1kDNcQEnb/uiCp
              EKV1Rvf5XS+A2xyC+PcFtWBg24dE/yv6iMrPwjb/BSGfHDxg/EdgaHw=
              -----END RSA PRIVATE KEY-----
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
