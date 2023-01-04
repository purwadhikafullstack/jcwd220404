const router = require("express").Router();
const axios = require("axios");
const { productController } = require("../controllers/index");
require("dotenv/config");

router.post(
  "/create",
  // multerUpload.single("file"),
  productController.create
);
router.post("/createCategory", productController.createCategory);
router.patch("/update/:id", productController.update);
router.get("/list", productController.getAll);
router.get("/listCategory", productController.getAllCategory);
router.get("/list/filter", productController.getBy);
router.get("/list/total", productController.totalBooks);
router.get("/search", productController.searchBy);
router.get("/view2", productController.view2);
router.get("/sort", productController.sortBy);
router.get("/list/:id", productController.getById);
router.delete("/remove/:id", productController.remove);
// router.post("/uploaded", multerUpload.single("file"), book.uploadFile);

module.exports = router;