import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

// Slices
import authReducer from "../network/reducers/AuthReducer";

// Services
import HelpServices from "./services/HelpServices";
import AuthServices from "./services/AuthServices";
import GalleryApi from "./services/GalleryApi";
import ManAuth from "./services/ManAuth";

const store = configureStore({
	reducer: {
		authReducer,
		[HelpServices.reducerPath]: HelpServices.reducer,
		[AuthServices.reducerPath]: AuthServices.reducer,
		[GalleryApi.reducerPath]: GalleryApi.reducer,
		[ManAuth.reducerPath]: ManAuth.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat([
			HelpServices.middleware,
			AuthServices.middleware,
			GalleryApi.middleware,
			ManAuth.middleware,
		]),
});

export const persistor = persistStore(store);
export default store;
