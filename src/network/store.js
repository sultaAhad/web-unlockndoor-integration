import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

// Slices
import authReducer from "../network/reducers/AuthReducer";

// Services
import HelpServices from "./services/HelpServices";
import AuthServices from "./services/AuthServices";
import ManProfile from "./services/ManProfile"; // ✅ Must match the named export
import GalleryApi from "./services/GalleryApi";

const store = configureStore({
	reducer: {
		authReducer,
		[HelpServices.reducerPath]: HelpServices.reducer,
		[AuthServices.reducerPath]: AuthServices.reducer,
		[GalleryApi.reducerPath]: GalleryApi.reducer,
		[ManProfile.reducerPath]: ManProfile.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat([
			HelpServices.middleware,
			AuthServices.middleware,
			GalleryApi.middleware,
			ManProfile.middleware,
		]),
});

export const persistor = persistStore(store);
export default store;
