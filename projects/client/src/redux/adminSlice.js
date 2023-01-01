import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: "",
    email: "",
    password: "",
    isSuper: 0,
  },
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginAdmin: (state, action) => {
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
      state.value.isSuper = action.payload.isSuper;
    },
    logoutAdmin: (state, action) => {
      state.value.username = "";
      state.value.email = "";
      state.value.isSuper = 0;
    },
  },
});

export const { loginAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
