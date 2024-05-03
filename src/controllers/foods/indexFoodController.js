const knex = require("../../dataBase/knex")

async function indexFoodController(request, response) {
  const { name, tags } = request.query
  const user_id = request.user.id
  console.log("Indexing foods")

  if (tags) {
    const filterTags = tags.split(",").map((tag) => tag.trim())

    foods = await knex("tags")
      .select(["foods.id", "foods.name", "foods.user_id"])
      .where("foods.user_id", user_id)
      .whereLike("foods.name", `%${name}%`)
      .whereIn("name", filterTags)
      .innerJoin("foods", "foods.id", "tags.food_id")
      .orderBy("foods.name")
  } else {
    foods = await knex("foods")
      .where({ user_id })
      .whereLike("name", `%${name}%`)
      .orderBy("name")
  }

  const userTags = await knex("tags").where({ user_id })
  const foodsWithTags = foods.map((food) => {
    const foodTags = userTags.filter((tag) => tag.food_id === food.id)
    return {
      ...food,
      tags: foodTags,
    }
  })
  // Respond with the retrieved foods
  console.log("food Indexed")
  return response.status(200).json(foodsWithTags)
}

module.exports = indexFoodController
