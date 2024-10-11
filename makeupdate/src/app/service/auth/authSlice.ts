import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { IInitialStateAuth } from "../../types/type";

const initialState: IInitialStateAuth = {
  email: "",
  telegram: "",
  password: "",
  confirmPassword: "",
  isLogin: true,
  isConfirmEmail: false,
  isChecked: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setTelegram: (state, action: PayloadAction<string>) => {
      state.telegram = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setIsConfirmEmail: (state, action: PayloadAction<boolean>) => {
      state.isConfirmEmail = action.payload;
    },
    setIsChecked: (state, action: PayloadAction<boolean>) => {
      state.isChecked = action.payload;
    },
  },
});

export const {
  setEmail,
  setTelegram,
  setPassword,
  setConfirmPassword,
  setIsLogin,
  setIsConfirmEmail,
  setIsChecked,
} = authSlice.actions;

// export const selectCount = (state: RootState) => state.user;

export default authSlice.reducer;
