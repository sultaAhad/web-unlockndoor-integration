import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/base_url";
import { GALLERY } from "../../utils/endpoints"; // ✅ Correct import

const GalleryApi = createApi({
  reducerPath: "GalleryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.authReducer?.userToken;
      headers.set("Accept", "application/json");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["editInfo", "quiz"],
  endpoints: (build) => ({
    GalleryContent: build.query({
      query: () => ({
        url: GALLERY, // ✅ now works
        method: "GET",
      }),
    }),
  }),
});

export const { useGalleryContentQuery } = GalleryApi;
export default GalleryApi;
