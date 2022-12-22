const router = require("express").Router();

const { userController } = require("../controllers");

const { verifyToken, checkRole } = require("../middleware/user");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/verification", verifyToken, userController.verification);
router.post("/changeotp", userController.changeOtp);
router.post("/forgotPassword", userController.sendEmailForgotPass);
router.post("/updatePass", verifyToken, userController.updatePassword);
router.patch("/update/:id", userController.update);
router.patch("/updatePassword/:id", userController.updatePass);
router.patch("/updateName/:id", userController.updateName);
router.patch("/updateEmail/:id", userController.updateEmail);
router.get("/getAll", userController.getAll);
router.get("/getById/:id", userController.getById);
router.get("/keepLogin", userController.keepLogin);

module.exports = router;
