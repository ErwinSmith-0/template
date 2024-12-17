import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession, signOut, useSession } from "next-auth/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,

  prepareHeaders: async (headers) => {
    const session = await getSession();
    if (session) {
      // headers.set("Authorization", `Bearer ${session.user.accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  try {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
      signOut();
    }
    return { data: result?.data };
  } catch (error) {
    return { error };
  }
};

export const portfolioApi = createApi({
  reducerPath: "portfolioApi",
  refetchOnFocus: false,
  refetchOnMountOrArgChange: false,
  baseQuery: baseQueryWithReauth,
  tagTypes: ["profile", "skills"],
  endpoints: () => ({}),
});
