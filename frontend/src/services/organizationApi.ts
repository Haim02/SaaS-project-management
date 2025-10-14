import type { CreateOrgBody, CreateOrgResponse, DeleteResp, InviteResp, JoinOrgResponse, RenewResp } from "../types/organization";
import { api } from "./api";


export const organizationApi = api.injectEndpoints({
    endpoints: (builder) => ({
        joinOrganization: builder.mutation<JoinOrgResponse, { code: string, userId: string }>({
            query: ({code, userId}) => ({ url: "/organizations/join-organization", method: "POST", body:{code, userId} }),
            invalidatesTags: ["Me", "Organizations"],
        }),

        createOrganization: builder.mutation<CreateOrgResponse, CreateOrgBody>({
            query: (body) => ({ url: "/organizations", method: "POST", body }),
            invalidatesTags: ["Me", "Organizations"],
        }),
        getInvite: builder.query<InviteResp, { orgId: string }>({
            query: ({ orgId }) => `/organizations/${orgId}/invite`,
            providesTags: (_r, _e, a) => [{ type: "Organizations", id: a.orgId }],
        }),
        renewInvite: builder.mutation<RenewResp, { orgId: string }>({
            query: ({ orgId }) => ({ url: `/organizations/${orgId}/invite/renew`, method: "POST" }),
            invalidatesTags: (_r, _e, a) => [{ type: "Organizations", id: a.orgId }],
        }),
        deleteOrganization: builder.mutation<DeleteResp, { orgId: string }>({
            query: ({ orgId }) => ({ url: `/organizations/${orgId}`, method: "DELETE" }),
            invalidatesTags: ["Organizations", "Me", "Projects", "Tasks"],
        }),
    })
})

export const {
    useJoinOrganizationMutation,
    useCreateOrganizationMutation,
    useGetInviteQuery,
    useRenewInviteMutation,
    useDeleteOrganizationMutation,
} = organizationApi;
