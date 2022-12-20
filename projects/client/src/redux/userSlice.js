import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    phoneNumber: "",
    name: "",
    email: "",
    password: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.value.phoneNumber = action.payload.phoneNumber;
      state.value.email = action.payload.email;
      state.value.name = action.payload.name;
    },
    logoutUser: (state, action) => {
      state.value.phoneNumber = "";
      state.value.name = "";
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
