import { NextFunction, Request, Response } from 'express';
import {
  CreateProjectInput,
  DeleteProjectInput,
  GetProjectInput,
  UpdateProjectInput,
} from '../schema/project.schema';
import {
  createProject,
  findAllProjects,
  findAndUpdateProject,
  findOneAndDelete,
  findProject,
  findProjectById
} from '../services/project.service';
import AppError from '../utils/appError';

export const createProjectHandler = async (
  req: Request<{}, {}, CreateProjectInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = res.locals.user._id;

    const project = await createProject({ input: req.body, user_id });

    res.status(201).json({
      status: 'success',
      data: {
        project,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getProjectHandler = async (
  req: Request<GetProjectInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await findProjectById(req.params.projectId);

    if (!project) {
      return next(new AppError('Project with that ID not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        project,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getProjectsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user._id;
    const projects = await findAllProjects({ userId });

    res.status(200).json({
      status: 'success',
      data: {
        projects,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateProjectHandler = async (
  req: Request<UpdateProjectInput['params'], {}, UpdateProjectInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedProject = await findAndUpdateProject(
      { _id: req.params.projectId },
      req.body,
      {}
    );

    if (!updatedProject) {
      return next(new AppError('Project with that ID not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        project: updatedProject,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteProjectHandler = async (
  req: Request<DeleteProjectInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await findOneAndDelete({ _id: req.params.projectId });

    if (!project) {
      return next(new AppError('Project with that ID not found', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};
