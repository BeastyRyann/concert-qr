const tokenManager = require('./token-manager');

exports.handler = async (event) => {
  const token = event.queryStringParameters.token;
  
  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Token missing" }),
      headers: {'Access-Control-Allow-Origin': '*'}
    };
  }
  
  const validationResult = tokenManager.validateToken(token);
  
  if (validationResult === 'valid') {
    // Use DEFAULT_TARGET from environment variables
    const targetUrl = process.env.DEFAULT_TARGET || 'https://example.com/success';
    
    return {
      statusCode: 302,
      headers: {
        Location: targetUrl,
        'Access-Control-Allow-Origin': '*'
      },
      body: ''
    };
  }
  
  return {
    statusCode: 410,
    body: JSON.stringify({ error: validationResult }),
    headers: {'Access-Control-Allow-Origin': '*'}
  };
};