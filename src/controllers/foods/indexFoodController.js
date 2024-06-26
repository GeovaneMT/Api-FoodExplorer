const knex = require('../../dataBase/knex')

async function indexFoodController(request, response) {
  const { name, tags, categories } = request.query
  const user_id = request.user.id
  console.log('Indexing foods')

  const filters = { name }
  if (tags) filters.tags = tags.split(',').map((tag) => tag.trim())
  if (categories)
    filters.categories = categories
      .split(',')
      .map((category) => category.trim())

  const query = knex('foods')
    .where({ user_id })
    .where('name', 'like', `%${filters.name}%`) // Changed to "like" for case-insensitive search

  if (filters.tags) {
    query
      .innerJoin('tags', { 'foods.id': 'tags.food_id' })
      .whereIn('name', filters.tags)
  }
  if (filters.categories) {
    query
      .innerJoin('categories', { 'foods.id': 'categories.food_id' })
      .whereIn('name', filters.categories)
  }

  // Added price to the select
  const foods = await query
    .orderBy('name')
    .select([
      'foods.id',
      'foods.name',
      'foods.price',
      'foods.image',
      'foods.description',
      'foods.user_id',
    ])

  const userTags = await knex('tags').where({ user_id })
  const userCategories = await knex('categories').where({ user_id })
  const foodsWithTagsAndCategories = foods.map((food) => {
    const foodTags = userTags.filter((tag) => tag.food_id === food.id)
    const foodCategories = userCategories.filter(
      (category) => category.food_id === food.id
    )
    return {
      ...food,
      tags: foodTags,
      categories: foodCategories,
    }
  })
  // Respond with the retrieved foods
  console.log('Food Indexed')
  return response.status(200).json(foodsWithTagsAndCategories)
}

module.exports = indexFoodController
