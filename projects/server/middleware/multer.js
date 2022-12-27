const multer = require("multer");
const path = require("path");

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/upload"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

app.put(
  "/upload",
  multer({ storage: diskStorage }).single("photo"),
  (req, res) => {
    const file = req.file.path;
    if (!file) {
      res.status(400).send({
        status: false,
        data: "No file is selected",
      });
    }
    res.send(file);
  }
);