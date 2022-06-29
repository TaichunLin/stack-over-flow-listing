import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: ["javascript", "python", "java"],
};

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    addTags: (state, action) => {
      state.value.splice(0, state.value.length, action.payload);
    },
  },
});

export const { addTags } = tagsSlice.actions;

export default tagsSlice.reducer;
