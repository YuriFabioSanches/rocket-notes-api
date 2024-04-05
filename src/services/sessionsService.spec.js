const SessionsService = require("./SessionsService")
const UserService = require("./UserService")
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory")
const AppError = require("../utils/AppError")

describe("SessionsService", () => {
  let userRepositoryInMemory = null
  let sessionsService = null
  let userService = null

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    sessionsService = new SessionsService(userRepositoryInMemory)
    userService = new UserService(userRepositoryInMemory)
  })

  it("sessions should be created", async ()=> {
    const user = {
      name: "User test",
      email: "user@test.com",
      password: "123"
    }

    const signIn = {
      email: "user@test.com",
      password: "123"
    }

    await userService.createUser(user)

    const sessionCreated = await sessionsService.createSession(signIn)
        
    expect(sessionCreated).toHaveProperty("token")
  })

  it("session should not be created with wrong email", async ()=> {
    const user = {
      name: "User test",
      email: "user@test.com",
      password: "123"
    }

    const signIn = {
      email: "users@test.com",
      password: "123"
    }

    await userService.createUser(user)

    await expect(sessionsService.createSession(signIn)).rejects.toEqual(new AppError("Invalid email/password.", 401))
  })

  it("session should not be created with wrong password", async ()=> {
    const user = {
      name: "User test",
      email: "user@test.com",
      password: "123"
    }

    const signIn = {
      email: "user@test.com",
      password: "1234"
    }

    await userService.createUser(user)

    await expect(sessionsService.createSession(signIn)).rejects.toEqual(new AppError("Invalid email/password.", 401))
  })
})