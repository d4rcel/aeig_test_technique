import { object, string, TypeOf, date } from 'zod';

export const createProjectSchema = object({
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
    }),
});

const params = {
    params: object({
        projectId: string(),
    }),
};

export const getProjectSchema = object({
    ...params,
});

export const updateProjectSchema = object({
    ...params,
    body: object({
        title: string(),
        description: string(),
        dueDate: string(),
        status: string()
    }).partial(),
});

export const deleteProjectSchema = object({
    ...params,
});

export type CreateProjectInput = TypeOf<typeof createProjectSchema>['body'];
export type GetProjectInput = TypeOf<typeof getProjectSchema>['params'];
export type UpdateProjectInput = TypeOf<typeof updateProjectSchema>;
export type DeleteProjectInput = TypeOf<typeof deleteProjectSchema>['params'];
