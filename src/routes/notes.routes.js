const { Router } = require('express')
const notesRoutes = Router()
const NotesController = require("../controllers/NotesController")
const ensureAthenticated = require("../middlewares/ensureAthenticated")

const notesController = new NotesController()

notesRoutes.use(ensureAthenticated)

notesRoutes.get("/", notesController.index)
notesRoutes.get("/:id", notesController.show)
notesRoutes.post("/", notesController.create)
notesRoutes.delete("/:id", notesController.delete)

module.exports = notesRoutes