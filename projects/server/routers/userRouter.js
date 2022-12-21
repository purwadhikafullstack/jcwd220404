const router = require("express").Router();

const { userController } = require("../controllers");

const { verifyToken, checkRole } = require("../middleware/user");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/keepLogin", userController.keepLogin);
router.post("/verification", verifyToken, userController.verification);
router.post("/changeotp", userController.changeOtp);
router.post("/forgotPassword", userController.sendEmailForgotPass);
router.post("/updatePass", verifyToken, userController.updatePassword)

module.exports = router;
