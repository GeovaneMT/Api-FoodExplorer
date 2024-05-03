const knex = require("../../dataBase/knex");
const AppError = require("../../utils/AppError");

async function UpdateFoodController(request, response) {
  try {
    console.log("Updating food...");

    const user_id = request.user.id; 
    const { id } = request.params;
    const {name, description, tags, categories, image } = request.body;

    // Update food
    await knex("foods").where({ id, user_id }).update({
      name,
      description,
    });

    // Delete existing tags and insert new ones
    await knex("tags").where({ food_id: id }).del();
    if (tags && tags.length > 0) {
      const tagsInsert = tags.map((name) => {
        return {
          food_id: id,
          name,
          user_id,
        };
      });
      await knex("tags").insert(tagsInsert);
    }

    // Delete existing categories and insert new ones
    await knex("categories").where({ food_id: id }).del();
    if (categories && categories.length > 0) {
      const categoriesInsert = categories.map((categories) => {
        return {
          food_id: id,
          url: categories,
        };
      });
      await knex("categories").insert(categoriesInsert);
    }

    console.log("food Updated");

    return response.status(200).json({ message: "food updated successfully" });
  } catch (error) {
    throw new AppError("Error updating food:", error);

    // Handle specific database-related errors
    if (error.code === "SQLITE_CONSTRAINT") {
      return response
        .status(400)
        .json({ error: "Duplicate entry or constraint violation." });
    }

    // Handle other generic errors
    return response.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = UpdateFoodController;
