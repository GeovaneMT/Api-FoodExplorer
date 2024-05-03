const knex = require("../../dataBase/knex")
const AppError = require("../../utils/AppError")

async function ShowFoodsController(request, response) {
  try {
    console.log("Showing foods")
    const { id } = request.params

    // Fetch food
    const food = await knex("foods").where({ id }).first()

    if (!food) {
      return response.status(404).json({ error: "food not found" })
    }

    // Fetch tags
    const tags = await knex("tags").where({ food_id: id }).orderBy("name")

    // Fetch categories
    const categories = await knex("categories")
      .where({ food_id: id })
      .orderBy("created_at")

    console.log("food Showed")
    return response.status(200).json({
      ...food,
      tags,
      categories,
    })
  } catch (error) {
    throw new AppError("Error fetching food:", error)

    // Handle other generic errors
    return response.status(500).json({ error: "Internal Server Error" })
  }
}

module.exports = ShowFoodsController