import { configureStore } from "@reduxjs/toolkit";

import tagsReducer from "../features/stackoverflow/tagsSlice";
import searchingReducer from "../features/stackoverflow/searchingSlice";
export const store = configureStore({
  reducer: {
    tags: tagsReducer,
    searching: searchingReducer,

  },
});
