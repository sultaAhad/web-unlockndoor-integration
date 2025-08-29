// network/reducers/AuthReducer.js
import { createSlice } from "@reduxjs/toolkit";

const userData = localStorage.getItem("userData")
	? JSON.parse(localStorage.getItem("userData"))
	: null;

const initialState = {
	userToken: userData?.token || "",
	user: userData?.user || null,
};

const AuthReducer = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUserToken: (state, action) => {
			const { user, token, remember, gender } = action.payload;
			if (token) state.userToken = token;
			if (user) state.user = { ...user, gender };

			if (remember) {
				localStorage.setItem(
					"userData",
					JSON.stringify({
						token: token || state.userToken,
						user: { ...user, gender } || state.user,
					}),
				);
			}
		},
		setLogoutUser: (state) => {
			state.userToken = "";
			state.user = null;
			localStorage.removeItem("userData");
			console.log("🔴 User logged out");
		},
	},
});

export const { setUserToken, setLogoutUser } = AuthReducer.actions;
export default AuthReducer.reducer;
