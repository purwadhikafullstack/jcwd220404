const router = require("express").Router();
const { promoController } = require("../../controllers/index");

router.post("/create", promoController.createDiscount);

module.exports = router;
