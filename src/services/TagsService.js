class TagsService {
  constructor(tagsRepository){
    this.tagsRepository = tagsRepository
  }

  async getAllTagsByUserId(user_id){
    return await this.tagsRepository.getAllTagsByUserId(user_id)
  }
}

module.exports = TagsService