import {
  FilterQuery,
  QueryOptions,
  UpdateQuery,
  Types,
  ObjectId,
} from 'mongoose';
import projectModel, { Project } from '../models/project.model';

export const createProject = async ({
  input,
  user_id,
}: {
  input: Partial<Project>;
  user_id: string;
}) => {
  return projectModel.create({ ...input, owner: user_id });
};

export const findProjectById = async (id: string) => {
  return projectModel.findById(id);
};

export const findAllProjects = async (filter: FilterQuery<Project>, options: QueryOptions = {}) => {
  return projectModel.find(filter, {}, options).populate('owner').lean();
};

export const findProject = async (
  query: FilterQuery<Project>,
  options: QueryOptions = {}
) => {
  return await projectModel.findOne(query, {}, options);
};

export const findAndUpdateProject = async (
  query: FilterQuery<Project>,
  update: UpdateQuery<Project>,
  options: QueryOptions
) => {
  return await projectModel
    .findOneAndUpdate(query, update, {...options, new: true})
    .populate('owner');
};

export const findOneAndDelete = async (
  query: FilterQuery<Project>,
  options: QueryOptions = {}
) => {
  return await projectModel.findOneAndDelete(query, options);
};
