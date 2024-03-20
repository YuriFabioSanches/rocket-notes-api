const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const authConfig = require("../config/auth");
const { sign } = require("jsonwebtoken")

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body

    const user = await knex("users").where({ email }).first();

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

    return response.status(201).json({ token })
  }
};

module.exports = SessionsController;