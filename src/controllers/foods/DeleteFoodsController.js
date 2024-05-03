const knex = require("../../dataBase/knex")
const AppError = require("../../utils/AppError")

async function DeleteFoodsController(request, response) {
  try {
    console.log("Deleting food")

    const { id } = request.params

    const deleteCount = await knex("foods").where({ id }).delete()

    if (deleteCount === 0) {
      return response.status(404).json({ error: "food not found" })
    }

    console.log("food Deleted")
    return response.status(204).json() // 204 No Content for successful deletion
  } catch (error) {
    throw new AppError("Error deleting food:", error)

    // Handle other generic errors
    return response.status(500).json({ error: "Internal Server Error" })
  }
}

module.exports = DeleteFoodsController