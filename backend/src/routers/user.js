import { Router } from 'express';

import { signup, login } from '../controllers/index.js';

export const userRouter = Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);