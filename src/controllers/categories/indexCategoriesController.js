const knex = require("../../dataBase/knex")

async function indexCategoryController(request, response) {
  console.log("Indexing Categories")

  const user_id = request.user.id
  const categories = await knex("categories")
    .where({ user_id })
    .groupBy("categoryName")

  console.log("Categories Indexed")
  return response.status(200).json(categories)
}

module.exports = indexCategoryController