import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';

export const restrictTo =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    if (!allowedRoles.includes(user.role)) {
      return next(
        new AppError('Privilège ADMIN. Seuls les admins peuvent effectuer cette action', 403)
      );
    }

    next();
  };
