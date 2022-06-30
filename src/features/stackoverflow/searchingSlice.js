import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [""],
  refValue: [""],
  page: 1,
};

export const searchingSlice = createSlice({
  name: "searching",
  initialState,
  reducers: {
    addSearching: (state, action) => {
      state.value.splice(0, state.value.length, action.payload);
    },
    addPage: (state, action) => {
      state.page = action.payload;
    },
    addSearchingRefValue: (state, action) => {
      state.refValue.splice(0, state.refValue.length, action.payload);
    },
  },
});

export const { addSearching, addPage, addSearchingRefValue } =
  searchingSlice.actions;

export default searchingSlice.reducer;
