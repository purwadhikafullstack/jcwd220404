const userController = require("./user/userController");
const adminController = require("./admin/adminController");
const addressController = require("./user/addressController");
const branchController = require("./admin/branchController");
const productController = require("./admin/productController")

module.exports = {
  userController,
  adminController,
  addressController,
  branchController,
  productController
};
