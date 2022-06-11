const github = require('./utils/github')

exports.handler = async function (event) {
  const login = event.queryStringParameters.login
  const repo = event.queryStringParameters.repo
  const [branches, commits] = await Promise.all([
    github.get(`/repos/${login}/${repo}/branches`),
    github.get(`/repos/${login}/${repo}/commits`),
  ])

  return {
    headers: { 'Content-Type': 'application/json' },
    statusCode: 200,
    body: JSON.stringify({ branches: branches.data, commits: commits.data }),
  }
}
