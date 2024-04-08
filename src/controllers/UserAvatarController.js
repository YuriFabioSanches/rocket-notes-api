const UserRepository = require("../repositories/UserRepository")
const UserAvatarService = require("../services/UserAvatarService")

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFilename = request.file.filename;

    const userRepository = new UserRepository()
    const userAvatarService = new UserAvatarService(userRepository)

    const userAvatar = await userAvatarService.updateUserAvatar(user_id, avatarFilename)

    return response.status(200).json(userAvatar)
  }
};

module.exports = UserAvatarController;