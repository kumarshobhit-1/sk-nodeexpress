import { Request, Response, NextFunction, RequestHandler } from 'express';
import User from '../models/User.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const getAllUsers: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.find().select('-password');
    ApiResponse.success(res, 'Users fetched successfully', { users });
  } catch (error) {
    next(error);
  }
};

export const getUserById: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      ApiResponse.error(res, 'User not found', 404);
      return;
    }
    ApiResponse.success(res, 'User profile fetched successfully', { user });
  } catch (error) {
    next(error);
  }
};
