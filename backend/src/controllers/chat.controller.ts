import { Request, Response, NextFunction } from 'express';
import { findProjectById } from '../services/project.service';
import { getMessagesByProjectId } from '../services/message.service';
import AppError from '../utils/appError';

// Get chat history for a project
export const getChatHistoryHandler = async (
  req: Request<{ projectId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user._id;
    const { projectId } = req.params;

    const project = await findProjectById(projectId);

    if (!project) {
      return next(new AppError('Project not found', 404));
    }

    // Check if the user is a member of the project
    if (!project.members.includes(userId)) {
      return next(new AppError('You are not a member of this project', 403));
    }

    // Get chat messages for the project
    const messages = await getMessagesByProjectId(projectId);

    res.status(200).json({
      status: 'success',
      messages
    });
  } catch (err: any) {
    next(err);
  }
};
