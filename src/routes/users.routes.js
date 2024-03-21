const { Router } = require('express')
const usersRoutes = Router()

const UsersController = require("../controllers/UsersController")
const usersController = new UsersController()

const UserAvatarController = require("../controllers/UserAvatarController")
const userAvatarController = new UserAvatarController()

const ensureAthenticated = require("../middlewares/ensureAthenticated")

const multer = require("multer")
const uploadConfig = require("../config/upload")
const upload = multer(uploadConfig.MULTER)


usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAthenticated, usersController.update)
usersRoutes.patch("/avatar", ensureAthenticated, upload.single("avatar"), userAvatarController.update)

module.exports = usersRoutes