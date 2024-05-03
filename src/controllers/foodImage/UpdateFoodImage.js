const AppError = require("../../utils/AppError")
const knex = require("../../dataBase/knex")
const DiskStorage = require("../../providers/DiskStorage")

async function UpdateFoodImage(request, response) {
  console.log("Image upload initiated...")

  const { id } = request.params;
  const user_id = request.user.id;
  constimageFilename = request.file.filename

  const diskStorage = new DiskStorage()

  try {
    // Fetching food from the database
    const food = await knex("foods").where({ id, user_id }).first()
    console.log("Trying to fetch food from the database...")
    console.log("Fetching image...")

    // Handling case where image already exists
    if (food.image) {
      await diskStorage.deleteFile(food.image)
      console.log("Previous image deleted")
    } else {
      console.log("No previous image found")
    }

    const filename = await diskStorage.saveFile(imageFilename)
    food.image = filename
      console.log("pass1")

    // Update user image in the database
    await knex("foods").where({ id: user_id }).update(food)
      console.log("pass2")

    // Sending success response
    console.log("image updated successfully.")
    response.json({
      message: "image updated successfully 2.",
      image: filename,
    })
  } catch (error) {
    console.error("Error while updating image:", error)
    response.status(error.statusCode || 500).json({ message: error.message })
  }
}

module.exports = UpdateFoodImage
