import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import * as authService from '../services/auth.service';

export const register = catchAsync(async (req: Request, res: Response) => {
  const user = await authService.registerUser(req.body);
  const tokens = authService.generateAuthTokens(user);
  res.status(201).send({ user, tokens });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = authService.generateAuthTokens(user);
  res.send({ user, tokens });
});
