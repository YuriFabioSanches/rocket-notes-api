const UserRepository = require("../repositories/UserRepository")
const UserService = require("../services/UserService")

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    const userRepository = new UserRepository()
    const userService = new UserService(userRepository)

    const ok = await userService.createUser({ name, email, password })
  
    return response.status(201).json(ok)
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body
    const user_id = request.user.id

    const userRepository = new UserRepository()
    const userService = new UserService(userRepository)

    const ok = await userService.updateUser({ user_id, name, email, password, old_password })
    
    return response.json(ok)
  }
}

module.exports = UsersController