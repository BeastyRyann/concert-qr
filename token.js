const { v4: uuidv4 } = require('uuid');

exports.handler = async (event) => {
  const token = uuidv4().replace(/-/g, '');
  const expiresAt = Date.now() + 60000; // 60 seconds
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      token,
      expiresAt,
      validateUrl: `${process.env.URL}/.netlify/functions/validate?token=${token}`
    }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };
};