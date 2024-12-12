import { verifyToken } from '../utils/index.js';

export const authRequired  = (req, res, next) =>
{
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token)
  {
    return res.status(401).json({message: 'No token, authorization denied',});
  }

  try
  {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  }
  catch (err)
  {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};