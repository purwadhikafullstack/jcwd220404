const router = require("express").Router();
const { transactionController } = require("../../controllers/index");

router.post("/create", transactionController.create);
router.get("/findById/:id", transactionController.findAllById);
router.get("/list/:id", transactionController.findById)
router.get("/listWaitingPayment", transactionController.findWaitingPayment)
router.get("/listConfirmPayment", transactionController.findConfirmPayment)
router.get("/listOnProcess", transactionController.findOnProcess)
router.get("/listDelivery", transactionController.findDelivery)
router.get("/listDone", transactionController.findDone)

module.exports = router;