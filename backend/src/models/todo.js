import mongoose, { Schema, Types } from 'mongoose';

const todoSchema = new Schema(
{
  title: {type: String, required: true,},
  description: {type: String,},
  completed: {type: Boolean, default: false,},
  userId: {type: Types.ObjectId, ref: 'User',},
});

export const Todo = mongoose.model('Todo', todoSchema);