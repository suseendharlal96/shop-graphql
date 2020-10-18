const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { AuthenticationError } = require("apollo-server");
dotenv.config();

module.exports = (context) => {
  let token;
  if (context.req && context.req.headers.authorization) {
    token = context.req.headers.authorization.split("Bearer ")[1];
  }
  if (token) {
    console.log(token);
    console.log();
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      context.loggedUser = decodedToken;
    });
  }
  return context;
};
