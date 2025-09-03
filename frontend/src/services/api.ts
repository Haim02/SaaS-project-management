import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // baseUrl: import.meta.env.VITE_API_URL + '/api',
    baseUrl: 'http://localhost:3000/api',
    credentials: 'include',
  }),
  tagTypes: ['Me', 'Projects', 'Tasks'],
  endpoints: () => ({})
 });
