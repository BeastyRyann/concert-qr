const tokens = {};

exports.handler = async (event) => {
  const token = event.queryStringParameters.token;
  
  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Token missing" })
    };
  }
  
  // Check if token exists and is valid
  if (tokens[token] && tokens[token].expiresAt > Date.now()) {
    return {
      statusCode: 302,
      headers: {
        Location: 'https://example.com/success'
      },
      body: ''
    };
  }
  
  // Token invalid or expired
  return {
    statusCode: 410,
    body: JSON.stringify({ error: "Token expired or invalid" })
  };
};