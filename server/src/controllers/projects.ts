import { Request, Response } from "express";
import { Project } from "../models/Project";
import { StatusCodes } from "http-status-codes";
import { Organization } from "../models/Organization";
import mongoose from "mongoose";

export const getAllProjects = async (req: Request, res: Response) => {
    const { orgId } = req.query as { orgId?: string };
    const userId = req.userId
    if (!orgId || !mongoose.isValidObjectId(orgId)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Missing/ invalid orgId" });
    }
    if (!userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
    }

    const organization = await Organization.findOne({ _id: orgId, "members.userId": req.userId }).lean();
    if (!organization) {
        return res.status(StatusCodes.FORBIDDEN).json({ error: "Not a member of organization" });
    }

    try {
        const projects = await Project.find({ orgId }).sort({ createdAt: -1 }).lean();
        res.status(StatusCodes.OK).json(projects.map(project => ({ _id: project._id, name: project.name, description: project.description, createdAt: project.createdAt })))
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error)
    }
}

export const createProject = async (req: Request, res: Response) => {
    const ownerId = req.userId
    const body = req.body

    if (!body.orgId || !mongoose.isValidObjectId(body.orgId)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Missing/ invalid orgId" });
    }
    if (!ownerId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
    }

    try {
        const organization = await Organization.findOne({ _id: body.orgId, "members.userId": ownerId }).lean();
        if(!organization) {
            return res.status(StatusCodes.FORBIDDEN).json({ error: "Not a member of organization" });
        }

        const project = await Project.create({ ...body, ownerId })
        res.status(StatusCodes.CREATED).json(project)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error)
    }
}

export const deleteProject = async (req: Request, res: Response) => {
    const { projectId } = req.params
    const project = await Project.findByIdAndDelete(projectId)

    if (!project) {
        res.status(StatusCodes.NOT_FOUND).json({ error: 'project not found' })
    }
    res.json({ ok: true })

}