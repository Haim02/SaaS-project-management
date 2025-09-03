import { api } from "./api";


export const tasksApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query<Array<any>, { projectId: string }>({
            query: ({ projectId }) => `/${projectId}/tasks`,
            providesTags: (_res, _err, { projectId }) => [{ type: 'Tasks', id: projectId }],
        }),
        updateTask: builder.mutation<any, { projectId: string; taskId: string; patch: any }>({
            query: ({ projectId, taskId, patch }) => ({
                url: `/${projectId}/tasks/${taskId}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: (_res, _err, { projectId }) => [{ type: 'Tasks', id: projectId }],
        }),

        createTask: builder.mutation<any, {
            projectId: string; body: {
                title: string; description?: string; status: 'todo' | 'inprogress' | 'done'; order?: number; assigneeName?: string; priority?: 'low' | 'medium' | 'high'; labels?: string[]
            }
        }>({
            query: ({ projectId, body }) => ({ url: `/${projectId}/tasks`, method: 'POST', body }),
            invalidatesTags: (_res, _err, { projectId }) => [{ type: 'Tasks', id: projectId }]
        }),

        // עדכון סדר/סטטוס של כמה משימות בבת אחת (אופציונלי, אם תתמוך בשרת)
        reorderTasks: builder.mutation<any, { projectId: string; updates: Array<{ taskId: string; order: number; status: string }> }>({
            query: ({ projectId, updates }) => ({ url: `/${projectId}/tasks/reorder`, method: 'PATCH', body: { updates } }),
            invalidatesTags: (_res, _err, { projectId }) => [{ type: 'Tasks', id: projectId }]
        }),
        deleteTask: builder.mutation<{ ok: true }, { projectId: string; taskId: string }>({
            query: ({ projectId, taskId }) => ({
                url: `/projects/${projectId}/tasks/${taskId}`,
                method: "DELETE",
            }),
            invalidatesTags: (_r, _e, { projectId }) => [{ type: "Tasks", id: projectId }],
        }),

        getComments: builder.query<Array<{ _id: string; taskId: string; author: string; text: string; createdAt: string }>, { taskId: string }>({
            query: ({ taskId }) => `/tasks/${taskId}/comments`,
            providesTags: (_r, _e, { taskId }) => [{ type: 'Tasks', id: `comments-${taskId}` }],
        }),
        addComment: builder.mutation<{ _id: string }, { taskId: string; text: string }>({
            query: ({ taskId, text }) => ({ url: `/tasks/${taskId}/comments`, method: 'POST', body: { text } }),
            invalidatesTags: (_r, _e, { taskId }) => [{ type: 'Tasks', id: `comments-${taskId}` }],
        }),
        deleteComment: builder.mutation<{ ok: true }, { taskId: string; commentId: string }>({
            query: ({ taskId, commentId }) => ({ url: `/tasks/${taskId}/comments/${commentId}`, method: 'DELETE' }),
            invalidatesTags: (_r, _e, { taskId }) => [{ type: 'Tasks', id: `comments-${taskId}` }],
        }),
    }),
})


export const {
    useGetTasksQuery,
    useUpdateTaskMutation,
    useCreateTaskMutation,
    useReorderTasksMutation,
    useDeleteTaskMutation,
    useGetCommentsQuery,
    useAddCommentMutation,
    useDeleteCommentMutation,
} = tasksApi;
