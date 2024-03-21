const { Router, static } = require('express')
const routes = Router()
const usersRoutes = require('./users.routes')
const notesRoutes = require('./notes.routes')
const tagsRoutes = require('./tags.routes')
const sessionsRoutes = require('./sessions.routes')
const { UPLOADS_FOLDER } = require('../config/upload')

routes.use("/files", static(UPLOADS_FOLDER))
routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)
routes.use("/notes", notesRoutes)
routes.use("/tags", tagsRoutes)

module.exports = routes