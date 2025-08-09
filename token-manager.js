const tokens = {};

exports.handler = async (event) => {
  // This function just maintains the token store
  return {
    statusCode: 200,
    body: 'Token manager active'
  };
};

// Add token to store
exports.addToken = (token, expiresAt) => {
  tokens[token] = { expiresAt };
};

// Remove expired tokens
setInterval(() => {
  const now = Date.now();
  for (const token in tokens) {
    if (tokens[token].expiresAt < now) {
      delete tokens[token];
    }
  }
}, 30000); // Clean every 30 seconds