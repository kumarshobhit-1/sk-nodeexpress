import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return ApiResponse.error(res, 'Email is already registered', 400);
  }

  const user = await User.create({ name, email, password });
  const token = generateToken({ id: user._id, role: user.role });

  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };

  return ApiResponse.success(res, { user: userResponse, token }, 'User registered successfully', 201);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return ApiResponse.error(res, 'Invalid email or password', 401);
  }

  const token = generateToken({ id: user._id, role: user.role });

  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return ApiResponse.success(res, { user: userResponse, token }, 'Login successful', 200);
});

export const getMe = asyncHandler(async (req, res) => {
  return ApiResponse.success(res, { user: req.user }, 'Current user profile fetched', 200);
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return ApiResponse.error(res, 'User with given email does not exist', 404);
  }
  // In production: generate reset token, send via Nodemailer / Resend
  return ApiResponse.success(res, null, 'Password reset instructions sent to your email', 200);
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;
  // In production: verify reset token & update password
  return ApiResponse.success(res, null, 'Password reset successful. Please log in with your new password', 200);
});
