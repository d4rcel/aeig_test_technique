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

export const createTaskHandler = async (
  req: Request<{}, {}, CreateTaskInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { assignedTo, ...taskData } = req.body;

    const task = await createTask({ input: req.body, assignedTo: assignedTo || res.locals.user._id });

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
      data: {
        task,
      },
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
    const tasks = await findAllTasks({ filter: { assignedTo: userId } });

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
