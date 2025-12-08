import type { SummarizeRequest, SummarizeResponse } from "../types/ai";
import { api } from "./api";

export const aiApi = api.injectEndpoints({
    endpoints: (builder) => ({
        summarizeProject: builder.mutation<SummarizeResponse, SummarizeRequest>({
            query: (body) => ({
                url: "/ai/summarize-project",
                method: "POST",
                body,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useSummarizeProjectMutation } = aiApi;
