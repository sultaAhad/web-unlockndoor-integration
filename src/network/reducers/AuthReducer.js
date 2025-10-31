import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userToken: "",
	user: null,
	videoCallData: { status: false, data: null },
	refreshNotifications: false,
	unread_messages_count: localStorage.getItem("unread_messages_count"),
	unread_notification_count: localStorage.getItem("unread_notification_count"),
};

const AuthReducer = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUserToken: (state, action) => {
			const { user, token, gender } = action.payload;

			state.userToken = token || "";

			if (user) {
				const updatedUser = {
					...user,
					gender,
					profile_image_url: user?.profile_image_url
						? `${user.profile_image_url}?t=${new Date().getTime()}`
						: null,
				};

				state.user = updatedUser;
				localStorage.setItem("user", JSON.stringify(updatedUser));
				if (token) localStorage.setItem("token", token);
				if (gender) localStorage.setItem("gender", gender);
			} else {
				state.user = null;
			}
		},

		setUser: (state, action) => {
			let user = action.payload;
			if (user?.profile_image_url) {
				user = {
					...user,
					profile_image_url: `${user.profile_image_url
						}?t=${new Date().getTime()}`,
				};
			}
			state.user = user;
			localStorage.setItem("user", JSON.stringify(user));
		},
		setCount: (state, action) => {
			const count = action.payload;
			state.unread_messages_count = count.unread_messages_count
			state.unread_notification_count = count.unread_notification_count
		},

		setLogoutUser: (state) => {
			state.userToken = "";
			state.user = null;
			state.videoCallData = { status: false, data: null };
			state.refreshNotifications = false;

			localStorage.removeItem("token");
			localStorage.removeItem("user");
			localStorage.removeItem("gender");
			localStorage.removeItem("selfieVerified");
			localStorage.removeItem("hasPackage");
		},

		handleVideoCallModal: (state, action) => {
			state.videoCallData = action.payload;
		},

		triggerNotificationRefresh: (state) => {
			state.refreshNotifications = !state.refreshNotifications;
		},

		// ✅ Global reset for Redux Persist
		resetStore: () => initialState,
	},
});

export const {
	setUserToken,
	setUser,
	setLogoutUser,
	handleVideoCallModal,
	triggerNotificationRefresh,
	resetStore,
	setCount
} = AuthReducer.actions;

export default AuthReducer.reducer;
