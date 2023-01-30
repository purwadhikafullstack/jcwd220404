const router = require("express").Router();
const { transactionController } = require("../../controllers/index");
const { multerUpload } = require("../../middleware/multer");

router.post("/create", transactionController.create);
router.post(
    "/single-uploaded/:TransactionId",
    multerUpload.single("file"),
    transactionController.uploadFile
  );
router.get("/findById/:id", transactionController.findAllById);
router.get("/list/:id", transactionController.findById)

module.exports = router;
