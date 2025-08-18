import { createSlice } from "@reduxjs/toolkit";

// Get userData from localStorage when the app first loads
const userToken =
	window.localStorage.getItem("userData") &&
	JSON.parse(window.localStorage.getItem("userData"));

const AuthReducer = createSlice({
	name: "authReducer",
	initialState: {
		userToken: userToken ? userToken?.token : "",
		user: userToken ? userToken?.user : "",
	},
	reducers: {
		setUserToken: (state, action) => {
			console.log("setUserToken Payload:", action.payload); // 👈 LOG PAYLOAD

			// If token exists in the payload, set it in the state and localStorage
			if (action?.payload?.token) {
				state.userToken = action?.payload?.token;

				// Save token and user data together in localStorage
				const updatedData = {
					token: action.payload.token, // Set token
					user: state.user, // Preserve existing user data
				};
				localStorage.setItem("userData", JSON.stringify(updatedData));
			}

			// If user exists in the payload, set the user in the state and localStorage
			if (action?.payload?.user) {
				state.user = action?.payload?.user;

				// Save token and updated user data together in localStorage
				const updatedData = {
					token: state.userToken, // Preserve existing token
					user: action.payload.user, // Set user
				};
				localStorage.setItem("userData", JSON.stringify(updatedData));
			}
		},
		setlogoutUser: (state) => {
			state.userToken = "";
			state.user = "";
			state.discount = {};
			localStorage.removeItem("userData");
		},
	},
});

export const { setUserToken, setlogoutUser, setDiscount } = AuthReducer.actions;
export default AuthReducer.reducer;
