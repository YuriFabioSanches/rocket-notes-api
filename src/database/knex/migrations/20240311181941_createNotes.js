exports.up = async knex => {
  const exist = await knex.schema.hasTable("notes")

  if(!exist){
    knex.schema.createTable("notes", table => {
      table.increments("id")
      table.text("title")
      table.text("description")
      table.integer("user_id").references("id").inTable("users")
      table.timestamp("created_at").default(knex.fn.now())
      table.timestamp("updated_at").default(knex.fn.now())
    });
  }
} 

exports.down = async knex => await knex.schema.dropTableIfExists("notes");