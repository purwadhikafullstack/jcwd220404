const userRouter = require("./user/userRouter");
const adminRouter = require("./admin/adminRouter");
const addressRouter = require("./user/addressRouter");
const branchRouter = require("./admin/branchRouter");
const productRouter = require("./admin/productRouter");

module.exports = {
  userRouter,
  adminRouter,
  addressRouter,
  branchRouter,
  productRouter,
};
