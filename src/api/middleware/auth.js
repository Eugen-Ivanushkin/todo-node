const jwt = require('jsonwebtoken');

module.exports = {
  jwtVerify: (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.status(401).send({ message: 'Token not provided' });
    }
    try {
      jwt.verify(token, 'secret');
    } catch (err) {
      if (err instanceof jwt.JsonWebTokenError) {
        res.status(401).send({ message: 'Invalid token!' });
      }
    }
    next();
  },
};
