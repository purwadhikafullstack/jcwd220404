const router = require("express").Router();
const { transactionController } = require("../../controllers/index");

router.post("/create", transactionController.create);
router.get("/findById/:id", transactionController.findAllById);
router.get("/list/:id", transactionController.findById)

module.exports = router;
