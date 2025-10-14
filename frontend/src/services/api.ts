import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

const row = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',
});


const getActiveOrgId = () => {
  return localStorage.getItem("active_org_id");
}

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extra) => {
  let a: FetchArgs = typeof args === "string" ? { url: args } : { ...args };
  const urlStr = String(a.url ?? "");
  const method = (a.method ?? "GET").toUpperCase();

  const skipInject = urlStr.startsWith("/auth") || urlStr.startsWith("/organizations");

  if (!skipInject) {
    const orgId = localStorage.getItem("active_org_id");
    if (orgId) {
      if (method === "GET") {
        const u = new URL(urlStr, "http://x");
        u.searchParams.set("orgId", orgId);
        a.url = u.pathname + "?" + u.searchParams.toString();
      } else {
        const body = (a.body && typeof a.body === "object") ? a.body : {};
        a.body = { orgId, ...body } as any;
      }
    }
  }

  const res = await row(a, api, extra);
  return res;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Me', 'Projects', 'Tasks', 'Organizations'],
  endpoints: () => ({})
 });
