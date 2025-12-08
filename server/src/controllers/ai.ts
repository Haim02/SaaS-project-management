import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Project } from './../models/Project';
import { Task } from './../models/Task';
import { summarizeProject } from './../services/aiService';

type SummarProjectReq = {
    projectId?: string;
    orgId?: string;
}


export const summarProject = async (req: Request, res: Response) => {
    console.log('start')
    try {
        const { projectId, orgId } = req.body as SummarProjectReq
        // const { projectId, orgId } = req.body as {
        //     projectId?: string;
        //     orgId?: string;
        // };
        console.log('projectId, orgId ', projectId, orgId)

        if (!projectId) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ error: "projectId is required in request body" });
        }

        // מביאים את הפרויקט (לשם)
        const project = await Project.findById(projectId).lean();

        // מביאים את כל המשימות של הפרויקט (אפשר לסנן גם לפי orgId אם יש כזה במודל)
        const query: any = { projectId };
        if (orgId) {
            query.orgId = orgId;
        }

        const tasks = await Task.find(query).lean();

        // ממפים למשימות בפורמט שהגדרנו ב-aiService.ts
        const tasksForSummary = tasks.map((t: any) => ({
            title: t.title ?? "",
            status: t.status ?? "todo",
            priority: t.priority ?? undefined,
            assigneeName: t.assigneeName ?? null,
        }));

        // קריאה ל-AI
        const summary = await summarizeProject(
            project?.name ?? "פרויקט ללא שם",
            tasksForSummary
        );

        return res.json({ summary });
    } catch (err) {
        console.error("summarize-project error:", err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to summarize project" });
    }
}