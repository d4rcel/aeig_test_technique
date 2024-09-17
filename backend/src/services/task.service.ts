import {
    FilterQuery,
    QueryOptions,
    UpdateQuery,
    Types,
    ObjectId,
  } from 'mongoose';
  import taskModel, { Task } from '../models/task.model';
  
  export const createTask = async ({
    input,
    assignedTo
  }: {
    input: Partial<Task>;
    assignedTo: string;
  }) => {
    return taskModel.create({ ...input, assignedTo });
  };
  
  export const findTaskById = async (id: string) => {
    return taskModel.findById(id).populate('assignedTo').populate('project').lean();
  };
  
  // Service to find all tasks for a specific user or project
  export const findAllTasks = async ({ filter }: { filter: FilterQuery<Task> }) => {
    return taskModel.find(filter).populate('assignedTo').populate('project');
  };
  
  export const findTask = async (
    query: FilterQuery<Task>,
    options: QueryOptions = {}
  ) => {
    return await taskModel.findOne(query, {}, options);
  };
  
  export const findAndUpdateTask = async (
    query: FilterQuery<Task>,
    update: UpdateQuery<Task>,
    options: QueryOptions
  ) => {
    return await taskModel
      .findOneAndUpdate(query, update, {...options, new: true})
      .populate('assignedTo')
      .populate('project');
  };
  
  export const findOneAndDelete = async (
    query: FilterQuery<Task>,
    options: QueryOptions = {}
  ) => {
    return await taskModel.findOneAndDelete(query, options);
  };
  