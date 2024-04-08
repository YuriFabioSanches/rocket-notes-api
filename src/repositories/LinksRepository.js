const knex = require("../database/knex")

class LinksRepository {
  async getLinksByNoteId(note_id){
    return knex("links").where({ note_id }).orderBy("created_at")
  }

  async createLinks(linksInsert) {
    await knex("links").insert(linksInsert)
  }
}

module.exports = LinksRepository