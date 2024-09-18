require('dotenv').config();
import cookieParser from 'cookie-parser';
import path from 'path';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import config from 'config';
import cors from 'cors';
import connectDB from './utils/connectDB';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import projectRouter from './routes/project.route';
import taskRouter from './routes/task.route';
import chatRouter from './routes/chat.route'

import { Server } from 'socket.io';
import http from 'http';
import { initializeSocket } from './socket';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: ['http://localhost:5173','https://www.postman.com'],
      credentials: true,
    },
  });


initializeSocket(io);
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.use('/api/static', express.static(path.join(__dirname, '../public')));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:5173','https://www.postman.com'],
    })
);

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/project', projectRouter);
app.use('/api/task', taskRouter);
app.use('/api/chat', chatRouter);


app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});


// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});


const port = config.get<number>('port');
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
    connectDB();
});