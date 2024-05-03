const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const { FoodsController } = require("../controllers")
const { FoodImageController } = require("../controllers")
const ensureAuth = require("../middleware/EnsureAuth")

const foodsRoutes = Router()
const foodsController = new FoodsController()

const foodImageController = new FoodImageController()
const upload = multer(uploadConfig.MULTER)


foodsRoutes.use(ensureAuth)

foodsRoutes.get("/", foodsController.index)
foodsRoutes.post("/", foodsController.create)
foodsRoutes.get("/:id", foodsController.show)
foodsRoutes.delete("/:id", foodsController.delete)

foodsRoutes.patch(
  "/image",
  ensureAuth,
  upload.single("image"),
  foodImageController.update
)

module.exports = foodsRoutes