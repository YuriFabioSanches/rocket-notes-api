const authConfig = require("../config/auth");
const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError")

function ensureAthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new AppError("JWT token not provided.", 401)
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret)

    request.user = {
      id: Number(user_id),
    }

  }catch{
    throw new AppError("JWT token invalid.", 401)
  }

  next();
}

module.exports = ensureAthenticated;