const router = require("express").Router();
const { cartController } = require("../../controllers/index");

router.post("/create", cartController.createCart);
router.patch("/update/:id", cartController.updateQty);
router.patch("/cartUpdate/:id", cartController.cartStatus);
router.patch("/cost", cartController.createCost);
router.delete("/remove/:id", cartController.deleteCart);
router.get("/findBy/:id", cartController.findCartBy);
router.get("/findCheckout/:id", cartController.findCheckout);
router.get("/findData/:id", cartController.findData);

module.exports = router;
