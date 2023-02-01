const router = require("express").Router();
const { transactionController } = require("../../controllers/index");
const { multerUpload } = require("../../middleware/multer");

router.post("/create/:id", transactionController.create);
router.post(
  "/single-uploaded/:id",
  multerUpload.single("file"),
  transactionController.uploadFile
);
router.patch("/setOrder/:id", transactionController.setProcess);
router.patch("/setDelivery/:id", transactionController.setDelivery)
router.patch("/setDone/:id", transactionController.setDone)
router.patch("/setCancelled/:id", transactionController.setCancelled)
router.get("/findById/:id", transactionController.findAllById);
router.get("/list/:id", transactionController.findById);
router.get("/listProduct/:id", transactionController.findProductById);
router.get("/listCancelled", transactionController.findCancelled);
router.get("/listWaitingPayment", transactionController.findWaitingPayment);
router.get("/listConfirmPayment", transactionController.findConfirmPayment);
router.get("/listOnProcess", transactionController.findOnProcess);
router.get("/listDelivery", transactionController.findDelivery);
router.get("/listDone", transactionController.findDone);

module.exports = router;
