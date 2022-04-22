import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type auththentication = {
  value: string
}

const initialState: auththentication = {
  value: ""
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    addToken(state: auththentication, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  }
});

export const { addToken } = authSlice.actions;
export const selectToken = (state: RootState) => state.authReducer.value;
export default authSlice.reducer;