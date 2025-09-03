import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string().min(2),
    description: z.string().optional(),
    status: z.enum(["todo", "inprogress", "done"]).default("todo"),
    priority: z.enum(["low", "medium", "high"]).default("medium"),
    assigneeName: z.string().optional(),
    order: z.number().optional(),
    labels: z.array(z.string()).optional()
});

export const updateTaskSchema = createTaskSchema.partial();
export const reorderSchema = z.object({
    updates: z.array(z.object({
        taskId: z.string(),
        status: z.enum(["todo", "inprogress", "done"]),
        order: z.number()
    }))
});
