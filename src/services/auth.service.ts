import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/user.model';
import { ApiError } from '../utils/ApiError';
import { config } from '../config';

export const registerUser = async (body: any): Promise<IUser> => {
  if (await User.findOne({ email: body.email })) {
    throw new ApiError(400, 'Email already taken');
  }
  const user = await User.create(body);
  return user;
};

export const loginUserWithEmailAndPassword = async (email: string, password: string): Promise<IUser> => {
  const user = await User.findOne({ email });
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(401, 'Incorrect email or password');
  }
  return user;
};

export const generateAuthTokens = (user: IUser) => {
  const accessToken = jwt.sign({ sub: user._id }, config.jwt.secret, {
    expiresIn: config.jwt.accessExpirationMinutes * 60,
  });

  return {
    access: {
      token: accessToken,
      expires: new Date(Date.now() + config.jwt.accessExpirationMinutes * 60 * 1000),
    },
  };
};
