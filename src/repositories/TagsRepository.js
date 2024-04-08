const knex = require("../database/knex")

class TagsRepository {
  async getAllTagsByUserId(user_id) {

    const tags = await knex("tags").where({ user_id }).groupBy("name")

    return tags
  }

  async getAllNotesFilteredByTags(user_id, title, filterTags) {
    return await knex("tags")
    .select([
      "notes.id",
      "notes.title",
      "notes.user_id"
    ])
    .where("notes.user_id", user_id)
    .whereLike('notes.title', `%${title}%`)
    .whereIn("name", filterTags)
    .innerJoin("notes", "notes.id", "tags.note_id")
    .groupBy("notes.id")
    .orderBy("notes.created_at")
  }

  async getTagsByNoteId(note_id){
    return await knex("tags").where({ note_id }).orderBy("name")
  }

  async createTags(tagsInsert) {
    await knex("tags").insert(tagsInsert)
  }
}

module.exports = TagsRepository