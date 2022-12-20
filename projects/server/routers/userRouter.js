const router = require("express").Router();

const { userController } = require("../controllers");

const { verifyToken, checkRole } = require("../middleware/user");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/updatePass", verifyToken, userController.updatePassword)
router.post("/verification", verifyToken, userController.verification);
router.post("/changeotp", userController.changeOtp);
router.post("/forgotPassword", userController.sendEmailForgotPass);
router.get("/keepLogin", userController.keepLogin);

module.exports = router;
