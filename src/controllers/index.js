const CreateUserController = require("./users/CreateUserController")
const UpdateUserController = require("./users/UpdateUserController")

const indexFoodController = require("./foods/indexFoodController")
const CreateFoodController = require("./foods/CreateFoodsController")
const UpdateFoodController = require("./foods/UpdateFoodsController")
const ShowFoodsController = require("./foods/ShowFoodsController")
const DeleteFoodsController = require("./foods/DeleteFoodsController")

const indexTagController = require("./tags/indexTagController")
const indexCategoriesController = require("./categories/indexCategoriesController")

const createSessionController = require("./sessions/createSessionController")

const UpdateAvatarController = require("./avatar/UpdateAvatarController")
const UpdateFoodImage = require("./foodImage/UpdateFoodImage")

class UserController {
  async create(request, response) {
    await CreateUserController(request, response)
  }
  async update(request, response) {
    await UpdateUserController(request, response)
  }
}

class AvatarController {
  async update(request, response) {
    await UpdateAvatarController(request, response)
  }
}
class FoodImageController {
  async update(request, response) {
    await UpdateFoodImage(request, response)
  }
}

class FoodsController {
  async index(request, response) {
    await indexFoodController(request, response)
  }
  async create(request, response) {
    await CreateFoodController(request, response)
  }
  async update(request, response) {
    await UpdateFoodController(request, response)
  }
  async show(request, response) {
    await ShowFoodsController(request, response)
  }
  async delete(request, response) {
    await DeleteFoodsController(request, response)
  }
}

class TagsController {
  async index(request, response) {
    await indexTagController(request, response)
  }
}

class CategoriesController {
  async index(request, response) {
    await indexCategoriesController(request, response)
  }
}

class SessionsController {
  async create(request, response) {
    await createSessionController(request, response)
  }
}

module.exports = {
  UserController,
  FoodsController,
  TagsController,
  CategoriesController,
  SessionsController,
  AvatarController,
  FoodImageController
}