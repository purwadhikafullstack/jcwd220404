const router = require("express").Router();
const { transactionController } = require("../../controllers/index");

router.post("/create", transactionController.create);

module.exports = router;
