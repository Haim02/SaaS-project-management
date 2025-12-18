import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { logout } from './store/authSlice';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "/api",
  credentials: "include",
});

const baseQueryWithLogout: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  async (args, api, extraOptions) => {
    let a: FetchArgs = typeof args === "string" ? { url: args } : { ...args };
    const urlStr = String(a.url ?? "");
    const method = (a.method ?? "GET").toUpperCase();

    const skipInject =
      urlStr.startsWith("/auth") || urlStr.startsWith("/organizations");

    if (!skipInject) {
      const orgId = localStorage.getItem("active_org_id");
      if (orgId) {
        if (method === "GET") {
          const u = new URL(urlStr, "http://x");
          u.searchParams.set("orgId", orgId);
          a.url = u.pathname + "?" + u.searchParams.toString();
        } else {
          const body =
            a.body && typeof a.body === "object" ? a.body : {};
          a.body = { orgId, ...body } as any;
        }
      }
    }

    const res = await rawBaseQuery(a, api, extraOptions);

    if (res.error && res.error.status === 401) {
      api.dispatch(logout());
      localStorage.removeItem("active_org_id");

      // if (typeof window !== "undefined" && window.location.pathname !== "/") {
      //   window.location.href = "/";
      // }
    }

    return res;
  };

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithLogout,
  tagTypes: ["Me", "Projects", "Tasks", "Organizations"],
  endpoints: () => ({}),
});

