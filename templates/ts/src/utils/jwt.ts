import jwt, { Secret } from 'jsonwebtoken';

export const generateToken = (payload: object, expiresIn: string = process.env.JWT_EXPIRES_IN || '7d'): string => {
  const secret: Secret = process.env.JWT_SECRET || 'fallback_super_secret_key_change_in_production';
  return jwt.sign(payload, secret, { expiresIn: expiresIn as any });
};

export const verifyToken = (token: string): any => {
  const secret: Secret = process.env.JWT_SECRET || 'fallback_super_secret_key_change_in_production';
  return jwt.verify(token, secret);
};
