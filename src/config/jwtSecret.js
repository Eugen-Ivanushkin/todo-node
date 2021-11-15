const secret = 'secret';
const tokens = {
  access: {
    type: 'access',
    expiresIn: '180m',
  },
  refresh: {
    type: 'refresh',
    expiresIn: '1000m',
  },
};

module.exports = {
  secret,
  tokens,
};
