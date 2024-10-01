// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../store";
// import { IUser } from "@/type/type";

// // Define a type for the slice state
// interface IUserState {
//   user: IUser | null;
//   isAuth: boolean;
// }

// // Define the initial state using that type
// const initialState: IUserState = {
//   user: null,
//   isAuth: false,
// };

// export const userSlice = createSlice({
//   name: "user",
//   // `createSlice` will infer the state type from the `initialState` argument
//   initialState,
//   reducers: {
//     login: (state, action: PayloadAction<IUser>) => {
//       state.user = action.payload;
//       state.isAuth = true;
//     },
//     logout: (state) => {
//       state.isAuth = false;
//       state.user = null;
//     },
//   },
// });

// export const { login, logout } = userSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.user;

// export default userSlice.reducer;

import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/user.slice'

export const store = configureStore({
	reducer: {
		user: userReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
