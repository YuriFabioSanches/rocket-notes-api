const { Router } = require('express')
const tagsRoutes = Router()
const TagsController = require("../controllers/TagsController")
const ensureAthenticated = require("../middlewares/ensureAthenticated")


const tagsController = new TagsController()

tagsRoutes.get("/", ensureAthenticated, tagsController.index)

module.exports = tagsRoutes