import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import authSlice from "./auth/authSlice";
import profileCardSlice from "./profileCard/profileCardSlice";
import headerSlice from "./header/headerSlice";
import lessonsSlice from "./lessons/lessonsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authSlice,
    profileCard: profileCardSlice,
    header: headerSlice,
    lessons: lessonsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
