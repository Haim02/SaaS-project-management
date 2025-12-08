import { Router } from "express";
import { summarProject } from "../controllers/ai";

const aiRouter = Router();

aiRouter.post("/summarize-project", summarProject)

export default aiRouter;