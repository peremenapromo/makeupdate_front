import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
  ICounter,
  IFollowers,
  IGetUserData,
  IInitialStateProfileCard,
  IInputData,
  IProfileData,
} from "../../types/type";

const initialState: IInitialStateProfileCard = {
  isEditing: false,
  isSaving: false,
  description: "",
  profileData: null,
  subscribe: false,
  followers: null,
  following: null,
  counter: null,
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
    setSubscribe: (state, action: PayloadAction<boolean>) => {
      state.subscribe = action.payload;
    },
    setFollowers: (state, action: PayloadAction<IFollowers>) => {
      state.followers = action.payload;
    },
    setFollowing: (state, action: PayloadAction<IFollowers>) => {
      state.following = action.payload;
    },
    setCounter: (state, action: PayloadAction<ICounter[]>) => {
      state.counter = action.payload;
    },
    setProfileData: (state, action: PayloadAction<IProfileData>) => {
      state.profileData = action.payload;
      localStorage.setItem(
        "profileData",
        JSON.stringify(action.payload),
      ); // Сохраняем данные в localStorage
    },
  },
});

export const {
  setIsEditing,
  setIsSaving,
  setDescription,
  setActiveButton,
  setProfileData,
  setSubscribe,
  setFollowers,
  setFollowing,
  setCounter,
} = profileCardSlice.actions;

// export const selectCount = (state: RootState) => state.user;

export default profileCardSlice.reducer;
