const router = require("express").Router();
const axios = require("axios");
const { branchController } = require("../../controllers/index");
require("dotenv/config");

router.post("/create", branchController.newBranch);
router.get("/branchById", branchController.branchById);
router.get("/findAll", branchController.findAll);
router.patch("/updateBranch/:id", branchController.updateBranch);
router.patch("/setDefault/:id", branchController.setDefault);
router.delete("/remove/:id", branchController.deleteBranch);

axios.defaults.baseURL = process.env.BASE_URL_RAJAONGKIR;
axios.defaults.headers.common["key"] = process.env.RAJA_KEY;
axios.defaults.headers.post["Content-Type"] = process.env.AXIOS_HEADERS;
router.get("/province", (req, res) => {
  axios
    .get("/province")
    .then((response) => res.json(response.data))
    .catch((err) => res.send(err));
});
router.get("/city/:provinceId", (req, res) => {
  const id = req.params.provinceId;
  axios
    .get(`/city?province=${id}`)
    .then((response) => res.json(response.data))
    .catch((err) => res.send(err));
});

module.exports = router;
