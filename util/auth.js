const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


module.exports = (context) => {
  let token;
  if (context.req && context.req.headers.authorization) {
    token = context.req.headers.authorization.split("Bearer ")[1];
  }
  if (token) {
    jwt.verify(token, procese.env.SECRET_KEY, (err, decodedToken) => {
      context.loggedUser = decodedToken;
    });
  }
  return context;
};
