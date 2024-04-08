class NotesService {
  constructor(notesRepository, tagsRepository, linksRepository){
    this.notesRepository = notesRepository
    this.tagsRepository = tagsRepository
    this.linksRepository = linksRepository 
  }

  async getAllNotesFiltered({ user_id, title, tags }){
    let notes

    if(tags){
      const filterTags = tags.split(",").map(tag => tag.trim())

      notes = await this.tagsRepository.getAllNotesFilteredByTags(user_id, title, filterTags)
    }else {
      notes = await this.notesRepository.getAllNotesFilteredByTitle(user_id, title)
    }

    const userTags = await this.tagsRepository.getAllTagsByUserId(user_id)

    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id)

      return {
        ...note,
        tags: noteTags
      }
    })

    return notesWithTags
  }

  async getNoteById(id){

    const note = await this.notesRepository.getNoteById(id)

    const links = await this.linksRepository.getLinksByNoteId(id)
    
    const tags = await this.tagsRepository.getTagsByNoteId(id)

    return {
      ...note,
      tags,
      links
    }
  }

  async createNote({ user_id, title, description, tags, links }){

    const note_id = await this.notesRepository.createNote(title, description, user_id)

    if(links.length != 0) {
      const linksInsert = links.map(link => {
        return {
          note_id,
          url: link
        }
      })

      await this.linksRepository.createLinks(linksInsert)
    }

    if(tags.length != 0){
      const tagsInsert = tags.map(tag => {
        return {
          note_id,
          name: tag,
          user_id
        }
      })
  
      await this.tagsRepository.createTags(tagsInsert)
    }
  }

  async deleteNoteById(id){
    return await this.notesRepository.deleteNoteById(id)
  }
}

module.exports = NotesService