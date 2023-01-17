const router = require("express").Router();
const { cartController } = require("../../controllers/index");

router.post("/create", cartController.createCart);
router.patch("/update/:id", cartController.updateQty);
router.delete("/remove/:id", cartController.deleteCart);
router.get("/findBy/:id", cartController.findCartBy);

module.exports = router;
