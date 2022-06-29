import { createSlice } from "@reduxjs/toolkit";

// interface Customer {
//   id: string;
//   name: string;
//   food: string[];
// }

// interface AddFoodToCustomerPayload {
//   food: string;
//   id: string;
// }

// export interface CustomerState {
//   value: Customer[];
// }

// const initialState: CustomerState = {
//   value: [],
// };

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
