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
		setLogoutUser: (state) => {
			state.userToken = "";
			state.user = null;
			console.log("🔴 User logged out");
		},
	},
});

export const { setUserToken, setLogoutUser } = AuthReducer.actions;
export default AuthReducer.reducer;
