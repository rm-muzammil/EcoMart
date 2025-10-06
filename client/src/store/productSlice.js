import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  allCategory: [],
  SubCategory: [],
  product: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: initialValue,
  reducers: {
    setAllCategory: (state, action) => {
      state.allCategory = [...action.payload];
    },
    setSubCategory: (state, action) => {
      state.SubCategory = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { setAllCategory, setSubCategory, setProduct } =
  productSlice.actions;

export default productSlice.reducer;
