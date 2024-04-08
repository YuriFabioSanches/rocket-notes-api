const TagsService = require("./TagsService")
const TagsRepositoryInMemory = require("../repositories/TagsRepositoryInMemory")
const AppError = require("../utils/AppError")

describe("SessionsService", () => {
  let tagsRepositoryInMemory = null
  let tagsService = null

  beforeEach(() => {
    tagsRepositoryInMemory = new TagsRepositoryInMemory()
    tagsService = new TagsService(tagsRepositoryInMemory)
  })

  it("tags should be get", async ()=> {

    const user_id = 1

    const tags = await tagsService.getAllTags(user_id)

    console.log(tags)
        
    expect(tags)
  })
})