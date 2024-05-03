const { Router } = require("express")
const { CategoriesController } = require("../controllers")
const ensureAuth = require("../middleware/EnsureAuth")

const categoriesRoutes = Router()
const categoriesController = new CategoriesController()

categoriesRoutes.get("/",ensureAuth, categoriesController.index)

module.exports = categoriesRoutes