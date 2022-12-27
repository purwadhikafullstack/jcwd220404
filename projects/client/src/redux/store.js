import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import adminSlice from "./admin/adminSlice";

export default configureStore({
  reducer: {
    userSlice,
    adminSlice,
  },
});