const { hash, compare } = require('bcryptjs')
const AppError = require("../utils/AppError")

class UserService {
  constructor(userRepository){
    this.userRepository = userRepository
  }

  async createUser({ name, email, password }){
    
    const checkUserExists = await this.userRepository.getUserByEmail(email)
    
    if(checkUserExists){
      throw new AppError('Esta e-mail já está em uso.')
    }

    const hashedPassword = await hash(password, 8)

    return await this.userRepository.createUser({name, email, password: hashedPassword})
  }

  async updateUser({ user_id, name, email, password, old_password }) {

    const user = await this.userRepository.getUserById(user_id)

    if(!user){
      throw new AppError("Usuário não encontrado")
    }

    const userWithUpdatedEmail = await this.userRepository.getUserByEmail(email)

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
      throw new AppError("Este e-mail já está em uso.")
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if(password && !old_password){
      throw new AppError('Informar a senha antiga para definir a nova senha.')
    }

    if(old_password && !password){
      throw new AppError('Informar a nova senha para ser atualizada.')
    }

    if(password && old_password){
      const checkOldPassword = await compare(old_password, user.password)

      if(!checkOldPassword) {
        throw new AppError('A senha antiga não confere, por favor informar senha correta.')
      }

      const newPassword = await hash(password, 8)
      user.password = newPassword
    }

    return await this.userRepository.updateUser(user, user_id)
  }
}

module.exports = UserService