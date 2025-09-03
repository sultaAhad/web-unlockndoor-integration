import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userToken: "",
	user: null,
};

const AuthReducer = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUserToken: (state, action) => {
			const { user, token, gender } = action.payload;
			if (token) state.userToken = token;
			if (user) state.user = { ...user, gender };
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setLogoutUser: (state) => {
			state.userToken = "";
			state.user = null;
		},
	},
});

export const { setUserToken, setUser, setLogoutUser } = AuthReducer.actions;
export default AuthReducer.reducer;
