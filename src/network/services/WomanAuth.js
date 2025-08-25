import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/base_url";
import { WOMEN_LOGIN, WOMEN_SIGNUP } from "../../utils/endpoints";

export const WomenAuth = createApi({
  reducerPath: "WomenAuth",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.authReducer?.userToken;
      headers.set("Accept", "application/json");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    womenSignup: build.mutation({
      query: (data) => ({
        url: WOMEN_SIGNUP,
        method: "POST",
        body: data,
      }),
    }),
    womenLogin: build.mutation({
      query: (credentials) => ({
        url: WOMEN_LOGIN,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useWomenSignupMutation, useWomenLoginMutation } = WomenAuth;
export default WomenAuth;
