import express from 'express';
import cors from 'cors';

import { config } from './config/index.js';
import { dbRequired } from './middlewares/index.js';
import { userRouter, todoRouter } from './routers/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(dbRequired);

app.use('/api/auth', userRouter);
app.use('/api/todos', todoRouter);

app.listen(config.port, () =>
{
  console.log(`Server is running on http://localhost:${config.port}`);
});