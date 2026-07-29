import jwt, { Secret } from 'jsonwebtoken';

export const generateToken = (payload: object, expiresIn: string = process.env.JWT_EXPIRES_IN || '7d'): string => {
  const secret: Secret = process.env.JWT_SECRET || 'super_secret_jwt_key_sknodejs_change_this_in_prod';
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is missing. Please set it in your .env file.');
  }
  return jwt.sign(payload, secret, { expiresIn: expiresIn as any });
};

export const verifyToken = (token: string): any => {
  const secret: Secret = process.env.JWT_SECRET || 'super_secret_jwt_key_sknodejs_change_this_in_prod';
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is missing. Please set it in your .env file.');
  }
  return jwt.verify(token, secret);
};
