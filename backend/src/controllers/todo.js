import { Todo } from '../models/index.js';

export const createTodo = async (req, res) =>
{
  const { title, description } = req.body;
  const userId = req.user.userId;

  try
  {
    const todo = new Todo(
    {
      title,
      description,
      userId,
    });
    await todo.save();
    res.status(201).json({id: todo._id, title: todo.title, description: todo.description, completed: todo.completed,});
  }
  catch (error)
  {
    res.status(500).json({message: 'Server error',});
  }
};

export const getTodos = async (req, res) =>
{
  const userId = req.user.userId;
  try
  {
    const todos = await Todo.find({userId,});
    res.json(todos.map(x => ({id: x._id, title: x.title, description: x.description, completed: x.completed,})));
  }
  catch (error)
  {
    res.status(500).json({message: 'Server error',});
  }
};

export const updateTodo = async (req, res) =>
{
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const userId = req.user.userId;

  try
  {
    const todo = await Todo.findOne({_id: id, userId,});
    if (!todo)
    {
      return res.status(404).json({message: 'Todo not found',});
    }
    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.completed = completed !== undefined ? completed : todo.completed;
    await todo.save();
    res.json({id: todo._id, title: todo.title, description: todo.description, completed: todo.completed,});
  }
  catch (error)
  {
    res.status(500).json({message: 'Server error',});
  }
};

export const deleteTodo = async (req, res) =>
{
  const { id } = req.params;
  const userId = req.user.userId;

  try
  {
    const todo = await Todo.findOne({_id: id, userId,});
    if (!todo)
    {
      return res.status(404).json({message: 'Todo not found',});
    }

    await todo.deleteOne();
    res.json({message: 'Todo deleted',});
  }
  catch (error)
  {
    console.log("error >>>>>", error)
    res.status(500).json({message: 'Server error',});
  }
};