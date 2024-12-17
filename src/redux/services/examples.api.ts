import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { portfolioApi } from "./admin.api";

// Define Category type based on the provided JSON structure
type Branch = {
  name: string;
  image?: string; // image is optional
  phone: string;
  email: string;
  address: string;
  productCount: string;
  passcode: string;
  status: string;
  code: string;
  _id?: string;
};

// Define the response structure type
type BranchResponse = {
  message: string;
  data: Branch[];
  status: boolean;
};
// type OneBranchResponse = {
//   message: string;
//   data: Branch;
//   status: boolean;
// };
type DeleteBranch = {
  branchId: string;
  status: string;
};

type CreateBranchResponse = {
  message: string;
  status: boolean; // Assuming status is a boolean indicating success/failure
};

type AnalyticsMetrics = {
  orders: number;
  pending: number;
  completed: number;
  cancelled: number;
  revenue: number;
};

type BranchAnalytics = {
  total: AnalyticsMetrics;
  todays: AnalyticsMetrics;
};

export type Analytics = {
  home: BranchAnalytics;
  [branchName: string]: BranchAnalytics;
};

export type AnalyticsResponse = {
  message: string;
  data: {
    analytics: Analytics;
  };
  status: boolean;
};

// Create the API slice using Redux Toolkit
export const examplesApi = portfolioApi.injectEndpoints({
  endpoints: (builder) => ({
    getBranch: builder.query<Branch[], void>({
      query: () => ``,
      transformResponse: (response: BranchResponse) => response.data,
      // providesTags: [""],
    }),
    getBranchByName: builder.query<Branch[], string>({
      query: (name) => ``,
      transformResponse: (response: BranchResponse) => response.data,
      // providesTags: [""],
    }),
    createBranch: builder.mutation<CreateBranchResponse, FormData>({
      query: (formData) => ({
        url: `/v1/api/`,
        formData: true,
        body: formData,
        method: "POST",
      }),
      // invalidatesTags: [""],
    }),
    updateBranch: builder.mutation<CreateBranchResponse, FormData>({
      query: (formData) => ({
        url: ``,
        formData: true,
        body: formData,
        method: "POST",
      }),
      // invalidatesTags: [""],
    }),
    deleteBranch: builder.mutation<CreateBranchResponse, DeleteBranch>({
      query: (DeleteBranch) => ({
        url: ``,
        headers: {
          "Content-Type": "application/json", // Ensures the body is treated as JSON
        },

        // formData: true,
        body: JSON.stringify(DeleteBranch),
        method: "POST",
      }),
      // invalidatesTags: [""],
    }),
    listAllAnalytics: builder.query<Analytics, void>({
      query: () => ``,
      transformResponse: (response: AnalyticsResponse) =>
        response.data.analytics,
    }),
  }),
});

export const {
  useGetBranchQuery,
  useGetBranchByNameQuery,
  useCreateBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
  useListAllAnalyticsQuery,
} = examplesApi;
