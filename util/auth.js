const jwt = require("jsonwebtoken");

module.exports = (context) => {
  let token;
  if (context.req && context.req.headers.authorization) {
    token = context.req.headers.authorization.split("Bearer ")[1];
  }
  if (token) {
    jwt.verify(token, "SECRET_SHOP", (err, decodedToken) => {
      context.loggedUser = decodedToken;
    });
  }
  return context;
};
