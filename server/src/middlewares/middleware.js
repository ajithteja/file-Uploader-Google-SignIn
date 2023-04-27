const { getUserToken } = require('../jwt/jwt');

module.exports.authMiddleWare = (request, response, next) => {
  const token = request.headers.authorization;

  const paylad = getUserToken(token);
  if (!paylad) {
    return response.json({
      message: 'Please Login',
    });
  }

  // console.log(paylad);
  request.user = paylad;
  next();
};
