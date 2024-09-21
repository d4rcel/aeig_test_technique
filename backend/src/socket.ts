import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { deserializeSocketUser } from './middleware/socketAuth';
import { findProjectById } from './services/project.service';
import { createMessage } from './services/message.service';

export const initializeSocket = (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) => {
  
  console.log("HHHHHHHH");
  
  io.use(async (socket, next) => {
    try {
      // Authenticate the user using the token from the socket handshake
      await deserializeSocketUser(socket, next);
      console.log("Socket connected...");
      
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  // Handle socket connection
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join project room if the user is a project member
    socket.on('joinProject', async ({ projectId }) => {
      try {
        const user = socket.data.user; // Extract user from socket

        const project = await findProjectById(projectId);
        if (!project) {
          return socket.emit('error', 'Project not found');
        }

        // Check if the user is a member of the project
        if (!project.members.includes(user._id)) {
          return socket.emit('error', 'You are not a member of this project');
        }

        // Join the Socket.io room for the project
        socket.join(projectId);
        console.log(`User ${user._id} joined project ${projectId}`);
      } catch (err) {
        socket.emit('error', 'Unauthorized');
      }
    });

    // Handle receiving a new chat message
    socket.on('sendMessage', async ({ projectId, message }) => {
      console.log("HHHHHHHH 555");
      try {
        const user = socket.data.user; // Extract user from socket

        const project = await findProjectById(projectId);
        if (!project) {
          return socket.emit('error', 'Project not found');
        }

        if (!project.members.includes(user._id)) {
          return socket.emit('error', 'You are not a member of this project');
        }

        // Emit the message to the project room
        io.to(projectId).emit('newMessage', {
          message,
          sender: user._id,
          timestamp: new Date(),
        });

        // Save the message to the database
        await createMessage({ projectId, sender: user._id, content: message });
      } catch (err) {
        socket.emit('error', 'Error sending message');
      }
    });

    socket.on('disconnect', () => {
      console.log("HHHHHHHH 666");
      console.log('User disconnected:', socket.id);
    });
  });
};
