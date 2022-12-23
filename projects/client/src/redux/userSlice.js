import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: "",
    phoneNumber: "",
    email: "",
    password: "",
    gender: "",
    birthDate: " ",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.value.id = action.payload.id;
      state.value.phoneNumber = action.payload.phoneNumber;
      state.value.email = action.payload.email;
      state.value.name = action.payload.name;
      state.value.gender = action.payload.gender;
      state.value.birthDate = action.payload.birthDate;
    },
    logoutUser: (state, action) => {
      state.value.phoneNumber = "";
      state.value.name = "";
    },
    updateUser: (state, action) => {
      state.value.email = action.payload.email;
      state.value.name = action.payload.name;
      state.value.gender = action.payload.gender;
      state.value.birthDate = action.payload.birthDate;
    },
  },
});

export const { loginUser, logoutUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
