const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  toggleTask,
  deleteTask,
  getTaskStats
} = require('../controllers/taskController');

// GET /api/tasks - Get all tasks
router.get('/', getAllTasks);

// GET /api/tasks/stats - Get task statistics
router.get('/stats', getTaskStats);

// GET /api/tasks/:id - Get a single task
router.get('/:id', getTaskById);

// POST /api/tasks - Create a new task
router.post('/', createTask);

// PUT /api/tasks/:id - Update a task
router.put('/:id', updateTask);

// PATCH /api/tasks/:id/toggle - Toggle task completion status
router.patch('/:id/toggle', toggleTask);

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', deleteTask);

module.exports = router;
