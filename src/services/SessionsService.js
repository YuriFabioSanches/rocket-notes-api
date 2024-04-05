const AppError = require("../utils/AppError");
const authConfig = require("../config/auth");
const { sign } = require("jsonwebtoken");
const { compare } = require("bcryptjs");

class SessionsService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async createSession({ email, password }){
    const user = await this.userRepository.getUserByEmail(email)

    if(!user) {
      throw new AppError("Invalid email/password.", 401)
    }

    const checkPassword = await compare(password, user.password)

    if(!checkPassword){
      throw new AppError("Invalid email/password.", 401)
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return { user, token }
  }
}

module.exports = SessionsService