const userRouter = require("./user/userRouter");
const adminRouter = require("./admin/adminRouter");
const addressRouter = require("./user/addressRouter");
const branchRouter = require("./admin/branchRouter");
const productRouter = require("./admin/productRouter");
const pictureRouter = require("./admin/pictureRouter");
const cartRouter = require("./user/cartRouter");

module.exports = {
  userRouter,
  adminRouter,
  addressRouter,
  branchRouter,
  productRouter,
  pictureRouter,
  cartRouter,
};
