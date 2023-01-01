const router = require("express").Router();
const axios = require("axios");
const { addressController } = require("../controllers/index");
require("dotenv/config");

router.post("/create", addressController.newAddress);
router.get("/addressById", addressController.addressById);
router.patch("/updateAddress/:id", addressController.updateAddress);
router.patch("/setDefault/:id", addressController.setDefault);
router.delete("/remove/:id", addressController.deleteAddress);

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
