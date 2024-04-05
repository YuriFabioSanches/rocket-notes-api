const sqliteConnection = require('../database/sqlite')

class UserRepository {
  async getUserById(user_id) {
    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])

    return user
  }

  async getUserByEmail(email) {
    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    return user
  }

  async createUser({ name, email, password }) {
    const database = await sqliteConnection()
    const userId = await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [ name, email, password ])

    return { email, id: userId.lastID }
  }

  async updateUser(user, user_id){
    const database = await sqliteConnection()
    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    )

    return {id: user.id}
  }
}

module.exports = UserRepository