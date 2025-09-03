import { Router } from "express";
import { getAllTasks, createTask, deleteTask, reorderTasks, updateTask } from "../controllers/tasks";
import { auth } from "../middleware/auth";
import { createTaskSchema, updateTaskSchema, reorderSchema } from "../validation/task.schema";

const taskRouter = Router()
taskRouter.use(auth);

taskRouter.route("/:projectId/tasks")
   .get(getAllTasks)
   .post(createTask);
taskRouter.route("/:projectId/tasks/:taskId")
   .patch(updateTask)
   .delete(deleteTask);
taskRouter.patch("/:projectId/tasks/reorder", reorderTasks)

export default taskRouter;