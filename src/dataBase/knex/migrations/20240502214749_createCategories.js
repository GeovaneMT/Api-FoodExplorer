exports.up = (knex) =>
  knex.schema.createTable("categories", (table) => {
    table.increments("id")
    table.text("categoryName").notNullable()
    
    table
      .integer("food_id")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE")
    
    table
      .timestamp("created_at")
      .default(knex.fn.now())
    
  })
  
  exports.down = (knex) => knex.schema.dropTable("categories")