import { Socket } from 'socket.io';
import { findUserById } from '../services/user.service';
import { verifyJwt } from '../utils/jwt';
import AppError from '../utils/appError';

export const deserializeSocketUser = async (socket: Socket, next: (err?: Error) => void) => {
  try {
    // Extract the token from the handshake headers
    let access_token = socket.handshake.headers.authorization;

    if (access_token && access_token.startsWith('Bearer')) {
      access_token = access_token.split(' ')[1];
    } else if (socket.handshake.auth.token) {
      access_token = socket.handshake.auth.token;  // Option to pass token via auth object
    }

    if (!access_token) {
      throw new AppError('You are not logged in', 401);
    }

    // Validate the access token
    const decoded = verifyJwt<{ sub: string }>(access_token, 'accessTokenPublicKey');
    if (!decoded) {
      throw new AppError('Invalid token or user does not exist', 401);
    }

    // Check if user still exists
    const user = await findUserById(decoded.sub);
    if (!user) {
      throw new AppError('User with that token no longer exists', 401);
    }

    // Attach user to socket data for use in events
    socket.data.user = user;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
};
