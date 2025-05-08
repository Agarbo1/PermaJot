const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Notebook, Note } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Validation middleware
const validateNotebook = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title must not exceed 100 characters'),
  handleValidationErrors
];

// GET /api/notebooks - Get all notebooks for the current user
router.get('/', requireAuth, async (req, res) => {
  const notebooks = await Notebook.findAll({
    where: { userId: req.user.id },
    include: [{ model: Note }],
    order: [['updatedAt', 'DESC']]
  });

  res.json({ notebooks });
});

// GET /api/notebooks/:id - Get a single notebook by ID
router.get('/:id', requireAuth, async (req, res) => {
  const notebook = await Notebook.findByPk(req.params.id, {
    include: [{ model: Note }]
  });

  if (!notebook || notebook.userId !== req.user.id) {
    return res.status(404).json({ message: 'Notebook not found' });
  }

  res.json({ notebook });
});

// POST /api/notebooks - Create a new notebook
router.post('/', requireAuth, validateNotebook, async (req, res) => {
  const { title } = req.body;

  const newNotebook = await Notebook.create({
    title,
    userId: req.user.id
  });

  res.status(201).json({ notebook: newNotebook });
});

// PUT /api/notebooks/:id - Update a notebook
router.put('/:id', requireAuth, validateNotebook, async (req, res) => {
  const { title } = req.body;
  const notebook = await Notebook.findByPk(req.params.id);

  if (!notebook || notebook.userId !== req.user.id) {
    return res.status(404).json({ message: 'Notebook not found' });
  }

  notebook.title = title;
  await notebook.save();

  res.json({ notebook });
});

// DELETE /api/notebooks/:id - Delete a notebook
router.delete('/:id', requireAuth, async (req, res) => {
  const notebook = await Notebook.findByPk(req.params.id);

  if (!notebook || notebook.userId !== req.user.id) {
    return res.status(404).json({ message: 'Notebook not found' });
  }

  await notebook.destroy();
  res.json({ message: 'Successfully deleted' });
});

module.exports = router;
