const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Tag, Note } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Validation middleware
const validateTag = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Name is required')
    .isLength({ max: 50 })
    .withMessage('Name must not exceed 50 characters'),
  handleValidationErrors
];

// GET /api/tags - Get all tags for the current user
router.get('/', requireAuth, async (req, res) => {
  const tags = await Tag.findAll({
    where: { userId: req.user.id },
    order: [['updatedAt', 'DESC']]
  });

  res.json({ tags });
});

// GET /api/tags/:id - Get a tag by ID
router.get('/:id', requireAuth, async (req, res) => {
  const tag = await Tag.findByPk(req.params.id, {
    include: [{ model: Note }]
  });

  if (!tag || tag.userId !== req.user.id) {
    return res.status(404).json({ message: 'Tag not found' });
  }

  res.json({ tag });
});

// POST /api/tags - Create a new tag
router.post('/', requireAuth, validateTag, async (req, res) => {
  const { name } = req.body;

  const tag = await Tag.create({
    name,
    userId: req.user.id
  });

  res.status(201).json({ tag });
});

// PUT /api/tags/:id - Update a tag
router.put('/:id', requireAuth, validateTag, async (req, res) => {
  const { name } = req.body;
  const tag = await Tag.findByPk(req.params.id);

  if (!tag || tag.userId !== req.user.id) {
    return res.status(404).json({ message: 'Tag not found' });
  }

  tag.name = name;
  await tag.save();

  res.json({ tag });
});

// DELETE /api/tags/:id - Delete a tag
router.delete('/:id', requireAuth, async (req, res) => {
  const tag = await Tag.findByPk(req.params.id);

  if (!tag || tag.userId !== req.user.id) {
    return res.status(404).json({ message: 'Tag not found' });
  }

  await tag.destroy();
  res.json({ message: 'Successfully deleted' });
});

module.exports = router;
