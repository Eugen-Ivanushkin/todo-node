const jwt = require('jsonwebtoken');
const { secret, tokens } = require('../src/config/jwtSecret');

const TokenSchema = require('../src/models/token');

const generateAccessToken = (userId) => {
  const payload = {
    userId,
    type: tokens.access.type,
  };
  const options = { expiresIn: tokens.access.expiresIn };

  return jwt.sign(payload, secret, options);
};

const generateRefreshToken = (userId) => {
  const payload = {
    userId,
    type: tokens.refresh.type,
  };
  const options = { expiresIn: tokens.refresh.expiresIn };

  return {
    id: payload.id,
    token: jwt.sign(payload, secret, options),
  };
};

const replaceDbRefreshToken = async (tokenId, userId) => {
  await TokenSchema.findOneAndRemove({ userId });

  await TokenSchema.create({ tokenId, userId });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  replaceDbRefreshToken,
};
