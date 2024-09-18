export interface GenericResponse {
    status: string;
    message: string;
  }
  
  
  export interface IPostRequest {
    title: string;
    content: string;
    image: string;
    user: string;
  }
  
  export interface IUser {
    name: string;
    email: string;
    role: string;
    photo: string;
    _id: string;
    id: string;
    created_at: string;
    updated_at: string;
    __v: number;
  }
  
  export interface IPostResponse {
    id: string;
    title: string;
    content: string;
    image: string;
    category: string;
    user: IUser;
    created_at: string;
    updated_at: string;
  }
  
  export interface RegisterInput {
    name: string;
    email: string;
    password: string;
    role: string
  }

  export interface LoginInput {
    email: string;
    password: string;
  }

  export interface IProjectRequest {
    title: string;
    description: string;
    dueDate: Date;
    status: string;
  }

  export interface IProjectResponse {
    _id: string;
    title: string;
    description: string;
    dueDate: Date;
    status: string;
  }

  export type ProjectsResponse = Required<{
    projects: IProjectResponse[]
  }>;

  export interface ITaskRequest {
    title: string;
    description: string;
    dueDate: Date;
    status: string;
    assignedTo: string
  }

  export interface ITaskResponse {
    _id: string;
    title: string;
    description: string;
    dueDate: Date;
    status: string;
    assignedTo: string
  }

  export type TasksResponse = Required<{
    projects: ITaskResponse[]
  }>;