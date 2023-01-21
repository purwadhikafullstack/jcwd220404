const router = require("express").Router();
const { inventoryController } = require("../../controllers/index");
require("dotenv/config");

router.post("/create", inventoryController.create);
router.get("/findByBranch/:from/:to", inventoryController.findByBranch);
router.get("/pagProduct", inventoryController.paginationProduct);

module.exports = router;
