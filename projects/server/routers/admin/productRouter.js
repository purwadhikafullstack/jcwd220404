const router = require("express").Router();
const axios = require("axios");
const { productController } = require("../../controllers/index");
const { multerUpload } = require("../../middleware/multer");
require("dotenv/config");

router.post("/create", productController.create);
router.post("/createCategory", productController.createCategory);
router.post("/createPrice", productController.createPrice);
router.post("/createMulti", productController.createMultiCategory);
router.post(
  "/single-uploaded/:id",
  multerUpload.single("file"),
  productController.uploadFile
);
router.post(
  "/single-uploaded-category/:id",
  multerUpload.single("file"),
  productController.uploadCategory
);
router.patch("/update/:id", productController.update);
router.patch("/updateCategory/:id", productController.updateCategory);
router.get("/list", productController.findAll);
router.get("/listCategory", productController.findAllCategory);
router.get("/list/:id", productController.findByProductId);
router.get("/pagProduct", productController.paginationProduct);
router.get("/pagCategory", productController.paginationCategory);
router.get("/list/total", productController.totalProduct);
router.get("/search", productController.searchBy);
router.get("/sort", productController.sortBy);
router.delete("/remove/:id", productController.remove);
router.delete("/removeCategory/:id", productController.removeCategory);

module.exports = router;
