const router = require("express").Router();

const { userController } = require("../controllers");

const { verifyToken, checkRole } = require("../middleware/user");


router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/", userController.findAllUser);
router.post("/updatePass", verifyToken, userController.updatePassword)
router.get("/keepLogin", userController.keepLogin)
router.post("/verification", verifyToken, userController.verification);
router.post("/forgotpassword", userController.sendEmailForgotPass);
router.post("/changeotp", userController.changeOtp);


module.exports = router;