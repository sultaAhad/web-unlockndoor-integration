import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Slices
import authReducer from "../network/reducers/AuthReducer";

// Services (RTK Query)
import HelpServices from "./services/HelpServices";
import AuthServices from "./services/AuthServices";
import GalleryApi from "./services/GalleryApi";
import ManAuth from "./services/ManAuth";
import WomenAuth from "./services/WomanAuth";
import SponsoredDates from "./services/woman/SponsoredDates";

// ✅ combine all reducers
const rootReducer = combineReducers({
	auth: authReducer,
	[HelpServices.reducerPath]: HelpServices.reducer,
	[AuthServices.reducerPath]: AuthServices.reducer,
	[GalleryApi.reducerPath]: GalleryApi.reducer,
	[ManAuth.reducerPath]: ManAuth.reducer,
	[WomenAuth.reducerPath]: WomenAuth.reducer,
	[SponsoredDates.reducerPath]: SponsoredDates.reducer,
});

// ✅ persist config
const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth"], // sirf auth persist karna hai
};

// ✅ persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ store
const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat([
			HelpServices.middleware,
			AuthServices.middleware,
			GalleryApi.middleware,
			ManAuth.middleware,
			WomenAuth.middleware,
			SponsoredDates.middleware,
		]),
});

// ✅ persistor
export const persistor = persistStore(store);
export default store;
