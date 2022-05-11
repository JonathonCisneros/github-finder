const github = require('./utils/github');

exports.handler = async function ( event ) {
  const login = event.queryStringParameters.q;
  // const params = new URLSearchParams({
	// 	sort: 'created',
	// 	per_page: 10,
  // });

  const [ user, repos ] = await Promise.all([
    github.get(`/users/${ login }`);
    // github.get(`/users/${ login }/repos?${ params }`),
  ]);

  return {
    headers: { 'Content-Type': 'application/json' },
    statusCode: 200,
    body: JSON.stringify({ user: user.data, repos: repos.data }),
  }
}
