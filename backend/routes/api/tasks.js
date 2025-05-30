const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Task, Note, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
// Validation middleware
const validateTask = [
  check('description')
    .optional()
    .isString()
    .withMessage('Description must be a string.'),
  handleValidationErrors
];

// GET /api/tasks - Get all tasks for current user - WORKS
router.get('/', requireAuth, async (req, res) => {
  const userId = req.user.id;

  const tasks = await Task.findAll({
    where: { userId },
    order: [['updatedAt', 'DESC']],
  });

  res.json({tasks});
});

// GET /api/tasks/:id - Get a single task by ID
router.get('/:id', requireAuth, async (req, res, next) => {
  const task = await Task.findByPk(req.params.id);

  if (!task || task.userId !== req.user.id) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json({task});
});

// POST /api/tasks - Create a new task - WORKS
router.post('/', requireAuth, validateTask, async (req, res, next) => {
  const { title, description } = req.body;

  const newTask = await Task.create({
    title,
    description,
    userId: req.user.id
  });

  res.status(201).json({newTask});
});

// PUT /api/tasks/:id - Update an existing task - WORKS
router.put('/:id', requireAuth, validateTask, async (req, res, next) => {
  const { description } = req.body;
  const task = await Task.findByPk(req.params.id);

  if (!task || task.userId !== req.user.id) {
    return res.status(404).json({ message: 'Task not found' });
  }

  await task.update({
    description
  });

  res.json({task});
});

// DELETE /api/tasks/:id - Delete a task - WORKS
router.delete('/:id', requireAuth, async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  if (!task || task.userId !== req.user.id) {
    return res.status(404).json({ message: 'Task not found' });
  }

  await task.destroy();

  res.json({ message: 'Task deleted successfully' });
});

// POST /api/tasks/:id/complete - Mark a task as complete - WORKS
router.post('/:id/complete', requireAuth, async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  if (!task || task.userId !== req.user.id) {
    return res.status(404).json({ message: 'Task not found' });
  }

  task.isCompleted = true;
  await task.save();

  res.json({ task });
});

// POST /api/tasks/:id/undo - Undo a task completion - WORKS
router.post('/:id/undo', requireAuth, async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  if (!task || task.userId !== req.user.id) {
    return res.status(404).json({ message: 'Task not found' });
  }

  task.isCompleted = false;
  await task.save();

  res.json({ task });
});

module.exports = router;
