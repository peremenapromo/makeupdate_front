import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
  IInitialStateProfileCard,
  IInputData,
} from "../../types/type";

const initialState: IInitialStateProfileCard = {
  isEditing: false,
  isSaving: false,
  description: "",
};

export const profileCardSlice = createSlice({
  name: "profileCard",
  initialState,
  reducers: {
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },

    setIsSaving: (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setActiveButton: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
  },
});

export const {
  setIsEditing,
  setIsSaving,
  setDescription,
  setActiveButton,
} = profileCardSlice.actions;

// export const selectCount = (state: RootState) => state.user;

export default profileCardSlice.reducer;
