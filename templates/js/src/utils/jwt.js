import jwt from 'jsonwebtoken';

export const generateToken = (payload, expiresIn = process.env.JWT_EXPIRES_IN || '7d') => {
  const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_sknodejs_change_this_in_prod';
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is missing. Please set it in your .env file.');
  }
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_sknodejs_change_this_in_prod';
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is missing. Please set it in your .env file.');
  }
  return jwt.verify(token, secret);
};
