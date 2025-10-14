import type { Project } from "../types/task";
import { api } from "./api";


export const projectsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query<Project[], {orgId: string | undefined}>({
            query: ({ orgId }) => `/projects?orgId=${orgId}`,
            providesTags: ['Projects'],
        }),
        createProject: builder.mutation<{ _id: string; name: string, description?: string }, { name: string, description?: string }>({
            query: (body) => ({ url: '/projects/projects', method: 'POST', body }),
            invalidatesTags: ['Projects'],
        }),
        deleteProject: builder.mutation<{ ok: true }, { projectId: string }>({
            query: ({ projectId }) => ({ url: `/projects/projects/${projectId}`, method: "DELETE" }),
            invalidatesTags: ["Projects"],
        }),
    })
})

export const {
    useGetProjectsQuery,
    useCreateProjectMutation,
    useDeleteProjectMutation,
} = projectsApi;
