import { Request, Response, NextFunction, RequestHandler } from 'express';
import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { AuthRequest } from '../middlewares/authMiddleware.js';

export const register: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      ApiResponse.error(res, 'Please provide name, email and password', 400);
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      ApiResponse.error(res, 'User with this email already exists', 400);
      return;
    }

    const user = await User.create({ name, email, password });
    const token = generateToken({ id: user._id, role: user.role });

    ApiResponse.success(res, 'User registered successfully', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    }, 201);
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      ApiResponse.error(res, 'Please provide email and password', 400);
      return;
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      ApiResponse.error(res, 'Invalid credentials', 401);
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      ApiResponse.error(res, 'Invalid credentials', 401);
      return;
    }

    const token = generateToken({ id: user._id, role: user.role });

    ApiResponse.success(res, 'Logged in successfully', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const getMe: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authReq = req as AuthRequest;
    ApiResponse.success(res, 'User profile fetched successfully', {
      user: authReq.user,
    });
  } catch (error) {
    next(error);
  }
};
