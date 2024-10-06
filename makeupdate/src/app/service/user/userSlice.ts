import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { IGetUserData, IUser } from "../../types/type";
import type { RootState } from "../store";

interface IUserState {
  user: IUser | null;
  isAuth: boolean;
  userData: IGetUserData | null;
}

const initialState: IUserState = {
  user: null,
  isAuth: localStorage.getItem("isAuth") === "true",
  userData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuth = true;
      localStorage.setItem("isAuth", "true");
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      localStorage.setItem("isAuth", "false");
      state.userData = null;
      localStorage.removeItem("userData"); // Очистка данных из localStorage
    },
    setUserData: (state, action: PayloadAction<IGetUserData>) => {
      state.userData = action.payload;
      localStorage.setItem(
        "userData",
        JSON.stringify(action.payload),
      ); // Сохраняем данные в localStorage
    },
  },
});

export const { login, logout, setUserData } = userSlice.actions;

export const selectCount = (state: RootState) => state.user;

export default userSlice.reducer;
