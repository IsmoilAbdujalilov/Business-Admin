import { storage } from "../../services";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { initialState, registerType } from "./initialState";

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    getToken: (state: registerType, action: PayloadAction<registerType>) => {
      storage.set("token", action.payload.token);
      storage.set("username", action.payload.username);
      return {
        ...state,
        token: storage.get("token"),
        username: storage.get("username"),
      };
    },
    clearToken: (state: registerType) => {
      storage.clear();
      return {
        ...state,
        token: null,
        username: null,
      };
    },
  },
});

export default registerSlice.reducer;
export const { clearToken, getToken } = registerSlice.actions;
