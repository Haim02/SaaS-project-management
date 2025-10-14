import type { User } from "../types/user";
import { api } from "./api";


export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<{ user: User }, { email: string; password: string }>({
            query: (body) => ({ url: '/auth/login', method: 'POST', body }),
            invalidatesTags: ['Me'],
        }),
        register: builder.mutation<{ user: User }, { name: string; email: string; password: string }>({
            query: (body) => ({ url: '/auth/register', method: 'POST', body }),
            invalidatesTags: ['Me'],
        }),
        logout: builder.mutation<{ ok: true }, void>({
            query: () => ({ url: '/auth/logout', method: 'POST' }),
            invalidatesTags: ['Me'],
        }),
        isUserLogin: builder.query<{ name: string; email: string }, void>({
            query: () => '/auth/isUserLogin',
            providesTags: ['Me'],
        }),

        me: builder.query<User, void>({
            query: () => "/auth/me",
            providesTags: ["Me"]
        }),
        myOrganizations: builder.query<Array<{ _id: string; name: string; description?: string; role: "owner" | "admin" | "member" | "guest"; membersCount: number }>,void>({
            query: () => "/organizations/mine",
            providesTags: ["Organizations"],
        }),
        updateMe: builder.mutation<User, { name: string; email?: string }>({
            query: (body) => ({ url: "/auth/me", method: "PATCH", body }),
            invalidatesTags: ["Me"],
        }),

        changePassword: builder.mutation<{ ok: true }, { currentPassword: string; newPassword: string }>({
            query: (body) => ({ url: "/auth/change-password", method: "POST", body }),
        }),
    })
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useMyOrganizationsQuery,
  useIsUserLoginQuery,
  useMeQuery,
  useUpdateMeMutation,
  useChangePasswordMutation,
} = authApi;
