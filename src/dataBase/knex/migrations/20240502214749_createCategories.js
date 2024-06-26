exports.up = (knex) =>
  knex.schema.createTable("categories", (table) => {
    table.increments("id")
    table.text("CategoryName").notNullable()

    table
      .integer("food_id")
      .references("id")
      .inTable("foods")
      .onDelete("CASCADE")

    table
      .integer("user_id")
      .references("id")
      .inTable("users")
  })

exports.down = (knex) => knex.schema.dropTable("categories")