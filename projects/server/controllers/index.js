const userController = require("./user/userController");
const adminController = require("./admin/adminController");
const addressController = require("./user/addressController");
const branchController = require("./admin/branchController");
const productController = require("./admin/productController");
const pictureController = require("./admin/pictureController");
const cartController = require("./user/cartController");
const addCheckoutController = require("./user/addCheckoutController");

module.exports = {
  userController,
  adminController,
  addressController,
  branchController,
  productController,
  pictureController,
  cartController,
  addCheckoutController,
};
