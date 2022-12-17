import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        id: 0,
        phoneNumber: "",
        email: "",
        profilePic: "",
        isVerified: false
    },
    };
    export const userSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        login: (state, action) => {
        state.value.id = action.payload.id;
        state.value.phoneNumber = action.payload.phoneNumber;
        state.value.email = action.payload.email;
        state.value.profilePic = action.payload.profilePic;
        state.value.isVerified = action.payload.isVerified;
        },
        logout: (state) => {
        state.value.id = 0;
        state.value.phoneNumber = "";
        state.value.email = "";
        state.value.profilePic = "";
        state.value.isVerified = "";

        },
    },
});

// Action creators are generated for each case reducer function
export const { login , logout} = userSlice.actions;

export default userSlice.reducer;