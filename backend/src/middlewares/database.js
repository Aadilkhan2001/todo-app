import { config } from '../config/index.js';

import mongoose from 'mongoose';

export const dbRequired = async (req, res, next) =>
{
  if (mongoose.connection.readyState === 0)
  {
    await config.connectDB();
  }
  next();
};