const { v4: uuidv4 } = require('uuid');
const tokenManager = require('./token-manager');

exports.handler = async (event) => {
  const token = uuidv4().replace(/-/g, '');
  const expiresAt = Date.now() + 60000; // 60 seconds
  
  tokenManager.addToken(token, expiresAt);
  
  // Use SITE_URL from environment variables
  const siteUrl = process.env.SITE_URL || 'https://concert-qr.netlify.app';
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      token,
      expiresAt,
      validateUrl: `${siteUrl}/.netlify/functions/validate?token=${token}`
    }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };
};