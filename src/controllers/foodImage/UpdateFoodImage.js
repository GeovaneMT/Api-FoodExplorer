const { AppError } = require('../../utils/AppError')
const knex = require('../../dataBase/knex')
const DiskStorage = require('../../providers/DiskStorage')

async function UpdateImageController(request, response) {
  console.log('Image upload initiated...')

  const foodId = request.food.id
  const imageFilename = request.file.filename

  const diskStorage = new DiskStorage()

  try {
    // Fetching food from the database
    const food = await knex('foods').where({ id: foodId }).first()
    console.log('Trying to fetch food from the database...')

    // Handling case where user doesn't exist
    if (!food) {
      console.log('Error: food not found')
      throw new AppError('Error: food not found', 401)
    } else {
      console.log(
        `Food fetched: id: ${food.id}, name: ${food.name}`
      )
    }

    console.log('Fetching image...')

    // Handling case where avatar already exists
    if (food.image) {
      await diskStorage.deleteFile(food.image)
      console.log('Previous image deleted')
    } else {
      console.log('No previous image found')
    }

    const filename = await diskStorage.saveFile(imageFilename)
    food.image = filename
    console.log('pass1')

    // Update user avatar in the database
    await knex('foods').where({ id: foodId }).update(food)
    console.log('pass2')

    // Sending success response
    console.log('Image updated successfully.')
    response.json({
      message: 'Image updated successfully 2.',
      image: filename,
    })
  } catch (error) {
    console.error('Error while updating image:', error)
    response.status(error.statusCode || 500).json({ message: error.message })
  }
}

module.exports = UpdateImageController
