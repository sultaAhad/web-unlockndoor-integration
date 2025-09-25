import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userToken: "",
	user: null,
	videoCallData: { status: false, data: null },
};

const AuthReducer = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUserToken: (state, action) => {
			const { user, token, gender } = action.payload;

			// ✅ Always overwrite
			state.userToken = token || "";
			state.user = user ? { ...user, gender } : null;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setLogoutUser: (state) => {
			state.userToken = "";
			state.user = null;
			state.videoCallData = { status: false, data: null };

			// ✅ Clear localStorage on logout
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			localStorage.removeItem("gender");
			localStorage.removeItem("selfieVerified");
			localStorage.removeItem("hasPackage");
		},
		handleVideoCallModal: (state, action) => {
			state.videoCallData = action.payload;
		},
	},
});

export const { setUserToken, setUser, setLogoutUser, handleVideoCallModal } =
	AuthReducer.actions;
export default AuthReducer.reducer;
