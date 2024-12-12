import mongoose from 'mongoose';

import { config } from '../config/index.js';

export const connectDB = async () =>
{
  try
  {
    console.log(config.databaseUrl)
    await mongoose.connect(config.databaseUrl);
    console.log('Database Connected');
  }
  catch (err)
  {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};