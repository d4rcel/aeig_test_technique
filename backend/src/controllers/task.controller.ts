import { NextFunction, Request, Response } from 'express';
import {
  CreateTaskInput,
  DeleteTaskInput,
  GetTaskInput,
  UpdateTaskInput,
} from '../schema/task.schema';
import {
  createTask,
  findAllTasks,
  findAndUpdateTask,
  findTaskById,
  findOneAndDelete,
} from '../services/task.service';
import AppError from '../utils/appError';
import { findAndUpdateProject, findProjectById } from '../services/project.service';
import { Types } from "mongoose"

export const createTaskHandler = async (
  req: Request<{}, {}, CreateTaskInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { assignedTo, ...taskData } = req.body;

    const assignedToUserId = assignedTo || res.locals.user._id;

    const task = await createTask({ input: req.body, assignedTo: assignedToUserId });
    
    const project = await findProjectById(req.body.project);
    if (!project) {
      return next(new AppError('Project with that ID not found', 404));
    }

    if (!project.members.includes(assignedToUserId)) {
      await findAndUpdateProject(
        { _id: req.body.project },
        { $push: { members: assignedToUserId } },
        {}
      );
    }

    res.status(201).json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getTaskHandler = async (
  req: Request<GetTaskInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await findTaskById(req.params.taskId);

    if (!task) {
      return next(new AppError('Task with that ID not found', 404));
    }

    res.status(200).json({
      status: 'success',
      task
    });
  } catch (err: any) {
    next(err);
  }
};

export const getTasksHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user._id;

    // Extract query parameters for filters
    const { status, dueDate, priority, sortBy } = req.query;

    // Build the filter object
    
    const filter: any = { project: req.body.project };

    if(res.locals.user.role != "admin") {
      filter.assignedTo= userId
    }

    if (status) {
      filter.status = status;
    }

    if (dueDate) {
      filter.dueDate = { $gte: new Date(dueDate as string) };
    }

    if (priority) {
      filter.priority = priority;
    }

    // Define sorting options
    let sort = {};
    if (sortBy === 'dueDate') {
      sort = { dueDate: 1 }; // Ascending order by dueDate
    } else if (sortBy === 'priority') {
      sort = { priority: -1 }; // Descending order by priority
    } else if (sortBy === 'status') {      
      sort = { status: 1 }; // Ascending order by status
    }

    const tasks = await findAllTasks({ filter, sort });

    res.status(200).json({
      status: 'success',
      data: {
        tasks,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateTaskHandler = async (
  req: Request<UpdateTaskInput['params'], {}, UpdateTaskInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedTask = await findAndUpdateTask(
      { _id: req.params.taskId },
      req.body,
      {}
    );

    if (!updatedTask) {
      return next(new AppError('Task with that ID not found', 404));
    }

    if (req.body.assignedTo && req.body.project) {
      const project = await findProjectById(req.body.project);

      if (!project) {
        return next(new AppError('Project with that ID not found', 404));
      }

      if (!project.members.includes(new Types.ObjectId(req.body.assignedTo))) {
        await findAndUpdateProject(
          { _id: req.body.project },
          { $push: { members: req.body.assignedTo } },
          { new: true }
        );
      }
    }

    res.status(200).json({
      status: 'success',
      data: {
        task: updatedTask,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteTaskHandler = async (
  req: Request<DeleteTaskInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await findOneAndDelete({ _id: req.params.taskId });

    if (!task) {
      return next(new AppError('Task with that ID not found', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};
