class TagsService {
  constructor(tagsRepository){
    this.tagsRepository = tagsRepository
  }

  async getAllTags(user_id){
    return await this.tagsRepository.getAllTags(user_id)
  }
}

module.exports = TagsService