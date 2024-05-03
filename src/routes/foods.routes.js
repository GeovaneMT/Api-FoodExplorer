const { Router } = require("express")
const { FoodsController } = require("../controllers")
const ensureAuth = require("../middleware/EnsureAuth")

const foodsRoutes = Router()
const foodsController = new FoodsController()

foodsRoutes.use(ensureAuth)

foodsRoutes.get("/", foodsController.index)
foodsRoutes.post("/", foodsController.create)
foodsRoutes.get("/:id", foodsController.show)
foodsRoutes.delete("/:id", foodsController.delete)

module.exports = foodsRoutes