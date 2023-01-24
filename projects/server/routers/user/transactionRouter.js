const router = require("express").Router();
const { transactionController } = require("../../controllers/index");

router.post("/create", transactionController.create);
router.get("/findById/:id", transactionController.findAllById);

module.exports = router;
