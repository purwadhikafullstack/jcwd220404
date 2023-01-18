import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "product",
  value: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    syncProduct: (state, action) => {
      state.value = action.payload;
    },
   
  },
});

// Action creators are generated for each case reducer function
export const { syncProduct } = productSlice.actions;

export default productSlice.reducer;