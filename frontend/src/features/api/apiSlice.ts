import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: customFetchBase,

  tagTypes: [
    "Project",
    // "User",
    // "Brand",
    // "Category",
    // "Product",
    // "Store",
    // "Subcategory",
  ],
  endpoints: () => ({}),
})