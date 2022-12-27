const router = require("express").Router();

const { adminController } = require("../controllers");


router.post("/register", adminController.registerAdmin);
router.post("/login", adminController.loginAdmin);
router.get("/keepLogin", adminController.keepLogin);
router.get("/admins",  adminController.findAllAdmin);

module.exports = router;