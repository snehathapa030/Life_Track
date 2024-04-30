import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	todoDetail: null,
};

export const todoSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		addTodo: (state, action) => {
			state.todoDetail = action.payload;
		},
		deletetodo: (state) => {
			state.todoDetail = null;
		},
	},
});

export const { addTodo, deletetodo } = todoSlice.actions;

export default todoSlice.reducer;
