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
router.get("/listCancelled/:BranchId", transactionController.findCancelled);
router.get("/listWaitingPayment/:BranchId", transactionController.findWaitingPayment);
router.get("/listConfirmPayment/:BranchId", transactionController.findConfirmPayment);
router.get("/listOnProcess/:BranchId", transactionController.findOnProcess);
router.get("/listDelivery/:BranchId", transactionController.findDelivery);
router.get("/listDone/:AdminId", transactionController.findDone);
router.get("/salesDepok", transactionController.findSalesDepok);
router.get("/salesJaksel", transactionController.findSalesJaksel);
router.get("/salesJaktim", transactionController.findSalesJaktim);

module.exports = router;
