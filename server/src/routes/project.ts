import { Router } from "express";
import { getAllProjects, createProject, deleteProject } from "../controllers/projects";
import { createProjectSchema } from "../validation/project.schema";
import { auth } from "../middleware/auth";

const projectRouter = Router()

projectRouter.use(auth)
projectRouter.get('/', getAllProjects)
projectRouter.post('/projects', createProject)
projectRouter.delete('/projects/:projectId', deleteProject)

export default projectRouter;