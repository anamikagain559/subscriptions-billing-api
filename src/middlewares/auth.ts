import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError';
import { config } from '../config/index';
import { User } from '../models/user.model';

export interface AuthRequest extends Request {
  user?: any;
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new ApiError(401, 'Please authenticate');
    }

    const decoded = jwt.verify(token, config.jwt.secret) as { sub: string };
    const user = await User.findById(decoded.sub);

    if (!user) {
      throw new ApiError(401, 'User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(401, 'Please authenticate'));
  }
};
