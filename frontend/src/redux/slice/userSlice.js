import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userDetail: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		addUser: (state, action) => {
			state.userDetail = action.payload;
		},
		removeUser: (state) => {
			state.userDetail = null;
		},
	},
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
