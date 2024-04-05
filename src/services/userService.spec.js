const UserService = require("./UserService")
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory")
const AppError = require("../utils/AppError")

describe("UserService", () => {
  let userRepositoryInMemory = null
  let userService = null

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    userService = new UserService(userRepositoryInMemory)
  })

  it("user should be created", async ()=> {
    const user = {
      name: "User test",
      email: "user@test.com",
      password: "123"
    }

    const userCreated = await userService.createUser(user)
    
    expect(userCreated).toHaveProperty("id")
  })

  it("user should not be created with duplicate email", async ()=> {
    const user1 = {
      name: "User1 test",
      email: "user@test.com",
      password: "123"
    }

    const user2 = {
      name: "User2 test",
      email: "user@test.com",
      password: "456"
    }

    await userService.createUser(user1)
    await expect(userService.createUser(user2)).rejects.toEqual(new AppError('Esta e-mail já está em uso.'))
  })
})