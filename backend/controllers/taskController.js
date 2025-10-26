const mongoose = require('mongoose');
const Task = require('../models/Task');

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ 
      message: 'Error fetching tasks',
      error: error.message 
    });
  }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ 
      message: 'Error fetching task',
      error: error.message 
    });
  }
};

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, completed = false } = req.body;

    // Validation
    if (!title || title.trim().length === 0) {
      return res.status(400).json({ message: 'Title is required' });
    }

    if (title.length > 200) {
      return res.status(400).json({ message: 'Title cannot exceed 200 characters' });
    }

    if (description && description.length > 1000) {
      return res.status(400).json({ message: 'Description cannot exceed 1000 characters' });
    }

    const task = new Task({
      title: title.trim(),
      description: description ? description.trim() : '',
      completed: Boolean(completed)
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ 
      message: 'Error creating task',
      error: error.message 
    });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    // Validation
    if (title !== undefined && (!title || title.trim().length === 0)) {
      return res.status(400).json({ message: 'Title cannot be empty' });
    }

    if (title && title.length > 200) {
      return res.status(400).json({ message: 'Title cannot exceed 200 characters' });
    }

    if (description && description.length > 1000) {
      return res.status(400).json({ message: 'Description cannot exceed 1000 characters' });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (completed !== undefined) updateData.completed = Boolean(completed);

    const task = await Task.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ 
      message: 'Error updating task',
      error: error.message 
    });
  }
};

// Toggle task completion status
const toggleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const task = await Task.findByIdAndUpdate(
      id,
      { completed: Boolean(completed) },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error toggling task:', error);
    res.status(500).json({ 
      message: 'Error toggling task',
      error: error.message 
    });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ 
      message: 'Error deleting task',
      error: error.message 
    });
  }
};

// Get task statistics
const getTaskStats = async (req, res) => {
  try {
    const total = await Task.countDocuments();
    const completed = await Task.countDocuments({ completed: true });
    const pending = await Task.countDocuments({ completed: false });

    res.json({
      total,
      completed,
      pending,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    });
  } catch (error) {
    console.error('Error fetching task stats:', error);
    res.status(500).json({ 
      message: 'Error fetching task statistics',
      error: error.message 
    });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  toggleTask,
  deleteTask,
  getTaskStats
};
