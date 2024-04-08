const knex = require("../database/knex")
const NotesService = require("../services/NotesService")

const NotesRepository = require("../repositories/NotesRepository")
const TagsRepository = require("../repositories/TagsRepository")
const LinksRepository = require("../repositories/LinksRepository")

class NotesController {
  async index(request, response) {
    const { title, tags  } = request.query
    const user_id = request.user.id

    const notesRepository = new NotesRepository()
    const tagsRepository = new TagsRepository()

    const notesService = new NotesService(notesRepository, tagsRepository)

    const notes = await notesService.getAllNotesFiltered({ user_id, title, tags })
    
    return response.json(notes)
  }

  async show(request, response) {
    const { id } = request.params

    const notesRepository = new NotesRepository()
    const tagsRepository = new TagsRepository()
    const linksRepository = new LinksRepository()

    const notesService = new NotesService(notesRepository, tagsRepository, linksRepository)

    const note = await notesService.getNoteById(id)

    return response.json(note)
  }

  async create(request, response) {
    const { title, description, tags, links } = request.body
    const user_id = request.user.id

    const notesRepository = new NotesRepository()
    const tagsRepository = new TagsRepository()
    const linksRepository = new LinksRepository()

    const notesService = new NotesService(notesRepository, tagsRepository, linksRepository)


    await notesService.createNote({ user_id, title, description, tags, links })

    return response.status(201).json()
  }

  async delete(request, response) {
    const { id } = request.params

    const notesRepository = new NotesRepository()
    const notesService = new NotesService(notesRepository)

    await notesService.deleteNoteById(id)

    return response.json()
  }
}

module.exports = NotesController