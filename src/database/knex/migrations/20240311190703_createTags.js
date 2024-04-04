exports.up = async knex =>{
  const exist = await knex.schema.hasTable("tags")

  if(!exist){
    knex.schema.createTable("tags", table => {
      table.increments("id")
      table.text("name").notNullable()
      table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE")
      table.integer("user_id").references("id").inTable("users")
    }) 
  }
};
  
exports.down = async knex => await knex.schema.dropTableIfExists("tags");