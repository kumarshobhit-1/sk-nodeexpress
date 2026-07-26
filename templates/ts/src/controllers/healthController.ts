import { Request, Response, RequestHandler } from 'express';
import { ApiResponse } from '../utils/apiResponse.js';

export const getHealth: RequestHandler = (req: Request, res: Response): void => {
  ApiResponse.success(res, 'TypeScript Express server is healthy! 🚀', {
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
};
