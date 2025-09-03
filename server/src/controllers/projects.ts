import { Request, Response } from "express";
import { Project } from "../models/Project";
import { StatusCodes } from "http-status-codes";

export const getAllProjects = async (req: Request, res: Response) => {
    const userId = req.userId
    try {
        const projects = await Project.find({ ownerId: userId }).sort({ createdAt: -1 })
        res.status(StatusCodes.OK).json(projects)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error)
    }
}

export const createProject = async (req: Request, res: Response) => {
    const ownerId = req.userId
    const body = req.body

    try {
        const project = await Project.create({ ...body, ownerId })
        res.status(StatusCodes.CREATED).json(project)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error)
    }
}

export const deleteProject = async (req: Request, res: Response) => {
    const { projectId } = req.params
    const projects = await Project.find()
    const project = await Project.findByIdAndDelete(projectId)
    
    if (!project) {
        res.status(StatusCodes.NOT_FOUND).json({ error: 'project not found' })
    }
    res.json({ ok: true })

}