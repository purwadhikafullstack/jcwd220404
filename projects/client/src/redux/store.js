import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import adminSlice from "./adminSlice";
import nameSlice from "./nameSlice";
import addressSlice from "./addressSlice";
import productSlice from "./productSlice";
import categorySlice from "./categorySlice";

export default configureStore({
  reducer: {
    userSlice,
    adminSlice,
    nameSlice,
    addressSlice,
    productSlice,
    categorySlice
  },
});