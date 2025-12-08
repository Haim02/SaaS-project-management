
export type SummarizeRequest = {
    projectId: string;
    orgId?: string;
};

export type SummarizeResponse = {
    summary: string;
};