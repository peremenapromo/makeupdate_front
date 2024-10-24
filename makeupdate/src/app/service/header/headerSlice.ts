import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { IHeaderState } from "../../types/type";
import type { RootState } from "../store";

const initialState: IHeaderState = {
  activeLink: null,
  language: "ru",
  isModalOpen: false,
  isArrowUp: false,
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setActiveLink: (state, action: PayloadAction<string>) => {
      state.activeLink = action.payload;
    },
    setLanguage: (state, action: PayloadAction<"ru" | "en">) => {
      state.language = action.payload;
    },

    setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    setIsArrowUp: (state, action: PayloadAction<boolean>) => {
      state.isArrowUp = action.payload;
    },
  },
});

export const {
  setActiveLink,
  setLanguage,
  setIsModalOpen,
  setIsArrowUp,
} = headerSlice.actions;

export const selectCount = (state: RootState) => state.header;

export default headerSlice.reducer;
