exports.up = async knex => {
  const exist = await knex.schema.hasTable("links")

  if(!exist){
    await knex.schema.createTable("links", table => {
      table.increments("id")
      table.text("url").notNullable()
      table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE")
      table.timestamp("created_at").default(knex.fn.now())
  })
} 
};

exports.down = async knex => await knex.schema.dropTableIfExists("links");