import { ApiResponse } from '../utils/apiResponse.js';

export const getHealth = (req, res) => {
  return ApiResponse.success(res, 'Server is healthy and running smooth! 🚀', {
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
};
