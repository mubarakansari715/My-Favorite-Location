import { configureStore } from "@reduxjs/toolkit";
import MyAppSlice from "./MyAppSlice";

export const AppStore = configureStore({
  reducer: {
    allPlaces: MyAppSlice,
  },
});
