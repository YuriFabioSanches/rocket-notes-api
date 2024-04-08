const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")


class UserAvatarService {
  constructor(userRepository){
    this.userRepository = userRepository
  }

  async updateUserAvatar(user_id, avatarFilename) {

    const diskStorage = new DiskStorage()

    const user = await this.userRepository.getUserById(user_id)

    if(!user) {
      throw new AppError("Just authenticated users can change avatar image.", 401)
    }

    if(user.avatar){
      await diskStorage.deleteFile(user.avatar)
    }

    const filename = await diskStorage.saveFile(avatarFilename)
    user.avatar = filename

    const userAvatar = await this.userRepository.updateUserAvatar(user, user_id)

    return userAvatar
  }
}

module.exports = UserAvatarService