import dotenv from 'dotenv';

import { connectDB } from './database.js';

dotenv.config();

export const config =
{
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  connectDB: connectDB,
};