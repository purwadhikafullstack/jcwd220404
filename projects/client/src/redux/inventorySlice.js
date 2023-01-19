import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "inventory",
  value: [],
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    syncData: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { syncData } = inventorySlice.actions;

export default inventorySlice.reducer;
