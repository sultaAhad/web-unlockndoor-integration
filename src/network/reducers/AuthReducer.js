// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
// 	userToken: "",
// 	user: null,
// 	videoCallData: { status: false, data: null },
// };

// const AuthReducer = createSlice({
// 	name: "auth",
// 	initialState,
// 	reducers: {
// 		setUserToken: (state, action) => {
// 			const { user, token, gender } = action.payload;

// 			state.userToken = token || "";

// 			if (user) {
// 				// ✅ Force cache-busting for profile image
// 				const updatedUser = {
// 					...user,
// 					gender,
// 					profile_image_url: user?.profile_image_url
// 						? user.profile_image_url + "?t=" + new Date().getTime()
// 						: null,
// 				};

// 				state.user = updatedUser;
// 				localStorage.setItem("user", JSON.stringify(updatedUser));
// 			} else {
// 				state.user = null;
// 			}
// 		},
// 		setUser: (state, action) => {
// 			let user = action.payload;

// 			// ✅ Always force cache-busting if profile_image_url exists
// 			if (user?.profile_image_url) {
// 				user = {
// 					...user,
// 					profile_image_url:
// 						user.profile_image_url + "?t=" + new Date().getTime(),
// 				};
// 			}

// 			state.user = user;
// 			localStorage.setItem("user", JSON.stringify(user));
// 		},
// 		setLogoutUser: (state) => {
// 			state.userToken = "";
// 			state.user = null;
// 			state.videoCallData = { status: false, data: null };

// 			// ✅ Clear localStorage on logout
// 			localStorage.removeItem("token");
// 			localStorage.removeItem("user");
// 			localStorage.removeItem("gender");
// 			localStorage.removeItem("selfieVerified");
// 			localStorage.removeItem("hasPackage");
// 		},
// 		handleVideoCallModal: (state, action) => {
// 			state.videoCallData = action.payload;
// 		},
// 	},
// });

// export const { setUserToken, setUser, setLogoutUser, handleVideoCallModal } =
// 	AuthReducer.actions;
// export default AuthReducer.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
// 	userToken: "",
// 	user: null,
// 	videoCallData: { status: false, data: null },
// 	refreshNotifications: false, // 👈 Used to trigger refetch of notifications
// };

// const AuthReducer = createSlice({
// 	name: "auth",
// 	initialState,
// 	reducers: {
// 		// ✅ Save user and token to Redux + localStorage
// 		setUserToken: (state, action) => {
// 			const { user, token, gender } = action.payload;

// 			state.userToken = token || "";

// 			if (user) {
// 				// ✅ Add timestamp to image URL to avoid browser cache
// 				const updatedUser = {
// 					...user,
// 					gender,
// 					profile_image_url: user?.profile_image_url
// 						? `${user.profile_image_url}?t=${new Date().getTime()}`
// 						: null,
// 				};

// 				state.user = updatedUser;

// 				localStorage.setItem("user", JSON.stringify(updatedUser));
// 				if (token) localStorage.setItem("token", token);
// 				if (gender) localStorage.setItem("gender", gender);
// 			} else {
// 				state.user = null;
// 			}
// 		},

// 		// ✅ Update user object (e.g., after profile change)
// 		setUser: (state, action) => {
// 			let user = action.payload;

// 			if (user?.profile_image_url) {
// 				user = {
// 					...user,
// 					profile_image_url: `${
// 						user.profile_image_url
// 					}?t=${new Date().getTime()}`,
// 				};
// 			}

// 			state.user = user;
// 			localStorage.setItem("user", JSON.stringify(user));
// 		},

// 		// ✅ Logout user and clear all stored data
// 		setLogoutUser: (state) => {
// 			state.userToken = "";
// 			state.user = null;
// 			state.videoCallData = { status: false, data: null };
// 			state.refreshNotifications = false;

// 			localStorage.removeItem("token");
// 			localStorage.removeItem("user");
// 			localStorage.removeItem("gender");
// 			localStorage.removeItem("selfieVerified");
// 			localStorage.removeItem("hasPackage");

// 			localStorage.clear();
// 		},

// 		// ✅ Control video call modal open/close and data
// 		handleVideoCallModal: (state, action) => {
// 			state.videoCallData = action.payload;
// 		},

// 		// ✅ Trigger notifications to refresh (used by Pusher or new fetch)
// 		// AuthReducer.js
// 		triggerNotificationRefresh: (state) => {
// 			state.refreshNotifications = !state.refreshNotifications; // ✅ toggles
// 		},
// 	},
// });

// export const {
// 	setUserToken,
// 	setUser,
// 	setLogoutUser,
// 	handleVideoCallModal,
// 	triggerNotificationRefresh,
// } = AuthReducer.actions;

// export default AuthReducer.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userToken: "",
	user: null,
	videoCallData: { status: false, data: null },
	refreshNotifications: false,
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
					profile_image_url: `${
						user.profile_image_url
					}?t=${new Date().getTime()}`,
				};
			}
			state.user = user;
			localStorage.setItem("user", JSON.stringify(user));
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
} = AuthReducer.actions;

export default AuthReducer.reducer;
