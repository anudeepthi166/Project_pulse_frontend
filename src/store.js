import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../src/slice/loginSlice";

//create store
export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});
