import express from "express";
import {
  createTaskHandler,
  deleteTaskHandler,
  getTaskHandler,
  getTasksHandler,
  updateTaskHandler,
} from "../controllers/task.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import {
  createTaskSchema,
  deleteTaskSchema,
  getTaskSchema,
  updateTaskSchema,
} from "../schema/task.schema";

const router = express.Router();

router.use(deserializeUser, requireUser);
router
  .route("/")
  .post(
    validate(createTaskSchema),
    createTaskHandler
  );

router.route("/get-project-tasks").post(getTasksHandler);

router
  .route("/:taskId")
  .get(validate(getTaskSchema), getTaskHandler)
  .patch(
    validate(updateTaskSchema),
    updateTaskHandler
  )
  .delete(validate(deleteTaskSchema), deleteTaskHandler);

export default router;
