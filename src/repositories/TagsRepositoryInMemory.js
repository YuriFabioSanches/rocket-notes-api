class TagsRepositoryInMemory {
  tags = [{
    id: Math.floor(Math.random() * 1000) + 1,
    name: "React JS",
    note_id: 8,
    user_id: 1
  },
  {
    id: Math.floor(Math.random() * 1000) + 1,
    name: "Node JS",
    note_id: 7,
    user_id: 2
  },
  {
    id: Math.floor(Math.random() * 1000) + 1,
    name: "Express",
    note_id: 7,
    user_id: 2
  },
  {
    id: Math.floor(Math.random() * 1000) + 1,
    name: "Javascript",
    note_id: 8,
    user_id: 1
  },]

  async getAllTags(user_id) {
    return this.tags.filter(tag => tag.user_id === user_id)
  }
}

module.exports = TagsRepositoryInMemory