import { object, string, TypeOf } from 'zod';
import mongoose from 'mongoose';

export const createTaskSchema = object({
    body: object({
        title: string({
            required_error: 'Title is required',
        }),
        description: string({
            required_error: 'Content is required',
        }),
        dueDate: string({
            required_error: 'Due date is required',
        }).transform((str) => new Date(str)),
        status: string({
            required_error: 'Status is required',
        }),
        priority: string({
            required_error: 'Priority is required',
        }),
        project: string({
            required_error: 'Project Id is required',
        }),
        assignedTo: string({
            required_error: 'Assign the task to the user',
        }),
    }),
});

const params = {
    params: object({
        taskId: string(),
    }),
};

export const getTaskSchema = object({
    ...params,
});

export const updateTaskSchema = object({
    ...params,
    body: object({
        title: string(),
        description: string(),
        dueDate: string(),
        status: string(),
        priority: string(),
        assignedTo: string(),
        project: string()
    }).partial(),
});

export const deleteTaskSchema = object({
    ...params,
});

export type CreateTaskInput = TypeOf<typeof createTaskSchema>['body'];
export type GetTaskInput = TypeOf<typeof getTaskSchema>['params'];
export type UpdateTaskInput = TypeOf<typeof updateTaskSchema>;
export type DeleteTaskInput = TypeOf<typeof deleteTaskSchema>['params'];
