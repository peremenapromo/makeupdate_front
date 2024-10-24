import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IGetUsersProfiles,
  IInitialStateLessons,
  ILessonsState,
  IProfilePayload,
} from "app/types/type";

const initialState: IInitialStateLessons = {
  lessons: null,
  profiles: {},
  activeFilter: "popularity",
  userLesson: null,
  favouriteLessonsList: null,
  usersProfiles: null,
  isFavourite: null,
  blacklist: [],
};

export const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    setLessons: (state, action: PayloadAction<ILessonsState>) => {
      state.lessons = action.payload;
    },
    setUserLessons: (state, action: PayloadAction<ILessonsState>) => {
      state.userLesson = action.payload;
    },
    addLessonToBlacklist: (state, action: PayloadAction<number>) => {
      if (!state.blacklist.includes(action.payload)) {
        state.blacklist.push(action.payload); // Add lesson ID to blacklist
      }
    },
    setUsersProfiles: (
      state,
      action: PayloadAction<IGetUsersProfiles[]>,
    ) => {
      state.usersProfiles = action.payload;
    },
    setFavouriteLessonsList: (
      state,
      action: PayloadAction<ILessonsState>,
    ) => {
      console.log("Redux action payload:", action.payload);
      state.favouriteLessonsList = action.payload;
    },

    setProfile: (state, action) => {
      const { userId, profileData } = action.payload;
      state.profiles[userId] = profileData;
    },
    setIsFavourite: (
      state,
      action: PayloadAction<{ detail: string }>,
    ) => {
      state.isFavourite = action.payload;
    },
    setActiveFilter: (
      state,
      action: PayloadAction<"popularity" | "date">,
    ) => {
      state.activeFilter = action.payload;
    },
    setProfileDataLessons: (
      state,
      action: PayloadAction<IProfilePayload>,
    ) => {
      const { user_id, profile } = action.payload;
      state.profiles[user_id] = profile;
    },
  },
});

export const {
  setLessons,
  setProfile,
  setProfileDataLessons,
  setActiveFilter,
  setUserLessons,
  setUsersProfiles,
  setIsFavourite,
  setFavouriteLessonsList,
  addLessonToBlacklist,
} = lessonsSlice.actions;

export default lessonsSlice.reducer;
