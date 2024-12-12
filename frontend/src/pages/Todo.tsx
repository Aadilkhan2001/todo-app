import React, { useState, useEffect } from 'react';
import
{
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  Box,
  Checkbox
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useAuth } from '../context';

interface Task
{
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const Todo: React.FC = () => {
  const { token } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const getTasks = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/todos`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTask) return;
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/todos`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newTask,
        description: newDescription,
        completed: false,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setNewTask('');
      setNewDescription('');
      setTasks([...tasks, data]);
    } else {
      alert('Failed to add task');
    }
  };

  const handleDeleteTask = async (id: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setTasks(tasks.filter((task) => task.id !== id));
    } else {
      alert('Failed to delete task');
    }
  };

  const handleToggleComplete = async (task: Task) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/todos/${task.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...task,
        completed: !task.completed,
      }),
    });

    if (response.ok) {
      const updatedTask = await response.json();
      setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    } else {
      alert('Failed to update task');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleSaveEdit = async () => {
    if (!editingTask) return;
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/todos/${editingTask.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingTask),
    });

    if (response.ok) {
      const updatedTask = await response.json();
      setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
      setEditingTask(null);
    } else {
      alert('Failed to save task');
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <h1>Todo List</h1>      
      <TextField
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        label="Task Title"
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        label="Task Description"
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handleAddTask}>Add Task</Button>

      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {editingTask?.id === task.id ? (
              <>
                <TextField
                  value={editingTask?.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  variant="outlined"
                  size="small"
                  sx={{ marginRight: 1 }}
                />
                <TextField
                  value={editingTask?.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  variant="outlined"
                  size="small"
                  sx={{ marginRight: 1 }}
                />
                <Button onClick={handleSaveEdit} variant="contained" color="secondary">Save</Button>
              </>
            ) : (
              <>
                <ListItemText primary={task.title} secondary={task.description} />
                <div>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task)}
                    color="primary"
                  />
                  <IconButton onClick={() => handleEditTask(task)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteTask(task.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </div>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};