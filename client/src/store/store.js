import { configureStore } from "@reduxjs/toolkit";
import navReducers from "./navSlice";

export const store = configureStore({
  reducer: {
    nav: navReducers
  },
});
