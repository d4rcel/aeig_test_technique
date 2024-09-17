import express from "express";
import {
  addMemberToProjectHandler,
  createProjectHandler,
  deleteProjectHandler,
  getProjectHandler,
  getProjectsHandler,
  removeMemberFromProjectHandler,
  updateProjectHandler,
} from "../controllers/project.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import {
  createProjectSchema,
  deleteProjectSchema,
  getProjectSchema,
  updateProjectSchema,
} from "../schema/project.schema";
import { restrictTo } from "../middleware/restrictTo";

const router = express.Router();

router.use(deserializeUser, requireUser);
router
  .route("/")
  .post(
    restrictTo('admin'),
    validate(createProjectSchema),
    createProjectHandler
  )
  .get(getProjectsHandler);

router
  .route("/:projectId")
  .get(validate(getProjectSchema), getProjectHandler)
  .patch(
    validate(updateProjectSchema),
    updateProjectHandler
  )
  .delete(validate(deleteProjectSchema), deleteProjectHandler);

router.patch('/:projectId/members/add', restrictTo('admin'), addMemberToProjectHandler);

router.patch('/:projectId/members/remove', restrictTo('admin'), removeMemberFromProjectHandler)

export default router;
