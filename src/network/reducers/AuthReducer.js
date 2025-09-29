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

			state.userToken = token || "";

			if (user) {
				// ✅ Force cache-busting for profile image
				const updatedUser = {
					...user,
					gender,
					profile_image_url: user?.profile_image_url
						? user.profile_image_url + "?t=" + new Date().getTime()
						: null,
				};

				state.user = updatedUser;
				localStorage.setItem("user", JSON.stringify(updatedUser));
			} else {
				state.user = null;
			}
		},
		setUser: (state, action) => {
			let user = action.payload;

			// ✅ Always force cache-busting if profile_image_url exists
			if (user?.profile_image_url) {
				user = {
					...user,
					profile_image_url:
						user.profile_image_url + "?t=" + new Date().getTime(),
				};
			}

			state.user = user;
			localStorage.setItem("user", JSON.stringify(user));
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
