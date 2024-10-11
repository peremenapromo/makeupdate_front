import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import authSlice from "./auth/authSlice";
import profileCardSlice from "./profileCard/profileCardSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authSlice,
    profileCard: profileCardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
