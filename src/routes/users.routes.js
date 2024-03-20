const { Router } = require('express')
const usersRoutes = Router()
const UsersController = require("../controllers/UsersController")
const ensureAthenticated = require("../middlewares/ensureAthenticated")

const usersController = new UsersController()

usersRoutes.post("/", usersController.create)

usersRoutes.put("/", ensureAthenticated, usersController.update)

module.exports = usersRoutes