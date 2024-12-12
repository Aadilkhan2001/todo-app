import { Router } from 'express';

import { authRequired } from '../middlewares/index.js';
import
{
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from '../controllers/index.js';

export const todoRouter = Router();

todoRouter.post('/', authRequired, createTodo);
todoRouter.get('/', authRequired, getTodos);
todoRouter.put('/:id', authRequired, updateTodo);
todoRouter.delete('/:id', authRequired, deleteTodo);