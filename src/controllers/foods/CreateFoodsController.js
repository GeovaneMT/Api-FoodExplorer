const knex = require("../../dataBase/knex")
const { AppError } = require("../../utils/AppError")

async function CreateFoodsController(request, response) {
  try {

    console.log("Creating food...")

    const { name, description, tags, categories, price, image } = request.body
    const user_id = request.user.id

    // Insert food
    const [food_id] = await knex("foods").insert({
      name,
      description,
      price,
      user_id,
    })

    // Insert categories
    if (categories && categories.length > 0) {
      const categoriesInsert = categories.map((category) => {
        return {
          food_id,
          category: category,
        }
      })
      await knex("categories").insert(categoriesInsert)
    }


    // Insert tags
    if (tags && tags.length > 0) {
      const tagsInsert = tags.map((name) => {
        return {
          food_id,
          name,
          user_id,
        }
      })
      await knex("tags").insert(tagsInsert)
    }

    console.log("food Created")

    return response.status(201).json({ message: "food created successfully" })
  } catch (error) {
    throw new AppError("Error creating food:", error)

    // Handle specific database-related errors
    if (error.code === "SQLITE_CONSTRAINT") {
      return response
        .status(400)
        .json({ error: "Duplicate entry or constraint violation." })
    }

    // Handle other generic errors
    return response.status(500).json({ error: "Internal Server Error" })
  }
}

module.exports = CreateFoodsController