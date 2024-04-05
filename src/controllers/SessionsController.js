const SessionsService = require("../services/SessionsService")
const UserRepository = require("../repositories/UserRepository")

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body

    const userRepository = new UserRepository()
    const sessionsService = new SessionsService(userRepository)

    const ok = await sessionsService.createSession({ email, password })

    return response.status(201).json(ok)
  }
};

module.exports = SessionsController;