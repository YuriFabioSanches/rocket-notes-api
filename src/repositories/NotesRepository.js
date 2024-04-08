const knex = require("../database/knex")

class NotesRepository {
  async getAllNotesFilteredByTitle(user_id, title){
    return await knex("notes")
    .where({ user_id: user_id })
    .whereLike('title', `%${title}%`)
    .orderBy("created_at")
  }

  async getNoteById(id) {
    return await knex("notes").where({ id }).first()
  }

  async deleteNoteById(id) {
    await knex("notes").where({ id }).delete()
  }

  async createNote(title, description, user_id) {
    const [note_id] = await knex("notes").insert({
      title,
      description,
      user_id
    })

    return note_id
  }
}

module.exports = NotesRepository