import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
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
import { findUserById } from '../services/user.service'
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
    const userRole = res.locals.user.role;

    let projects;

    if (userRole === 'admin') {
      projects = await findAllProjects({});
    } else {
      // Non-admin users can only see the projects they are members of
      projects = await findAllProjects({ members: userId });
    }

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


// Add a member to a project
export const addMemberToProjectHandler = async (
  req: Request<{ projectId: string }, {}, { memberId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.params;
    const { memberId } = req.body;
    const userId = res.locals.user._id;
    

    // Fetch the project and check if the user is the owner
    const project = await findProjectById(projectId);

    if (!project) {
      return next(new AppError('Project with that ID not found', 404));
    }

    // Only the project owner can add members
    if (String(project.owner) !== String(userId)) {
      return next(new AppError('You are not the owner of this project', 403));
    }

    // Check if the member to be added exists
    const member = await findUserById(memberId);
    if (!member) {
      return next(new AppError('User with that ID not found', 404));
    }

    // Ensure member._id is of type ObjectId
    const memberObjectId = member._id instanceof Types.ObjectId ? member._id : new Types.ObjectId(member._id);

    // Check if the member is already in the project
    const isMemberAlreadyInProject = project.members.some(id => 
      id instanceof Types.ObjectId ? id.equals(memberObjectId) : new Types.ObjectId(id.toString()).equals(memberObjectId)
    );

    if (isMemberAlreadyInProject) {
      throw new AppError('User is already a member of the project', 400);
    }

    // Add the member to the project
    project.members.push(memberObjectId);

    // Save the updated project
    await project.save();

    res.status(200).json({
      status: 'success',
      data: null
    });
  } catch (err: any) {
    next(err);
  }
};

// Remove a member from a project
export const removeMemberFromProjectHandler = async (
  req: Request<{ projectId: string }, {}, { memberId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.params;
    const { memberId } = req.body;
    const userId = res.locals.user._id;

    // Fetch the project and check if the user is the owner
    const project = await findProjectById(projectId);

    if (!project) {
      return next(new AppError('Project with that ID not found', 404));
    }

    // Only the project owner can remove members
    if (String(project.owner) !== String(userId)) {
      return next(new AppError('You are not the owner of this project', 403));
    }

    // Remove the member from the project
    await findAndUpdateProject(
      { _id: projectId },
      { $pull: { members: memberId } },
      { new: true }
    );

    res.status(200).json({
      status: 'success',
      data:null
    });
  } catch (err: any) {
    next(err);
  }
};