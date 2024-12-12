import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

export const generateToken = (userId) =>
{
  return jwt.sign({userId}, config.jwtSecret, {expiresIn: '1h',});
};

export const verifyToken = (token) =>
{
  return jwt.verify(token, config.jwtSecret);
};