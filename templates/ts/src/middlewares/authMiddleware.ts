import { Request, Response, NextFunction, RequestHandler } from 'express';
import { verifyToken } from '../utils/jwt.js';
import { ApiResponse } from '../utils/apiResponse.js';
import User from '../models/User.js';

export interface AuthRequest extends Request {
  user?: any;
}

export const protect: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      ApiResponse.error(res, 'Not authorized to access this route. Token missing.', 401);
      return;
    }

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id);
    if (!user) {
      ApiResponse.error(res, 'User no longer exists.', 401);
      return;
    }

    if (!user.isActive) {
      ApiResponse.error(res, 'User account is deactivated.', 403);
      return;
    }

    (req as AuthRequest).user = user;
    next();
  } catch (error) {
    ApiResponse.error(res, 'Invalid or expired token.', 401);
    return;
  }
};

export const authorize = (...roles: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authReq = req as AuthRequest;
    if (!authReq.user || !roles.includes(authReq.user.role)) {
      ApiResponse.error(
        res,
        `User role '${authReq.user?.role}' is not authorized to access this route.`,
        403
      );
      return;
    }
    next();
  };
};
