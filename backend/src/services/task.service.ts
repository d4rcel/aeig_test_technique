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
  
  // Service to find all tasks with filtering and sorting options for a specific user or project
  export const findAllTasks = async ({ 
    filter,
    sort 
  }: { 
    filter: FilterQuery<Task>,
    sort?: string | Record<string, 1 | -1>
  }) => {
    return taskModel.find(filter).sort(sort).populate('assignedTo').populate('project');
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
  