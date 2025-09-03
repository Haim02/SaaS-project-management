import { Request, Response } from "express";
import { Task } from "../models/Task";
import { StatusCodes } from "http-status-codes";

export const getAllTasks = async (req: Request, res: Response) => {
    const { projectId } = req.params

    try {
        const tasks = await Task.find({ projectId }).sort({ order: 1, createdAt: 1 })
        res.status(StatusCodes.OK).json(tasks)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error)
    }
}

export const createTask = async (req: Request, res: Response) => {
    const { projectId } = req.params
    const body = req.body

    try {
        const task = await Task.create({ ...body, projectId })
        res.status(StatusCodes.CREATED).json(task)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error)
    }
}

export const updateTask = async (req: Request, res: Response) => {
    const { projectId, taskId } = req.params;
    const body = req.body

    try {
        const task = await Task.findByIdAndUpdate(taskId, body, { new: true })
        if (!task) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Task not found" })
        }
        res.status(StatusCodes.OK).json(task)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error)
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    const { projectId, taskId } = req.params;
    const task = await Task.deleteOne({ _id: taskId, projectId })
    if (!task) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Task not found" })
    }
    res.status(StatusCodes.OK).json({ ok: true })
}

export const reorderTasks = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const { updates } = req.body;

    const tasks = updates.map((task: any) => ({
        updateOne: {
            filter: { _id: task.taskId, projectId },
            update: { $set: { order: task.order, status: task.status } }
        }
    }))
    if (tasks.length) await Task.bulkWrite(tasks);
    res.status(StatusCodes.OK).json({ ok: true });
}