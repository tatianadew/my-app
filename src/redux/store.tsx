import { configureStore } from "@reduxjs/toolkit";
import { Store } from "redux";
import authReducer from "./auth-slice";

const store:Store = configureStore({
  reducer: {
    authReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;