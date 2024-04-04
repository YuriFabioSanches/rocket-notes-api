exports.up = knex => knex.schema.createTableIfNotExists("notes", table => {
  table.increments("id")
  table.text("title")
  table.text("description")
  table.integer("user_id").references("id").inTable("users")

  table.timestamp("created_at").default(knex.fn.now())
  table.timestamp("updated_at").default(knex.fn.now())

});

exports.down = knex => knex.schema.dropTableIfExists("notes");