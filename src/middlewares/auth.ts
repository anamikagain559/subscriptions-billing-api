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
    let token = req.header('Authorization')?.replace('Bearer ', '');
    
    // Fallback: If not in Authorization header, check if they sent it in a header named 'token'
    if (!token) {
      token = req.header('token');
    }
    if (!token) {
      throw new ApiError(401, `No token found! Your headers: ${JSON.stringify(req.headers)}`);
    }

    const decoded = jwt.verify(token, config.jwt.secret) as { sub: string };
    const user = await User.findById(decoded.sub);

    if (!user) {
      throw new ApiError(401, 'User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    const errMessage = error instanceof Error ? error.message : 'Please authenticate';
    next(new ApiError(401, `Auth Error: ${errMessage}`));
  }
};
