const jwt = require('jsonwebtoken');

const SECRET_KEY = 'My_SecretKey';

const createUserToken = (paylad = {}) => {
  return jwt.sign(paylad, SECRET_KEY);
};

const getUserToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};

module.exports = {
  createUserToken,
  getUserToken,
};
