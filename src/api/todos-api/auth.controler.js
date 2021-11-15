const mongoose = require('mongoose');
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../../config/jwtSecret');

const User = require('../../models/user');

const authHelper = require('../../../utils/authHelper');

const updateTokens = (userId) => {
  const accessToken = authHelper.generateAccessToken(userId);
  const refreshToken = authHelper.generateRefreshToken(userId);

  return authHelper
    .replaceDbRefreshToken(refreshToken._id, userId) //id
    .then(() => ({
      accessToken,
      refreshToken: refreshToken,
    }));
};

module.exports = {
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        res.status(401).send({ message: 'User does not exist' });
      }

      const isValid = bCrypt.compareSync(password, user.password);
      if (isValid) {
        updateTokens(user._id).then((tokens) =>
          res.status(200).send({ message: 'Success', tokens })
        );
      } else {
        res.status(403).send({ message: 'Invalid credentials!' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
  },
  signUp: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (user) {
        res.status(401).send({ message: 'User already exist' });
      }

      if (!user) {
        const hash = bCrypt.hashSync(password, 1);

        const newUser = new User({
          email: email,
          password: hash,
        });
        await newUser.save();
      }

      res.status(201).send({ message: 'Success, user added' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
  },
  updateTokens: async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];
      const parseToken = jwt.verify(token, 'secret');

      updateTokens(parseToken.userId).then((tokens) => {
        res.status(200).send({ message: 'Success', tokens });
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
  },
};
