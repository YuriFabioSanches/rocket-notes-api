const TagsRepository = require("../repositories/TagsRepository")
const TagsService = require("../services/TagsService")

class TagsController {
  async index(request, response) {
    const user_id = request.user.id

    const tagsRepository = new TagsRepository()
    const tagsService = new TagsService(tagsRepository)

    const tags = await tagsService.getAllTagsByUserId(user_id)
    
    return response.json(tags)
  }
}

module.exports = TagsController