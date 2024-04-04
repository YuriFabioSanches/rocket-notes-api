exports.up = knex => knex.schema.createTableIfNotExists("tags", table => {
  table.increments("id")
  table.text("name").notNullable()

  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE")
  table.integer("user_id").references("id").inTable("users")
});

exports.down = knex => knex.schema.dropTableIfExists("tags");